<template>
  <div id='tracklist'>
    <h1>Tracklist</h1>
      <h2 class='track' v-for="track in tracks" :key="track.position">
        {{track.title}}
        <span v-if="track.duration">
          ({{track.duration}})
        </span>
      </h2>
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
  background-color: #d1ddea;
  border-radius: 10px;
  text-align: center;
}
.track {
  margin: 0px 2px;
  font-weight: 500;
  font-size: 1.3em;
  text-align: start;
}
h1 {
  font-weight: 500;
  font-size: 1.9em;
  margin: 0px 0px 15px 0px;
}
</style>
