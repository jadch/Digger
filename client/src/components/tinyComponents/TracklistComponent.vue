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
  background-color: #e8e8e8;
  border-radius: 10px;
  padding: 30px 50px;
  text-align: center;
}
.track {
  margin: 0px 0px;
  font-weight: 400;
  text-align: start;
}
h1 {
  font-weight: 500;
  margin: 0px 0px 5px 0px;
}
</style>
