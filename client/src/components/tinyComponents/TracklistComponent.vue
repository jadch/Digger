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
  padding: 25px 30px;
  text-align: start;
}
.track {
  margin: 1px 5px;
  font-weight: 300;
  font-size: 1.2em;
  text-align: start;
}
h1 {
  font-weight: 400;
  font-size: 1.5em;
  margin: 0px 0px 10px 0px;
  text-align: center;
}
</style>
