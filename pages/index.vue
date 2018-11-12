<template>
  <div class="columns is-multiline is-centered">
    <div class="column is-4 is-desktop" v-for="game in games" :key="game.id">
      <div class="card">
        <div class="card-content image-fill" :style="{'background-image': 'url('+game.imageUrl+')'}">
          <p class="title">
            {{game.title}}
          </p>
          <p class="subtitle">
            {{game.subtitle}}
          </p>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <nuxt-link :to="game.link">
              Play
            </nuxt-link>
          </p>
          <p class="card-footer-item">
            <span>
              Show detail
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
            detail: '',
            link: '/games/mine',
            imageUrl: './img/games.jpeg',
          },
          {
            id: 2,
            title: 'Oak Battle',
            subtitle: 'オークバトル',
            detail: '',
            link: '/games/oak',
            imageUrl: './img/games.jpeg',
          },
          {
            id: 3,
            title: 'Solitia',
            subtitle: 'ソリティア',
            detail: '',
            link: '/games/solitia',
            imageUrl: './img/cards.jpeg',
          },
          {
            id: 4,
            title: 'Rogue like',
            subtitle: 'ローグライク',
            detail: '',
            link: '/games/rogue',
            imageUrl: './img/games.jpeg',
          },
          {
            id: 5,
            title: 'Life game',
            subtitle: 'ライフゲーム',
            detail: '',
            link: '/games/life',
            imageUrl: './img/board-games.jpeg',
          },
          {
            id: 6,
            title: 'Puyo game',
            subtitle: 'ぷよてきな',
            detail: '',
            link: '/games/puyo',
            imageUrl: './img/games.jpeg',
          },
          {
            id: 7,
            title: 'Map Sample',
            subtitle: 'GoogleMapのサンプル',
            detail: '',
            link: '/games/mapsample',
            imageUrl: './img/maps.jpeg',
          },
          {
            id: 8,
            title: 'Linebots',
            subtitle: 'Linebot系',
            detail: '',
            link: '/games/linebot',
            imageUrl: './img/robots.jpeg',
          },
        ],
      }
    },
    methods: {

    }
  }
</script>
