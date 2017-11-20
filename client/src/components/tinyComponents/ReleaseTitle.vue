<template>
  <section class='release'>
    <h1>{{release.title}}</h1>
    <h2> {{release.artists[0].name}}</h2>
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
  /* color: #0e0e0e; */
  color: #1b1a1a;
  font-family: 'Raleway', sans-serif;
 }
 h1 {
  font-weight: 500;
  font-size: 2.8em;
  margin: 0px 0px 5px 0px;
 }
h2 {
  font-weight: 500;
  font-size: 2.4em;
  margin: 5px 0px 0px 0px;
 }
 h2 span {
   font-weight: 400;
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

/* font-family: 'Khula', sans-serif;
font-family: 'Raleway', sans-serif; */
</style>
