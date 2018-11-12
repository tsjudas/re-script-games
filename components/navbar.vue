<template>
  <div>
    <nav class="navbar is-dark is-fixed-top">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          Script Games ~remake with nuxt~
        </nuxt-link>
        <div class="navbar-burger burger" data-target="navbarExampleTransparentExample" :class="{'is-active': openedMenu}"
          @click="menuToggle()">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu" :class="{'is-active': openedMenu}">
        <div class="navbar-start">
          <nuxt-link class="navbar-item" to="/">
            HOME
          </nuxt-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <p class="navbar-item">
              Others
            </p>
            <div class="navbar-dropdown is-boxed">
              <a class="navbar-item" href="https://bulma.io/documentation/overview/start/">
                about this page
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
</style>

<script>
  export default {
    data() {
      return {
        openedMenu: false,
      }
    },
    methods: {
      menuToggle() {
        this.openedMenu = !this.openedMenu;
      },
    }
  }

</script>
