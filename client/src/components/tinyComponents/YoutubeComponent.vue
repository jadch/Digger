<template>
  <div id='videos'>
    <iframe width="750" height="450" :src="url"></iframe>
  </div>
</template>

<script>
export default {
  name: 'YoutubeComponent',
  data () {
    return {
      url: null,
    }
  },
  props: ['videos'],
  created () {
    let url = 'https://www.youtube.com/embed/VIDEO_ID?playlist=';
    this.videos.forEach((video, index) => {
      url += `${video.uri.slice(video.uri.indexOf('?v=') + 3)},`
    })
    this.url = url
  }
}
</script>

<style scoped>
#videos {
  text-align: center;
  display: flex;
  flex-direction: row;
}
.player {
  text-align: start;
  margin: 0px 0px 0px 25px;
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
iframe {
  /*width: 50vw;*/
  /*height: 50vh;*/
}
</style>
