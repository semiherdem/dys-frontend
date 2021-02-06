// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { router } from './router/router'
import store from './store/store'
import Vuelidate from 'vuelidate'
import VueToast from 'vue-toast-notification';

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(VueToast);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
