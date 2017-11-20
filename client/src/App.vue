<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway:900');
body {
  margin: 0px;
}
#app {
  min-width: 100vw;
  min-height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
