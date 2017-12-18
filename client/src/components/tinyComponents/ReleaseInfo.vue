<template>
  <section class='info'>
    <p>Label: <span> {{label}}</span></p>
    <p>Released: <span> {{released}}</span></p>
    <p>Country: <span> {{release.country}}</span></p>
    <p>Rated: <span> {{rating}}</span></p>
    <p v-if="stats">Want: <span> {{stats.want}}</span></p>
    <p v-if="stats">Have: <span> {{stats.have}}</span></p>
    <p>Catalogue Num: <span> {{catno}}</span></p>
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
  font-size: 1.1em;
  background-color: #a4cff4;
  padding: 25px 30px;
  border-radius: 20px;
 }
 p {
   margin: 0px;
   font-weight: 100;
 }
 span {
   font-weight: 400;
 }
</style>
