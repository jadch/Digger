<template>
  <section class='release'>
    <h2>Title: {{release.title}}</h2>
    <h2>Year: {{release.year}}</h2>
    <h2>Artist: {{release.artists[0].name}}</h2>
    <styles :styles="release.styles"></styles>
  </section>
</template>

<script>
import StylesComponent from './StylesComponent'
export default {
  name: 'ReleaseComponent',
  props: ['release'],
  components: {
    styles: StylesComponent
  }
}
</script>

<style scoped>

</style>
