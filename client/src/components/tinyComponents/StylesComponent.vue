<template>
  <div id='styles'>
    <section class='styles'>
      <p v-for="style in styles"  @click="click" :key="style" class='tag'>{{style}}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'StylesComponent',
  props: ['styles'],
  methods: {
    click : function (e) {
      const style = e.target.innerHTML;
      this.$store.dispatch('addStyleFilter', style)
    }
  }
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
.tag {
  margin: 0px 10px;
  padding: 5px 10px;
  border-radius: 11px;
  background-color: #8BC34A;
  font-size: 1em;
  font-weight: 600;
  color: #ffffff;
}
h1 {
  margin: 0px;
}
</style>
