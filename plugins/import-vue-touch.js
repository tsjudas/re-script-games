import Vue from 'vue'
import VueTouch from 'vue-touch'

VueTouch.config.swipe = {
  direction: 'vertical'
}

Vue.use(VueTouch, {name: 'v-touch'})
