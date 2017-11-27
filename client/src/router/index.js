import Vue from 'vue';
import Router from 'vue-router';
import Digger from '../components/Digger.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Digger',
      component: Digger,
    },
  ],
});
