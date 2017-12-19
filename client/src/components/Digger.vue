<template>
  <div id='random'>
    <div class='navbar'>
      <div class='title'>Digger</div>
      <img src="../assets/vinyl.svg" alt="Logo">
      <input class='filter' v-on:click="showFilter" placeholder="Filter albums by style">
      <div v-on:click="refresh" id='refresh'>
        <img src="../assets/refresh.svg" alt="Refresh">
      </div>
    </div>
    <loading v-if="!release" class='loading'></loading>
    <release v-if="release" :release="release" class='release'></release>
    <div class='main'>
      <section class='colA'>
        <ytvideos v-if="videos" :videos="videos" class='videos'></ytvideos>
        <novideo v-if="release && !videos" class='no-video'></novideo>
      </section>
      <section class='colB'>
        <info v-if="release" :release="release" class='info'></info>
        <tracklist v-if="release" :tracks="release.tracklist" class='tracklist'></tracklist>
      </section>
    </div>
  </div>
</template>

<script>
import ReleaseTitle from './tinyComponents/ReleaseTitle';
import TracklistComponent from './tinyComponents/TracklistComponent';
import YoutubeComponent from './tinyComponents/YoutubeComponent';
import NoVideo from './tinyComponents/NoVideo';
import Loading from './tinyComponents/Loading';
import ReleaseInfo from './tinyComponents/ReleaseInfo';
import { getMainReleaseFromDiscogs, getRandomDiscogsRelease } from '../../api';
import { mapState } from 'vuex';
export default {
  name: 'Digger',
  data () {
    return {
      release: null,
      videos: null,
    };
  },
  components: {
    tracklist: TracklistComponent,
    ytvideos: YoutubeComponent,
    release: ReleaseTitle,
    novideo: NoVideo,
    info: ReleaseInfo,
    loading: Loading,
  },
  created () {
    this.refresh();
  },
  methods: {
    refresh: function () {
      this.release = null
      this.videos = null
      getRandomDiscogsRelease().then(release => {
        getMainReleaseFromDiscogs(release.MainReleaseID)
        .then(main => {
          this.release = main;
          this.videos = main.videos;
        });
    });
  },
    showFilter: function () {
      console.log('filter!')
    },
  },
  computed: mapState({
   styles: state => state.styles,
 })
}
</script>

<style scoped>
#random {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
}
.main {
  margin: 5px 0px 0px 0px;
  display: flex;
  flex-direction: row;
}
.colA {
  margin: 30px 0px 0px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.colB {
  margin: 30px 0px 0px 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.release {
  margin: 30px 0px 0px 0px;
  height: fit-content;
  align-self: center;
}
.loading {
  margin: 100px 0px 0px 0px;
  height: fit-content;
  align-self: center;
}
.tracklist {
  margin: 0px 0px 0px 0px;
  padding: 10px 30px 20px 0px;
  align-self: start;
}
.videos {
  margin: 0px 0px 0px 0px;
}
.no-video {
  margin-top: 60px;
}
/* Navbar styles */
.navbar {
  width: 100vw;
  height: 63px;
  box-sizing: border-box;
  background-color: #f3f3f3;
  padding: 9px 0px;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 6px 0px rgba(95, 95, 95, 0.2);
}
.navbar .title {
  font-size: 2.1em;
  font-family: 'Raleway', sans-serif;
  color: #1f1f1f;
  align-self: start;
  margin: 0px 0px 0px 16px;
  font-weight: 600;
}
.navbar img {
  width: 38px;
  margin: 7px 0px 1px 6px;
}
.filter {
  align-self: center;
  margin-left: 60px;
  height: 30px;
  width: 250px;
  border-radius: 16px;
  border: none;
  /* text */
  font-size: 1.4em;
  font-weight: 200;
  padding: 5px 0px 5px 30px;
  outline: none;
}
#refresh {
  width: 42px;
  height: 42px;
  margin-left: 25px;
  background-color: #2196F3;
  display: flex;
  /*align-items: center;*/
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.4);
}
#refresh img {
  width: 30px;
  margin-left: 3px;
  margin-bottom: 5px;
}
</style>
