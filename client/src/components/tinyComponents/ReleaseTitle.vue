<template>
  <section class='release'>
    <h1>{{release.title}}</h1>
    <p>by</p>
    <h2>{{release.artists[0].name}}</h2>
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
 }
 h1 {
  font-weight: 500;
  font-size: 2.4em;
  margin: 0px 0px 5px 0px;
 }
h2 {
  font-weight: 500;
  font-size: 2.1em;
  margin: 5px 0px 0px 0px;
 }
 p {
  margin: 0px;
  font-weight: 500;
  font-size: 1.7em;
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
