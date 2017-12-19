<template>
  <section class='info'>
    <p>label: <span id='content'> {{label}}</span></p>
    <p>released: <span id='content'> {{released}}</span></p>
    <p>country: <span id='content'> {{release.country}}</span></p>
    <p>rated: <span id='content'> {{rating}}</span></p>
    <p v-if="stats">want: <span id='content'> {{stats.want}}</span></p>
    <p v-if="stats">have: <span id='content'> {{stats.have}}</span></p>
    <p>catalogue num: <span id='content'> {{catno}}</span></p>
  </section>
</template>

<script>
export default {
  name: 'ReleaseInfo',
  props: ['release'],
  computed: {
    label: function () {
      return this.release.labels[0].name;
    },
    catno: function () {
      return this.release.labels[0].catno;
    },
    released: function () {
      return this.release.released_formatted ? this.release.released_formatted : this.release.year;
    },
    rating: function () {
      const community = this.release.community;
      if (community !== undefined && community.rating !== undefined) {
        return `${community.rating.average}/5 by ${community.rating.count} Discogs users`
      } else {
        return 'NA'
      }
    },
    stats: function () {
      const community = this.release.community;
      if (community !== undefined) {
        return {
          want: community.want,
          have: community.have,
        };
      } else {
        return null;
      }
    },
  },
}
</script>

<style scoped>
 .info {
  display: flex;
  flex-direction: column;
  text-align: start;
  background-color: #a4cff4;
  padding: 25px 30px;
  border-radius: 20px;
  line-height: 19px;
 }
 p {
  font-size: 19.3px;
  margin: 0px;
  font-weight: 200;
  font-family: Helvetica;
  font-variant: small-caps;
}
#content {
  margin-left: 1.5px;
  font-size: 18px;
  font-weight: 200;
  font-variant: none;
 }
</style>
