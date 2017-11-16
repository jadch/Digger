<template>
  <div>
    <h1>Digger</h1>
  </div>
</template>

<script>
import { getRandomDiscogsRelease } from '../../api'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    }
  },
  created () {
    console.log('woo')
    getRandomDiscogsRelease()
      .then(release => {
        console.log(release)
      })
  }
}
</script>

<style scoped>
h1 {
  font-weight: normal;
}
</style>
