import Vue from 'vue'
import App from './App.vue'
import Details from '../src/components/Details'
import MainContent from '../src/components/MainContent'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'


Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueRouter);


const router = new VueRouter({
  routes: [
    { path: '/', component: MainContent },
    { path: '/details/:country_name', component: Details }
  ]
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
