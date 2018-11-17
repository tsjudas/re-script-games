<template>
  <div>
    <section class="hero has-img is-medium" :style="{'background-image': 'url('+ require('~/assets/img/about.jpeg') +')'}">
      <div class="hero-body">
        <div class="container">
          <div class="content is-large">
            <h1 class="title">
              About This Page
            </h1>
          </div>
        </div>
      </div>
    </section>
    
    <article class="message wow fadeInRight">
      <div class="message-header">
        <p>1. 概要</p>
      </div>
      <div class="message-body">
        Nuxt.js + Bulma.css + なんか色々で今風のサイトっぽいものを作りたくって作成したサイト。<br>
        ゲームやらなんやらはアルゴリズム的な話しになるので、そこまで力は入れていません。
      </div>
    </article>
    <article class="message is-info wow bounceIn slow">
      <div class="message-header">
        <p>2. 背景</p>
      </div>
      <div class="message-body">
        作成してから今まで放置していた<a href="https://hostingsite-243a5.firebaseapp.com/">元サイト</a>に色々と気に食わないところがあったのと、<br>
        現在は時間があること、nuxtを触っていて純粋に楽しく、もっと触りたいと思ったこと、<br>
        と色んな理由が重なったので勉強がてら作成することにした。
      </div>
    </article>
    <article class="message is-success wow flipInX slower">
      <div class="message-header">
        <p>3. 構成</p>
      </div>
      <div class="message-body">
        メインフレームワーク: Nuxt.js<br>
        UI(CSS)フレームワーク：Bulma<br>
        CSSアニメーションフレームワーク：Animate.css + Wow.js<br>
        ホスト先：GithubPages<br>
      </div>
    </article>
    <article class="message is-danger wow jackInTheBox">
      <div class="message-header">
        <p>4. ソースコード</p>
      </div>
      <div class="message-body">
        ソースコードは<a href="https://github.com/tsjudas/re-script-games">GitHub</a>で公開しています。<br>
        フロント側はド素人のソースですが。
      </div>
    </article>
    <div class="columns">
      <div class="column is-2 is-offset-5">
        <div class="content is-medium">
          <nuxt-link to="/">
            TOPへ
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.wow {
  visibility: hidden;
}
.has-img {
  background-size: 100% 100%;
  text-shadow: 2px 2px 1px whitesmoke;
}
</style>

<script>
export default {
}
</script>
