import Vue from 'vue';
// import VueLazyload from 'vue-lazyload';
import fastclick from 'fastclick';
import axios from './utils/axios';
import 'swiper/dist/css/swiper.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.prototype.$axios = axios;
fastclick.attach(document.body);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

// document.addEventListener('touchmove', function (e) { e.preventDefault(); });
