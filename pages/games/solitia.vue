<template>
  <div class="tile is-parent is-vertical">
    <section class="hero has-img" :style="{'background-image': 'url('+ require('~/assets/img/cards.jpeg') +')'}">
      <div class="hero-body">
        <h1 class="title">
          Solitia
        </h1>
        <h2 class="subtitle">
          ソリティア
        </h2>
      </div>
    </section>
    <section class="hero is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            操作説明
          </h1>
          <h2 class="subtitle">
            ドラッグしてカードを動かす
          </h2>
          <h3 class="content">
            <s>AUTOボタンで自動送り</s>まだだめ
          </h3>
        </div>
      </div>
    </section>
    <div class="tile is-parent is-vertical">
      <div class="tile is-child is-vertical">
        <div class="field">
          <input class="is-checkradio has-no-border is-info" id="exampleRadioInline1" type="radio" name="exampleRadioInline" checked="checked" value="1" v-model="nextCardNum"
            :disabled="gameState !== 'notinit'">
          <label for="exampleRadioInline1">1枚送り</label>
          <input class="is-checkradio has-no-border is-info" id="exampleRadioInline2" type="radio" name="exampleRadioInline" value="3" v-model="nextCardNum"
            :disabled="gameState !== 'notinit'">
          <label for="exampleRadioInline2">3枚送り</label>
        </div>
      </div>
      <div class="tile is-child is-vertical">
        <button class="button is-info is-rounded" @click="initGame()" :disabled="gameState !== 'notinit'">Init</button>
        <button class="button is-danger is-rounded" @click="resetGame()" :disabled="gameState === 'notinit'">Reset</button>
      </div>
      <div class="game-field" v-if="gameState !== 'notinit'">
        <div class="box score-field">
          <nav class="level is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">SCORE</p>
                <p class="title">{{point}}</p>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Time</p>
                <p class="title">{{time}}</p>
              </div>
            </div>
          </nav>
        </div>
        <div class="box sub-field">
          <div style="width: 100px;">
            <button class="button is-info is-rounded fill-element" @click="autoPlay()">
              <div class="is-mobile-only"><i class="fas fa-caret-right"></i></div>
              <div class="is-desktop-only">AutoPlay</div>
            </button>
          </div>
          <div class="deck-field">
            <div class="deck">
              <button class="button is-primary is-rounded fill-element" @click="nextCard()">
                <div v-if="deck.length > 0">
                  <div class="is-mobile-only"><i class="fas fa-arrow-right"></i></div>
                  <div class="is-desktop-only">Next</div>
                </div>
                <div v-else>
                  <div class="is-mobile-only"><i class="far fa-times-circle"></i></div>
                  <div class="is-desktop-only">Empty!</div>
                </div>
              </button>
            </div>
            <div class="hand-cards">
              <div class="solitia-card" v-for="card in showarea.arr" :key="card.suit.mark + card.num" :style="{'color': card.suit.color}">
                <div class="solitia-card-front" :draggable="card == showarea.arr[showarea.arr.length-1]"
                    @dragstart="dragStart(showarea, card, $event)"
                    @dragend="dragEnd()"
                    @dragover="dragOver(showarea)">
                  {{card.suit.mark}}{{card.num}}
                </div>
              </div>
              <div class="solitia-card" v-if="showarea.arr.length <= 0 && hand.arr.length > 0" :style="{'color': hand.arr[hand.arr.length-1].suit.color}">
                <div class="solitia-card-front" v-if="hand.arr[hand.arr.length-1].front" draggable="true"
                    @dragstart="dragStart(hand, hand.arr[hand.arr.length-1], $event)"
                    @dragend="dragEnd()"
                    @dragover="dragOver(showarea)">
                  {{hand.arr[hand.arr.length-1].suit.mark}}{{hand.arr[hand.arr.length-1].num}}
                </div>
              </div>
              <div class="solitia-card" v-if="showarea.arr.length <= 0 && hand.arr.length <= 0">
                <div class="solitia-card-none" draggable="false">
                  NONE
                </div>
              </div>
            </div>
          </div>
          <div class="stack-cards">
            <div class="solitia-card" v-for="line in stack" :key="line.id"
                  draggable="true"
                  @dragstart="dragStart(line, line.arr[line.arr.length-1], $event)"
                  @dragend="dragEnd(line, $event)"
                  @dragover="dragOver(line)">
              <div v-if="line.arr.length === 0" class="solitia-card-none">
              </div>
              <div v-else class="solitia-card-front" :style="{ 'color': line.arr[line.arr.length-1].suit.color }">
                {{line.arr[line.arr.length - 1].suit.mark}}{{line.arr[line.arr.length - 1].num}}
              </div>
            </div>
          </div>
        </div>
        <div class="box main-field">
          <div class="main-line" v-for="line in field" :key="line.id">
            <div class="solitia-card" v-for="card in line.arr" :key="card.suit.mark + card.num" @click="turnCard(line, card)">
              <div v-if="card.front" class="solitia-card-front" :style="{'color': card.suit.color}" draggable="true"
                  @dragstart="dragStart(line, card, $event)"
                  @dragend="dragEnd()"
                  @dragover="dragOver(line)"
                  >
                {{card.suit.mark}}{{card.num}}
              </div>
              <div v-else class="solitia-card-back">
              </div>
            </div>
            <div v-if="line.arr.length <= 0" class="solitia-card">
              <div draggable="false" class="solitia-card-none"
                  @dragend="dragEnd()"
                  @dragover="dragOver(line)"
                  >
                FREE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-field {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.game-field * {
  user-select: none;
}
.score-field {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.sub-field {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
}
.main-field {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
}
.stack-cards {
  display: flex;
  justify-content: center;
  align-items: center;
}
.deck-field {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  margin-left: 16px;
  margin-right: 16px;
}
.scrollable-field {
  margin: auto;
  max-height: 100%;
  overflow: auto;
}
.has-img {
  background-size: 100% 100%;
  text-shadow: 2px 2px 1px white;
  background-attachment: fixed;
}
.hand-cards {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.solitia-card {
  min-height: 40px;
  height: 100px;
  width: 80px;
  font-size: 20px;
  border: 1px solid lightgray;
}
.solitia-card-front {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.solitia-card-back {
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
}
.solitia-card-none {
  width: 100%;
  height: 100%;
  background-color: lightgreen;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.fill-element {
  height: 100%;
  width: 100%;
}
.spacer-width-small {
  height: 100%;
  width: 8px;
}
.main-line {
  height: 100%;
  display: flex;
  flex-flow: column;
}
@media screen and (max-width: 500px) {
  .is-desktop-only {
    display: none;
  }
  .solitia-card {
    height: 60px;
    width: 40px;
    font-size: 14px;
  }  
}
@media screen and (min-width: 501px) and (max-width: 720px) {
  .is-desktop-only {
    display: none;
  }
  .solitia-card {
    height: 80px;
    width: 60px;
  }  
}
@media screen and (min-width: 721px) {
  .is-mobile-only {
    display: none;
  }
  .solitia-card {
    height: 80px;
    width: 60px;
  }  
}
</style>

<script>
  import { toast } from "bulma-toast";
  const suit = [
    {
      name: 'heart',
      mark: '♡',
      color: 'red',
    },
    {
      name: 'dia',
      mark: '♢',
      color: 'red',
    },
    {
      name: 'club',
      mark: '♧',
      color: 'black',
    },
    {
      name: 'spade',
      mark: '♤',
      color: 'black',
    },
  ];
  const initialState = {
    field: [],
    deck: [],
    hand: [],
    showarea: [],
    stack: [],
    nextCardNum: 1,
    gameState: 'notinit',
    timerId: null,
    time: '00:00.00',
    point: 0,
    startedTime: null,
    endTime: null,
    draggingItem: null,
    draggingLine: null,
    timerId: null,
    time: '00:00.00',
    startedTime: null,
    endTime: null,
  };

  export default {
    data() {
      return {
        field: [],
        deck: [],
        hand: [],
        showarea: [],
        stack: [],
        nextCardNum: 1,
        gameState: 'notinit',
        timerId: null,
        time: '00:00.00',
        point: 0,
        startedTime: null,
        endTime: null,
        draggingItem: null,
        draggingLine: null,
        timerId: null,
        time: '00:00.00',
        startedTime: null,
        endTime: null,
      }
    },
    computed: {
    },
    watch: {
      gameState(val) {
        if (val === 'gameclear') {
          toast({
            message: "Game Clear!!!",
            type: "is-black",
            position: "bottom-center",
            duration: 10000,
            pauseOnHover: true,
            dismissible: true,
            animate: { in: "heartBeat", out: "bounceOut" }
          });
        }
      }
    },
    methods: {
      resetGame() {
        this.stopTimeWatch();
        const selectedMode = this.nextCardNum;
        for (const key in initialState) {
          this.$data[key] = initialState[key];
        }
        this.nextCardNum = selectedMode;
      },
      initGame() {
        this.deck = [];
        this.field = [];
        this.stack = [];
        this.hand = {
          id: "hand",
          arr: [],
        };
        this.showarea = {
          id: "showarea",
          arr: [],
        };
        for (let i = 0; i < 4; i++) {
          for (let j = 1; j <= 13; j++) {
            this.deck.push({
              suit: suit[i],
              num: j,
              front: false,
            });
          }
          this.stack.push({
            id: "stack" + i,
            arr: [],
          });
        }
        this.deck = this.shuffle(this.deck);
        for (let i = 0; i < 6; i++) {
          let arr = [];
          for (let j = 0; j <= i; j++) {
            const card = this.deck.pop();
            if (j === i) {
              card.front = true;
            }
            arr.push(card);
          }
          this.field.push({
            id: "field" + i,
            arr: arr,
          });
        }
        const cardElems = document.getElementsByClassName('solitia-card');
        let draggingItem = null;
        for (const cardElem of cardElems) {
          cardElem.setAttribute('draggable', true);
          cardElem.addEventListener('touchstart', function(e){
            draggingItem = cardElem;
          }, false);
          
        }
        this.gameState = 'ready';
      },
      gameStart() {
        this.gameState = 'start';
      },
      shuffle(array) {
        for(let i = array.length - 1; i > 0; i--){
          let r = Math.floor(Math.random() * (i + 1));
          let tmp = array[i];
          array[i] = array[r];
          array[r] = tmp;
        }
        return array;
      },
      nextCard() {
        if (this.deck.length <= 0) {
          this.returnToDeck();
          return;
        }
        if (this.showarea.arr.length > 0) {
          while (this.showarea.arr.length > 0) {
            const card = this.showarea.arr.shift();
            this.hand.arr.push(card);
          }
        }
        for (let i = 1; i <= this.nextCardNum; i++) {
          const card = this.deck.pop();
          if (card == null) {
            break;
          }
          card.front = true;
          this.showarea.arr.push(card);
        }
        this.startTimeWatch();
      },
      returnToDeck() {
        while (this.showarea.arr.length > 0) {
          const card = this.showarea.arr.shift();
          this.hand.arr.push(card);
        }
        while (this.hand.arr.length > 0) {
          const card = this.hand.arr.pop();
          card.front = false;
          this.deck.push(card);
        }
        // XXX: やたら複雑なので簡略化
        this.point -= 100;
      },
      dragStart(fromLine, item, e) {
        this.draggingItem = item;
        this.draggingLine = fromLine;
      },
      dragEnd() {
        if (!this.draggingItem || !this.draggingLine || !this.targetLine) {
          return;
        }

        if (this.canPlaceCard(this.targetLine, this.draggingItem) || this.canStackCard(this.targetLine, this.draggingItem)) {
          this.moveCard(this.draggingLine, this.draggingItem, this.targetLine);
        }

        this.draggingItem = null;
        this.draggingLine = null;
        this.targetLine = null;
      },
      dragOver(targetLine) {
        this.targetLine = targetLine;
      },
      canPlaceCard(line, card) {
        if (!card || !line.id || (!line.id.startsWith('field'))) {
          return false;
        }
        const lastCard = line.arr[line.arr.length - 1];
        // FREEの場合
        if (!lastCard) {
          return card.num === 13;
        }
        return lastCard.suit.color != card.suit.color && lastCard.num === card.num + 1
      },
      canStackCard(line, card) {
        if (!card || !line.id || !line.id.startsWith('stack')) {
          return false;
        }
        const lastCard = line.arr[line.arr.length - 1];
        // FREEの場合
        if (!lastCard) {
          return card.num === 1;
        }
        return lastCard.suit.name === card.suit.name && lastCard.num === card.num - 1
      },
      moveCard(fromLine, card, targetLine) {
        let index = -1;
        for (let i = 0; i < fromLine.arr.length; i++) {
          if (fromLine.arr[i] == card) {
            index = i;
            break;
          }
        }
        if (index < 0) {
          return;
        }
        const moveArr = fromLine.arr.splice(index);
        targetLine.arr = targetLine.arr.concat(moveArr);

        // 場札から組札への移動
        if (fromLine.id.startsWith('field') && targetLine.id.startsWith('stack')) {
          this.point += 10;
        } else if ((fromLine.id.startsWith('hand') || fromLine.id.startsWith('showarea')) && targetLine.id.startsWith('stack')) {
          // 山札から組札への移動
          this.point += 10;
        } else if ((fromLine.id.startsWith('hand') || fromLine.id.startsWith('showarea')) && targetLine.id.startsWith('field')) {
          // 山札から場札への移動
          this.point += 5;
        } else if (fromLine.id.startsWith('stack') && targetLine.id.startsWith('field')) {
          // 組札から場札への移動
          this.point -= 15;
        }
        this.startTimeWatch();
        this.checkClearGame();
      },
      turnCard(line, card) {
        if (line.arr[line.arr.length-1] == card && !card.front) {
          card.front = true;
        }
        this.point += 5;
      },
      autoPlay() {
        const testArr = [];
        if (this.showarea.arr.length > 0) {
          testArr.push(this.showarea);
        } else {
          testArr.push(this.hand);
        }
        for (const line of this.field) {
          testArr.push(line);
        }
        
        for (const arr of testArr) {
          if (arr.arr.length <= 0) {
            continue;
          }
          for (const stackLine of this.stack) {
            if (this.canStackCard(stackLine, arr.arr[arr.arr.length-1])) {
              this.moveCard(arr, arr.arr[arr.arr.length-1], stackLine);
            }
          }
        }
      },
      startTimeWatch() {
        if (this.startedTime) {
          return;
        }
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
      checkClearGame() {
        for (const stackLine of this.stack) {
          const lastCard = stackLine.arr[stackLine.arr.length - 1];
          if (!lastCard || lastCard.num !== 13) {
            return;
          }
        }

        this.point += 1000;
        this.gameState = 'gameclear';
        this.stopTimeWatch();
      },
    },
  }

</script>
