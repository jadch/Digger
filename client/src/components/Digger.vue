<template>
  <div id='random'>
    <navbar></navbar>
    <release v-if="release" :release="release" class='release'></release>
    <ytvideos v-if="videos" :videos="videos" class='videos'></ytvideos>
    <novideo v-if="release && !videos" class='no-video'></novideo>
    <!-- <div v-if="release" class='main'>
      <tracklist :tracks="release.tracklist" class='tracklist'></tracklist>
    </div> -->
    <div v-on:click="refresh" id='refresh'>
      <img src="../assets/refresh.svg" alt="Refresh">
    </div>
  </div>
</template>

<script>
import NavBar from './tinyComponents/NavBar'
import ReleaseTitle from './tinyComponents/ReleaseTitle'
import TracklistComponent from './tinyComponents/TracklistComponent'
import YoutubeComponent from './tinyComponents/YoutubeComponent'
import NoVideo from './tinyComponents/NoVideo'
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
    release: ReleaseTitle,
    novideo: NoVideo,
    navbar: NavBar
  },
  created () {
    getRandomDiscogsRelease()
      .then(release => {
        this.release = release
        if ("videos" in release) {
          this.videos = release.videos
        }
      })
  },
  methods: {
    refresh: function () {
      this.release = null
      this.videos = null
      getRandomDiscogsRelease()
        .then(release => {
          if ("videos" in release) {
            this.release = release
            this.videos = release.videos
          } else {
            this.refresh()
          }
        })
    }
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
  background-color: #4fb1ff;
}
.main {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.release {
  margin: 40px 50px 0px 50px;
  height: fit-content;
}
.videos {
  margin: 50px 0px;
}
.no-video {
  margin-top: 60px;
}
#refresh {
  width: 55px;
  height: 55px;
  position: absolute;
  left: 7vw;
  top: 35vh;
  background-color: #8BC34A;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 3px 6px 0 rgba(0,0,0,0.4);
}
img {
  width: 38px;
  margin-left: 3px;
}
</style>
