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
        <button class="button is-danger is-rounded" @click="initGame()" :disabled="gameState !== 'notinit'">Reset</button>
      </div>
      <div class="game-field" v-if="gameState !== 'notinit'">
        <div class="box sub-field">
          <div style="width: 100px;">
            <button class="button is-info is-rounded fill-element" @click="autoPlay()">AutoPlay</button>
          </div>
          <div class="deck-field">
            <div class="deck">
              <div style="width: 100px;">
                <button class="button is-primary is-rounded fill-element" @click="nextCard()">
                  <div v-if="deck.length > 0">
                    Next
                  </div>
                  <div v-else>
                    Empty!
                  </div>
                </button>
              </div>
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
.sub-field {
  width: 100%;
  display: flex;
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
  .solitia-card {
    height: 60px;
    width: 40px;
    font-size: 14px;
  }  
}
@media screen and (min-width: 501px) and (max-width: 720px) {
  .solitia-card {
    height: 80px;
    width: 60px;
  }  
}
</style>

<script>
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
      }
    },
    computed: {
    },
    methods: {
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
        this.point -= 10;
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
        this.point -= 500;
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
      },
      turnCard(line, card) {
        if (line.arr[line.arr.length-1] == card && !card.front) {
          card.front = true;
        }
      },
      autoPlay() {
        debugger
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
              this.moveCard(arr, arr[arr.length-1], stackLine);
            }
          }
        }
      },
    },
  }

</script>
