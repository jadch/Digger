<template>
  <div v-if="release" id='random'>
    <h1>Digger</h1>
    <section class='release'>
      <h2>Title: {{release.title}}</h2>
      <h2>Year: {{release.year}}</h2>
      <h2>Artist: {{release.artists[0].name}}</h2>
    </section>
    <tracklist :tracks="release.tracklist"></tracklist>
  </div>
</template>

<script>
import TracklistComponent from './tinyComponents/TracklistComponent'
import { getRandomDiscogsRelease } from '../../api'
export default {
  name: 'RandomPage',
  data () {
    return {
      release: null
    }
  },
  components: {
    tracklist: TracklistComponent
  },
  created () {
    getRandomDiscogsRelease()
      .then(release => {
        this.release = release
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
  background-color: #f9f9f9;
}
h1 {
  font-size: 3em;
}
</style>
