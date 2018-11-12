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
    margin-top: 48px;
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
