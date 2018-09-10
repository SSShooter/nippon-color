<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted() {}
}
</script>

<style lang="scss">
body,
html {
  height: 100%;
}
#app {
  height: 100%;
  font-family: 'XANO', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0c0c0c;
}
</style>
