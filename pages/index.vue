<template>
  <div>
    <div class="mod-history">
      <div class="mod-history-title">
        更新情報 / News
      </div>
      <div class="mod-lines">
        <div class="mod-line">
          <div class="mod-date">
            2019/01/16
          </div>
          <div class="mod-info">
            ソリティア公開 & オークバトル中止
          </div>
        </div>
        <div class="mod-line">
          <div class="mod-date">
            2018/11/18
          </div>
          <div class="mod-info">
            マインスイーパ公開 & オークバトル着手
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-multiline is-centered">
      <div class="column is-4 is-desktop wow bounceIn" v-for="game in games" :key="game.id" draggable="false">
        <div class="card">
          <div class="card-content image-fill" :style="{'background-image': 'url('+game.imageUrl+')'}">
            <p class="title">
              {{game.title}}
            </p>
            <p class="subtitle">
              {{game.subtitle}}
            </p>
            <transition name="fade">
              <p class="content" v-if="game.showDetail" >
                {{game.detail}}
              </p>
            </transition>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">
              <nuxt-link :to="game.link">
                Play
              </nuxt-link>
            </p>
            <p class="card-footer-item">
              <a @click="game.showDetail = !game.showDetail">Comment</a>
              <span class="icon">
                <i class="fas fa-angle-up" aria-hidden="true" v-if="game.showDetail"></i>
                <i class="fas fa-angle-down" aria-hidden="true" v-else></i>
              </span>
            </p>
          </footer>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .card-footer * {
    user-select: none;
  }
  .mod-history {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-top: 32px;
    margin-bottom: 32px;
  }
  .mod-lines {
    display: flex;
    flex-flow: column;
    width: 60%;
  }
  .mod-line {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid lightblue;
  }
  .mod-date {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mod-info {
    flex: 5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .mod-history-title {
    background-color: rgb(71, 196, 253);
    width: 60%;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  .image-fill {
    background-size: cover;
    background-repeat: no-repeat;
    text-shadow: 2px 3px 1px white;
    font-size: 18px;
    font-weight: bold;
  }
  .fade-enter {
    opacity: 0;
    transform: translateY(-10px);
  }
  .fade-enter-to {
    opacity: 1;
  }
  .fade-leave {
    opacity: 1;
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  .fade-enter-active {
    transition: all .5s ease;
  }
  .fade-leave-active {
    transition: all .4s ease;
  }
  @media screen and (max-width: 720px) {
    .mod-lines {
      width: 100%;
      font-size: 14px;
    }
    .mod-history-title {
      width: 100%;
      font-size: 18px;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        games: [
          {
            id: 1,
            title: 'Mine Sweeper',
            subtitle: 'マインスイーパ',
            detail: '完成！中右クリックが反応しないという事態に出くわしたが、Chromeのデベロッパーツールモードだと機能しない事を初めて知った。あと地味に再帰に苦戦した。',
            link: '/games/mine',
            imageUrl: require('~/assets/img/games.jpeg'),
            showDetail: false,
          },
          {
            id: 3,
            title: 'Solitia',
            subtitle: 'ソリティア',
            detail: '完成！ドラッグ操作について再学習した。処理がそこそこ複雑で、VSCodeでのデバッグ方法を覚えつつ作成した。',
            link: '/games/solitia',
            imageUrl: require('~/assets/img/cards.jpeg'),
            showDetail: false,
          },
          {
            id: 4,
            title: 'Rogue like',
            subtitle: 'ローグライク',
            detail: '開発中…',
            link: '/games/rogue',
            imageUrl: require('~/assets/img/games.jpeg'),
            showDetail: false,
          },
          {
            id: 5,
            title: 'Life game',
            subtitle: 'ライフゲーム',
            detail: '開発中…',
            link: '/games/life',
            imageUrl: require('~/assets/img/board-games.jpeg'),
            showDetail: false,
          },
          {
            id: 6,
            title: 'Puyo game',
            subtitle: 'ぷよてきな',
            detail: '開発中…',
            link: '/games/puyo',
            imageUrl: require('~/assets/img/games.jpeg'),
            showDetail: false,
          },
          {
            id: 7,
            title: 'Map Sample',
            subtitle: 'GoogleMapのサンプル',
            detail: '開発中…',
            link: '/games/mapsample',
            imageUrl: require('~/assets/img/maps.jpeg'),
            showDetail: false,
          },
          {
            id: 8,
            title: 'Linebots',
            subtitle: 'Linebot系',
            detail: '開発中…',
            link: '/games/linebot',
            imageUrl: require('~/assets/img/robots.jpeg'),
            showDetail: false,
          },
        ],
      }
    },
    methods: {

    }
  }
</script>
