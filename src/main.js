import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(BootstrapVue);

new Vue({
  VueRouter,
  render: h => h(App),
}).$mount('#app')
