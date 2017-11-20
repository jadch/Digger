<template>
  <div class='navbar'>
    <div class='title'>Digger</div>
    <img src="../../assets/vinyl.svg" alt="Logo">
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  width: 100vw;
  height: 63px;
  box-sizing: border-box;
  background-color: #f3f3f3;
  padding: 6px 0px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 6px 0px rgba(95, 95, 95, 0.2);
}
.title {
  font-size: 2.4em;
  font-family: 'Raleway', sans-serif;
  color: #1f1f1f;
  align-self: start;
  margin: 0px 0px 0px 12px;
  font-weight: 600;
}
img {
  width: 50px;
  margin: 0px 0px 0px 6px;
}
</style>
