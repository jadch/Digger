<template>
  <div id='videos'>
    <iframe width="420" height="315" :src="currentURL"></iframe>    
    <section class='player' >
      <h2>Available Youtube Videos</h2>
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
  margin: 0px 0px 0px 50px;
  font-size: 1.4em;
  font-weight: 400;
}
h2 {
  margin: 0px 0px 10px 0px;
  font-size: 1.5em;
  font-weight: 500;
}
</style>
