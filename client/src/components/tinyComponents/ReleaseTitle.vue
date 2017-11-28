<template>
  <section class='release'>
    <h1>
      {{release.title}}
      -
      <span class='artist'> {{release.artists[0].name}}</span>
    </h1>
    <article>
      <h3 v-if="release.year !== 0">Released in {{release.year}}</h3>
      <styles :styles="release.styles" class='styles'></styles>
    </article>
  </section>
</template>

<script>
import StylesComponent from './StylesComponent'
export default {
  name: 'ReleaseTitle',
  props: ['release'],
  components: {
    styles: StylesComponent
  }
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
  font-size: 2em;
  margin: 0px 0px 0px 0px;
 }
 h3 {
  margin: 22px 0px;
  font-weight: 200;
  font-size: 1.3em;
  font-style: italic;
}
 article {
   display: flex;
   flex-direction: row;
 }
 .styles {
  margin: 20px 0px;
 }
</style>
