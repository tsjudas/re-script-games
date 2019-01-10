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
            AUTOボタンで自動送り
          </h3>
        </div>
      </div>
    </section>
    <div class="tile is-parent is-vertical">
      <div class="tile is-child is-vertical">
        <div class="field">
          <input class="is-checkradio has-no-border is-info" id="exampleRadioInline1" type="radio" name="exampleRadioInline" checked="checked">
          <label for="exampleRadioInline1">1枚送り</label>
          <input class="is-checkradio has-no-border is-info" id="exampleRadioInline2" type="radio" name="exampleRadioInline">
          <label for="exampleRadioInline2">3枚送り</label>
        </div>
      </div>
      <div class="tile is-child is-vertical">
        <button class="button is-info is-rounded" @click="initGame()" :disabled="gameState !== 'notinit'">Init</button>
        <button class="button is-danger is-rounded" @click="initGame()" :disabled="gameState !== 'notinit'">Reset</button>
      </div>
      <div class="tile is-child is-vertical">
        <div class="card">
          <div class="card-content">
            <div class="game-field">
              <div class="tile is-ancestor is-vertical">
                <div class="tile">
                  <div class="tile is-parent">
                    <div class="tile is-child box">
                      <button class="button is-primary is-rounded fill-element" @click="initGame()">Next</button>
                    </div>
                    <div class="tile is-child box solitia-card">
                      card
                    </div>
                  </div>
                  <div class="tile is-parent">
                    <div class="tile is-child box solitia-card" v-for="line in stack" :key="line.id" draggable="true"
                          @dragstart="dragStart(line, $event)"
                          @dragend="dragEnd()"
                          @dragenter="dragEnter(line)"
                          @drop="onDrop(line)">
                      <div v-if="line.arr.length === 0">
                        Empty
                      </div>
                      <div v-else>
                        {{line.arr[line.arr.length - 1]}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tile box">
                  <div class="tile is-parent is-vertical box" v-for="line in field" :key="line.id">
                    <div class="tile is-child is-1 box solitia-card" v-for="card in line.arr" :key="card.suit.mark + card.num" :style="{'color': card.suit.color}">
                      <div v-if="card.front">
                        {{card.suit.mark}}{{card.num}}
                      </div>
                      <div v-else>
                      </div>
                    </div>
                  </div>
                </div>
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
    height: 60pt;
    width: 100%;
    text-align: center;
  }
  .fill-element {
    height: 100%;
    width: 100%;
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
        stack: [],
        gameState: 'notinit',
        timerId: null,
        time: '00:00.00',
        startedTime: null,
        endTime: null,
        draggingItem: null,
      }
    },
    computed: {
    },
    methods: {
      initGame() {
        this.deck = [];
        this.field = [];
        this.stack = [];
        for (let i = 0; i < 4; i++) {
          for (let j = 1; j <= 13; j++) {
            this.deck.push({
              suit: suit[i],
              num: j,
              front: false,
            });
          }
          this.stack.push({
            id: i,
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
            id: i,
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
      dragStart(item, e) {
        this.draggingItem = item;
        e.target.style.opacity = '0.4'
      },
      dragEnd() {
        this.draggingItem = null;
        e.target.style.opacity = '1'
      },
      dragEnter(item) {

      },
      onDrop(item) {

      }
    },
  }

</script>
