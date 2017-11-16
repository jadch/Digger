<template>
  <div>
    <h1>Tracklist</h1>
    <section class='tracks' v-for="track in tracks" :key="track.position">
      <p>{{track.title}}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TracklistComponent',
  props: ['tracks']
}
</script>

<style scoped>
h1 {
  font-weight: normal;
}
</style>
