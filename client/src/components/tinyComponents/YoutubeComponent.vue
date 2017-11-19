<template>
  <div id='videos'>
    <h1>Videos</h1>
    <section class='videos' v-for="url in urls" :key="url">
      <iframe width="420" height="315" :src="url"></iframe>
    </section>
  </div>
</template>

<script>
export default {
  name: 'YoutubeComponent',
  props: ['videos'],
  computed: {
    urls: function () {
      return this.videos.map(video => {
        let ID = video.uri.slice(video.uri.indexOf('?v=') + 3)
        return 'https://www.youtube.com/embed/' + ID
      })
    }
  }
}
</script>

<style scoped>
#videos {
  text-align: center;
  padding: 10px 30px;
}
</style>
