<template>
  <div>
    <navbar></navbar>
    <main id="main-content">
      <nuxt />
    </main>
  </div>
</template>

<style scoped>
#main-content {
  margin-top: 36px;
}
</style>

<style>
html * {
  font-family: 'Noto Sans JP', sans-serif;
  
}
</style>

<script>
  import navbar from "~/components/navbar";
  export default {
    components: {
      navbar,
    },
  }

</script>
