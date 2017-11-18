<template>
  <div id='videos'>
    <h1>Videos</h1>
    <section class='videos' v-for="video in videos" :key="video.uri">
      <h2>
        {{video.uri}}
      </h2>
    </section>
  </div>
</template>

<script>
export default {
  name: 'YoutubeComponent',
  props: ['videos']
}
</script>

<style scoped>
#videos {
  text-align: center;
  padding: 10px 30px;
}
</style>
