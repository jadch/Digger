<template>
  <div id='random'>
    <h1>Digger</h1>
    <div v-if="release" class='main'>
      <releasewidget :release="release" class='release'></releasewidget>
      <tracklist :tracks="release.tracklist" class='tracklist'></tracklist>
    </div>
    <ytvideos v-if="videos" :videos="videos"></ytvideos>
  </div>
</template>

<script>
import ReleaseComponent from './tinyComponents/ReleaseComponent'
import TracklistComponent from './tinyComponents/TracklistComponent'
import YoutubeComponent from './tinyComponents/YoutubeComponent'
import { getRandomDiscogsRelease } from '../../api'
export default {
  name: 'Digger',
  data () {
    return {
      release: null,
      videos: null
    }
  },
  components: {
    tracklist: TracklistComponent,
    ytvideos: YoutubeComponent,
    releasewidget: ReleaseComponent
  },
  created () {
    getRandomDiscogsRelease()
      .then(release => {
        this.release = release
        if ("videos" in release) {
          this.videos = release.videos
        }
      })
  }
}
</script>

<style scoped>
#random {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2196f3;
}
.main {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.release {
  margin: 0px 50px;
  height: fit-content;
}
h1 {
  font-size: 3em;
  color: #ffffff;
  align-self: start;
  margin: 20px 0px 30px 50px;
}
</style>
