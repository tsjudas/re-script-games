<template>
  <div class="tile is-ancestor">
    <div class="tile is-2 is-vertical is-parent">
      <div class="tile is-child box">
        <div class="content is-centered-column">
          <img width="200px" src="~assets/img/yuusya_game.png">
        </div>
      </div>
      <div class="tile is-child box">
        <div class="content is-centered-column">
          <h1 class="title">HP</h1>
          <progress class="progress" value="15" max="100">15%</progress>
          <h1 class="title">SPEED</h1>
          <progress class="progress" value="15" max="100">15%</progress>
          <h1 class="title">POWER</h1>
          <progress class="progress" value="15" max="100">15%</progress>
        </div>
      </div>
    </div>
    <div class="tile is-2 is-vertical is-parent">
      <div class="tile is-child box">
        <div class="content is-centered-column">
          <button class="button" style="width: 100%;">Attack</button>
          <button class="button" style="width: 100%;">Attack</button>
          <button class="button" style="width: 100%;">Attack</button>
        </div>
      </div>
      <div class="tile is-child box">
        <div class="field">
          <div class="control">
            <textarea class="textarea has-fixed-size" placeholder="Normal textarea" rows="20" readonly></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="tile is-parent is-8">
      <div class="tile is-child box">
        <div class="tile is-ancestor" v-for="i in 4" :key="i">
          <div class="tile is-parent" v-for="j in 3" :key="i+j">
            <article class="tile is-child box">
              <div class="is-centered-column">
                <img width="100px" src="~assets/img/yuusya_game.png">
                <p>HP</p>
                <progress class="progress" value="15" max="100">15%</progress>
              </div>
            </article>
          </div>
        </div>

      </div>
    </div>
    
  </div>
</template>

<style scoped>
  .is-centered-column {
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
  }
</style>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>
