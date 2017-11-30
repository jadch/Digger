<template>
  <section class='info'>
    <h1>Info</h1>
  </section>
</template>

<script>
// import StylesComponent from './StylesComponent'
export default {
  name: 'ReleaseInfo',
  props: ['release'],
  // components: {
  //   styles: StylesComponent
  // }
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
</style>
