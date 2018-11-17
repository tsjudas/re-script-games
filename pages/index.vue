<template>
  <div class="columns is-multiline is-centered">
    <div class="column is-4 is-desktop wow bounceIn" v-for="game in games" :key="game.id">
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
</template>

<style scoped>
  .image-fill {
    background-size: cover;
    background-repeat: no-repeat;
    text-shadow: 2px 2px 1px white;
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
            id: 2,
            title: 'Oak Battle',
            subtitle: 'オークバトル',
            detail: '絶賛着手中…',
            link: '/games/oak',
            imageUrl: require('~/assets/img/games.jpeg'),
            showDetail: false,
          },
          {
            id: 3,
            title: 'Solitia',
            subtitle: 'ソリティア',
            detail: '開発中…',
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
