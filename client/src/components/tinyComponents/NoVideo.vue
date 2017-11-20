<template>
  <div class='novideo'>
    <h1>Looks like no Youtube videos are associated with this Discogs release...</h1>
    <img src="../../assets/sad.svg" alt="Sad penguin">
  </div>
</template>

<script>
export default {
  name: 'NoVideo'
}
</script>

<style scoped>
.novideo {
  width: 500px;
  height: 190px;
  padding: 5px 50px;
  padding-right: 5px;
  border-radius: 10px;
  color: #2d2d2d;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: columns;
  align-items: center;
  justify-content: center;
}
h1 {
  font-weight: 400;
  margin-left: 5px;
}
</style>
