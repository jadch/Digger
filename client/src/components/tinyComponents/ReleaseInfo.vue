<template>
  <section class='info'>
    <p>Label: {{label}}</p>
    <p>Catalogue Num: {{catno}}</p>
    <p>Released: {{released}}</p>
    <p>Country: {{release.country}}</p>
    <p>Rated: {{rating}}</p>
    <p v-if="stats">Want: {{stats.want}}</p>
    <p v-if="stats">Have: {{stats.have}}</p>
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
 .release {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #1b1a1a;
 }
 h1 {
  font-weight: 600;
  font-size: 1.9em;
  margin: 0px 0px 5px 0px;
 }
 p {
   margin: 1px 5px;
   font-weight: 400;
   font-size: 1.2em;
   text-align: start;
 }
</style>
