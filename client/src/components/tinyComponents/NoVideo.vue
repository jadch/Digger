<template>
  <div class='novideo'>
    <h1>Looks like no Youtube videos are associated with this Discogs release...</h1>
  </div>
</template>

<script>
export default {
  name: 'NoVideo'
}
</script>

<style scoped>
.novideo {
  width: 470px;
  height: 270px;
  margin: 0px 0px 50px 0px;
  border-radius: 15px;
  color: #2d2d2d;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: columns;
  align-items: center;
  justify-content: center;
}
</style>
