<template>
  <div class="tile is-parent is-vertical">
    <div class="tile is-child is-vertical">
      <p class="title">Mine Sweeper</p>
      <p class="subtitle">
        マインスイーパ
      </p>
    </div>
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
                <i class="fas fa-arrows-alt-h"></i>
              </span>
            </p>
          </div>
          <p class="help is-danger" :style="{display: validateX ? 'none' : ''}">number only!</p>
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
                <i class="fas fa-arrows-alt-v"></i>
              </span>
            </p>
          </div>
          <p class="help is-danger" :style="{display: validateY ? 'none' : ''}">number only!</p>
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
          <p class="help is-danger" :style="{display: validateBombs ? 'none' : ''}">number only!</p>
        </div>
      </div>
    </div>
    <div class="tile is-child is-vertical">
      <button class="button is-primary is-rounded" :class="{'is-loading': initializing}" :disabled="!validation || initializing" @click="prepareForInitGame()">Init game</button>
    </div>
    <div class="tile is-child is-vertical notification">
      <div class="game-field">
        <div class="scrollable-field">
          <table class="table is-bordered is-hoverable" style="margin: auto;">
            <tbody>
              <tr v-for="row in field" :key="row.id">
                <td v-for="col in row.cols" :key="col.id">
                  <div>{{col.num}}</div>
                </td>
              </tr>
            </tbody>
          </table>
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
          <p>CPUに高負荷がかかる可能性があります。</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="forceInitGame()">Agree</button>
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
        field: [],
        selectedLevel: 'Easy',
        state: 'normal',
        initializing: false,
        isInitWarning: false,
        timerId: null,
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
        return pattern.test(this.bombs);
      },
    },
    methods: {
      prepareForInitGame() {
        if (this.x * this.y > 50000) {
          this.isInitWarning = true;
        } else {
          this.isInitWarning = false;
          this.initGame();
        }
      },
      initCansel() {
        this.isInitWarning = false;
      },
      forceInitGame() {
        this.isInitWarning = false;
        this.initGame();
      },
      initGame() {
        this.initializing = true;
        setTimeout(this.initField, 100);
      },
      initField() {
        this.field = [];
        for(let i = 0; i < this.y; i++) {
          const row = {
            id: i,
            cols: [],
          };
          for(let j = 0; j < this.x; j++) {
            row.cols.push({
              id: i+j,
              num: 0,  
            });
          }
          this.field.push(row);
        }
        this.initializing = false;
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
      
    },
  }

</script>
