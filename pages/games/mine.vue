<template>
  <div class="tile is-parent is-vertical">
    <section class="hero has-img is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Mine Sweeper
          </h1>
          <h2 class="subtitle">
            マインスイーパ
          </h2>
        </div>
      </div>
    </section>
    <section class="hero is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            操作説明
          </h1>
          <h2 class="subtitle">
            左クリック：パネルオープン
            中クリック：周りをオープン
            右クリック：旗を立てる
          </h2>
        </div>
      </div>
    </section>
    <div class="tile is-child is-vertical notification">
      <p class="title">Configs</p>
      <div class="tabs is-boxed">
        <ul>
          <li :class="{'is-active': selectedLevel === 'Easy'}">
            <a @click="selectEasy()">
              <span>Easy</span>
            </a>
          </li>
          <li :class="{'is-active': selectedLevel === 'Medium'}">
            <a @click="selectMedium()">
              <span>Medium</span>
            </a>
          </li>
          <li :class="{'is-active': selectedLevel === 'Hard'}">
            <a @click="selectHard()">
              <span>Hard</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="columns is-desktop">
        <div class="column">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-static">
                x
              </a>
            </p>
            <p class="control has-icons-left">
              <input class="input" type="tel" v-model="x">
              <span class="icon is-small is-left">
                <i class="fas fa-arrows-alt-v"></i>
              </span>
            </p>
          </div>
          <p class="help is-danger" :style="{display: validateX ? 'none' : ''}">値が不正です</p>
        </div>
        <div class="column">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-static">
                y
              </a>
            </p>
            <p class="control has-icons-left">
              <input class="input" type="tel" v-model="y">
              <span class="icon is-small is-left">
                <i class="fas fa-arrows-alt-h"></i>
              </span>
            </p>
          </div>
          <p class="help is-danger" :style="{display: validateY ? 'none' : ''}">値が不正です</p>
        </div>
        <div class="column">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-static">
                bombs
              </a>
            </p>
            <p class="control has-icons-left">
              <input class="input" type="tel" v-model="bombs">
              <span class="icon is-small is-left">
                <i class="fas fa-list-ol"></i>
              </span>
            </p>
          </div>
          <p class="help is-danger" :style="{display: validateBombs ? 'none' : ''}">値が不正です</p>
        </div>
      </div>
    </div>
    <div class="tile is-child is-vertical">
      <button class="button is-primary is-rounded" :class="{'is-loading': initializing}" :disabled="!validation || initializing" @click="prepareForInitGame()">Init Board</button>
    </div>
    <div class="tile is-child is-vertical">
      <div class="card">
        <div class="card-content">
          <nav class="level is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">REMAIN FLAGS</p>
                <p class="title">{{flags}}</p>
              </div>
            </div>
            <div class="level-item has-text-centered" @click="resetGame()">
              <img class="image" width="50px" height="50px" :src="getFaceImgSrc()">
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Time</p>
                <p class="title">{{time}}</p>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="game-field">
            <div class="scrollable-field">
              <table class="table is-bordered is-hoverable" style="margin: auto;">
                <tbody>
                  <tr v-for="row in field" :key="row.id">
                    <td style="user-select: none;" v-for="col in row.cols" :key="col.id" @click.left="openPanel(col)" @click.middle="openAround(col)" @contextmenu.prevent="toggleFlag(col)">
                      <div style="width: 30px; height: 30px;">
                        <img v-if="col.visible || col.isFlag" width="30px" height="30px" :src="getPanelImgSrc(col)">
                        <div v-else ></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{'is-active': isInitWarning}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Warning</p>
          <button class="delete" aria-label="close" @click="initCansel()"></button>
        </header>
        <section class="modal-card-body">
          <p>高負荷がかかる可能性があります。</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="initGame()">Agree</button>
          <button class="button" @click="initCansel()">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .game-field {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .scrollable-field {
    margin: auto;
    max-height: 100%;
    overflow: auto;
  }
  .has-img {
    background-image: url('~/static/img/games.jpeg');
    background-size: 100% 100%;

  }

</style>

<script>
  const presetDifficulty = {
    easy: {
      x: 6,
      y: 6,
      bombs: 10,
    },
    medium: {
      x: 12,
      y: 8,
      bombs: 20,
    },
    hard: {
      x: 15,
      y: 10,
      bombs: 30,
    },
  };
  export default {
    data() {
      return {
        x: 6,
        y: 6,
        bombs: 6,
        flags: 6,
        field: [],
        selectedLevel: 'Easy',
        gameState: 'normal',
        initializing: false,
        isInitWarning: false,
        timerId: null,
        time: '00:00.00',
        startedTime: null,
        endTime: null,
      }
    },
    computed: {
      validation() {
        return this.validateX && this.validateY && this.validateBombs;
      },
      validateX() {
        const pattern = /^\d+$/;
        return pattern.test(this.x);
      },
      validateY() {
        const pattern = /^\d+$/;
        return pattern.test(this.y);
      },
      validateBombs() {
        const pattern = /^\d+$/;
        return pattern.test(this.bombs) && this.x * this.y > this.bombs - 1;
      },
    },
    methods: {
      prepareForInitGame() {
        if (this.x * this.y >= 40000) {
          this.isInitWarning = true;
        } else {
          this.initGame();
        }
      },
      initCansel() {
        this.isInitWarning = false;
      },
      initGame() {
        this.isInitWarning = false;
        this.initializing = true;
        this.flags = this.bombs;
        setTimeout(this.initField, 100);
      },
      initField() {
        this.field = [];
        for(let i = 0; i < this.x; i++) {
          const row = {
            id: i,
            cols: [],
          };
          for(let j = 0; j < this.y; j++) {
            row.cols.push({
              id: i+j,
              posx: i,
              posy: j,
              num: 0,
              visible: false,
              isBombs: false,
              isFlag: false,
              isFlagNotCorrect: false,
              recursiveChecked: false,
            });
          }
          this.field.push(row);
        }
        this.putBombs();
        for(let i = 0; i < this.x; i++) {
          for(let j = 0; j < this.y; j++) {
            this.putNumbers(i, j);
          }
        }
        this.stopTimeWatch();
        this.time = '00:00.00';
        this.gameState = 'normal';
        this.flags = this.bombs;
        this.initializing = false;
      },
      resetGame() {
        if (this.field.length <= 0) {
          return;
        }
        for (const row of this.field) {
          for (const col of row.cols) {
            col.num = 0;
            col.visible = false;
            col.isBombs = false;
            col.isFlag = false;
            col.isFlagNotCorrect = false;
            col.recursiveChecked = false;
          }
        }
        this.putBombs();
        for(let i = 0; i < this.x; i++) {
          for(let j = 0; j < this.y; j++) {
            this.putNumbers(i, j);
          }
        }

        this.stopTimeWatch();
        this.time = '00:00.00';
        this.gameState = 'normal';
        this.flags = this.bombs;
      },
      putBombs() {
        let remainBombs = this.bombs;
        while (remainBombs > 0) {
          const randx = Math.ceil(Math.random() * (this.x - 1));
          const randy = Math.ceil(Math.random() * (this.y - 1));
          
          console.log(randx + ":" + randy);
          if (!this.field[randx].cols[randy].isBombs) {
            this.field[randx].cols[randy].isBombs = true;
            remainBombs--;
          }
        }
      },
      putNumbers(x, y) {
        if (this.field[x] == null || this.field[x].cols[y] == null) return;
        
        if (!this.field[x].cols[y].isBombs) {
          this.field[x].cols[y].num = this.countAroundFunc(x, y, (x, y) => this.field[x].cols[y].isBombs);
        }
      },
      countAroundFunc(x, y, checkFunc) {
        let aroundBombs = 0;
        if (this.field[x-1]) {
          aroundBombs += this.field[x].cols[y-1] && checkFunc(x-1, y-1) ? 1 : 0;
          aroundBombs += checkFunc(x-1, y) ? 1 : 0;
          aroundBombs += this.field[x].cols[y+1] && checkFunc(x-1, y+1) ? 1 : 0;
        }
        aroundBombs += this.field[x].cols[y-1] && checkFunc(x, y-1) ? 1 : 0;
        aroundBombs += this.field[x].cols[y+1] && checkFunc(x, y+1) ? 1 : 0;
        if (this.field[x+1]) {
          aroundBombs += this.field[x].cols[y-1] && checkFunc(x+1, y-1) ? 1 : 0;
          aroundBombs += checkFunc(x+1, y) ? 1 : 0;
          aroundBombs += this.field[x].cols[y+1] && checkFunc(x+1, y+1) ? 1 : 0;
        }
        return aroundBombs;
      },
      openPanel(col) {
        if (col == null) {
          return;
        }
        if (col.isFlag || col.visible) return;

        if (this.timerId == null) {
          this.startTimeWatch();
        }
        col.visible = true;
        if (col.isBombs) {
          this.gameState = 'gameover';
          this.gameOver();
        } else {
          this.clearCheck();
        }
      },
      toggleFlag(col) {
        if (col.visible) {
          return;
        }
        if (col.isFlag) {
          col.isFlag = false;
          this.flags++;
        } else if (this.flags > 0) {
          col.isFlag = true;
          this.flags--;
        }
        if (this.flags === 0) {
          this.clearCheck();
        }
      },
      openAround(col) {
        this.openAroundRec(col);
        for (const row of this.field) {
          for (const col of row.cols) {
            col.recursiveChecked = false;
          }
        }
      },
      openAroundRec(col) {
        if (col == null || col.recursiveChecked || !col.visible) {
          return;
        }
        const bombCnt = this.countAroundFunc(col.posx, col.posy, (x, y) => this.field[x].cols[y].isBombs);
        const flagCnt = this.countAroundFunc(col.posx, col.posy, (x, y) => this.field[x].cols[y].isFlag);
        if (bombCnt !== flagCnt) {
          return;
        }
        this.field[col.posx].cols[col.posy].recursiveChecked = true;
        if (this.field[col.posx-1]) {
          this.openPanel(this.field[col.posx-1].cols[col.posy-1]);
          this.openPanel(this.field[col.posx-1].cols[col.posy]);
          this.openPanel(this.field[col.posx-1].cols[col.posy+1]);
          this.openAroundRec(this.field[col.posx-1].cols[col.posy-1]);
          this.openAroundRec(this.field[col.posx-1].cols[col.posy]);
          this.openAroundRec(this.field[col.posx-1].cols[col.posy+1]);
        }
        this.openPanel(this.field[col.posx].cols[col.posy-1]);
        this.openPanel(this.field[col.posx].cols[col.posy+1]);
        this.openAroundRec(this.field[col.posx].cols[col.posy-1]);
        this.openAroundRec(this.field[col.posx].cols[col.posy+1]);
        if (this.field[col.posx+1]) {
          this.openPanel(this.field[col.posx+1].cols[col.posy-1]);
          this.openPanel(this.field[col.posx+1].cols[col.posy]);
          this.openPanel(this.field[col.posx+1].cols[col.posy+1]);
          this.openAroundRec(this.field[col.posx+1].cols[col.posy-1]);
          this.openAroundRec(this.field[col.posx+1].cols[col.posy]);
          this.openAroundRec(this.field[col.posx+1].cols[col.posy+1]);
        }
      },
      gameOver() {
        this.stopTimeWatch();
        for (const row of this.field) {
          for (const col of row.cols) {
            col.visible = true;
            col.isFlagNotCorrect = !col.isBombs && col.isFlag;
          }
        }
      },
      clearCheck() {
        console.log("clear check!");
        for (const row of this.field) {
          for (const col of row.cols) {
            if (!col.visible && !col.isFlag) {
              console.log(col.posx + ":" + col.posy + " = notVisible And notFlagged");
              return;
            }
            if (col.isFlag && !col.isBombs) {
              console.log(col.posx + ":" + col.posy + " = notCorrectFlag");
              return;
            }
          }
        }
        this.gameState = 'clear';
        this.stopTimeWatch();
      },
      selectEasy() {
        this.x = presetDifficulty.easy.x;
        this.y = presetDifficulty.easy.y;
        this.bombs = presetDifficulty.easy.bombs;
        this.selectedLevel = 'Easy';
      },
      selectMedium() {
        this.x = presetDifficulty.medium.x;
        this.y = presetDifficulty.medium.y;
        this.bombs = presetDifficulty.medium.bombs;
        this.selectedLevel = 'Medium';
      },
      selectHard() {
        this.x = presetDifficulty.hard.x;
        this.y = presetDifficulty.hard.y;
        this.bombs = presetDifficulty.hard.bombs;
        this.selectedLevel = 'Hard';
      },
      startTimeWatch() {
        this.startedTime = new Date().getTime();
        this.tickTime();
      },
      stopTimeWatch() {
        this.startedTime = null;
        clearTimeout(this.timerId);
        this.timerId = null;
      },
      tickTime() {
        const now = new Date().getTime();
        const diff = new Date(now - this.startedTime);

        const millisec = diff.getMilliseconds();
        const sec100 = Math.floor(millisec / 10);
        const sec = diff.getSeconds();
        const min = diff.getMinutes();
        this.time = ('00'  + min).slice(-2) + ":" + ('00'  + sec).slice(-2) + "." + ('00'  + sec100).slice(-2);
        this.timerId = setTimeout(this.tickTime, 10);
      },
      getFaceImgSrc() {
        return require('~/static/img/face_' + this.gameState + '.png');
      },
      getPanelImgSrc(col) {
        if (col.isFlagNotCorrect) {
          return require('~/static/img/flag-not-correct.png');
        }
        if (col.isFlag) {
          return require('~/static/img/flag.png');
        }
        if (col.isBombs) {
          return require('~/static/img/bakudan.png');
        }
        return require('~/static/img/number_' + col.num + '.png');
      }
    },
  }

</script>
