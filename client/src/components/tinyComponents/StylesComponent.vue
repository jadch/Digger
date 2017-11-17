<template>
  <div id='styles'>
    <h1>Styles</h1>
    <section class='styles'>
      <p v-for="style in styles" :key="style">{{style}}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'StylesComponent',
  props: ['styles']
}
</script>

<style scoped>
#styles {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.styles {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
h1 {
  margin: 0px;
}
p {
  margin: 0px 15px;
}
</style>
