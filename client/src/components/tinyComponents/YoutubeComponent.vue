<template>
  <div id='videos'>
    <iframe width="420" height="315" :src="currentURL"></iframe>    
    <section class='player' >
      <div v-for="(video, index) in videos" :key="video.uri" v-on:click="changeURL(index)">
        {{video.title}}
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'YoutubeComponent',
  data () {
    return {
      index: 0
    }
  },
  props: ['videos'],
  computed: {
    urls: function () {
      return this.videos.map(video => {
        let ID = video.uri.slice(video.uri.indexOf('?v=') + 3)
        return 'https://www.youtube.com/embed/' + ID
      })
    },
    currentURL: function () {
      return this.urls[this.index]
    }
  },
  methods: {
    changeURL: function (index) {
      this.index = index
    }
  }
}
</script>

<style scoped>
#videos {
  text-align: center;
  padding: 10px 30px;
  display: flex;
  flex-direction: row;
}
.player {
  text-align: start;
}
</style>
