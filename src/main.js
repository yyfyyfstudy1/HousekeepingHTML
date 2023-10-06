import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css';
import axios from "axios";
import store from './store'; // 引入 Vuex store
import * as VueGoogleMaps from "vue2-google-maps";
import VueParticles from 'vue-particles';
// 引入
import router from './router'
import VueRouter from 'vue-router'
import VCalendar from 'v-calendar';

Vue.prototype.$axios = axios;
Vue.prototype.$httpurl = ' http://localhost:8082'
Vue.prototype.$websocketurl = 'ws://localhost:8082'

// Vue.prototype.$httpurl = ' http://172.20.10.5:8082'
// Vue.prototype.$websocketurl = 'ws://172.20.10.5:8082'
Vue.config.productionTip = false;
Vue.use(VueParticles);
Vue.use(ElementUI);
Vue.use(VCalendar, {
  componentPrefix: 'vc',
});
Vue.use(VueRouter) // router plugin
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDM_dL6KmNoXYqXsAR8HFsYAftHpIVk4Mg",
    libraries: "places"
  }
});
new Vue({
  render: h => h(App),
  //注册
  router,
  store // 将 Vuex store 挂载到 Vue 实例上
}).$mount('#app')
