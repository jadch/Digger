<template>
  <div>
    <h1>Digger</h1>
    <section class='release' v-if="release">
      <h1>Title: {{release.title}}</h1>
      <h1>Year: {{release.year}}</h1>
      <h1>Artist: {{release.artists[0].name}}</h1>
    </section>
  </div>
</template>

<script>
import { getRandomDiscogsRelease } from '../../api'
export default {
  name: 'RandomPage',
  data () {
    return {
      release: null
    }
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
h1 {
  font-weight: normal;
}
</style>
