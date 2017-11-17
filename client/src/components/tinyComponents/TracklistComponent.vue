<template>
  <div id='tracklist'>
    <h1>Tracklist</h1>
    <section class='tracks' v-for="track in tracks" :key="track.position">
      <h2>
        {{track.title}}
        <span v-if="track.duration">
          ({{track.duration}})
        </span>
      </h2>
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
#tracklist {
  border-radius: 10px;
  background-color: #e4e3e3;
  text-align: center;
  padding: 10px 30px;
}
</style>
