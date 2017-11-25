<template>
  <div id='videos'>
    <iframe width="400" height="250" :src="currentURL"></iframe>    
    <section class='player' >
      <div v-for="(video, index) in videos" :key="video.uri" v-on:click="changeURL(index)" class='video'>
        <img src="../../assets/youtube.svg" alt="Youtube">
        <p>{{video.title}}</p>
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
.player div {
  cursor: pointer;
}
.video {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
img {
  height: 35px;
  margin-right: 10px;
}
p {
  margin: 5px 0px;
  font-weight: 500;
}
</style>
