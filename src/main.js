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

import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueLoading);

Vue.prototype.$axios = axios;
// Vue.prototype.$httpurl = ' http://localhost:8082'
// Vue.prototype.$websocketurl = 'ws://localhost:8082'

Vue.prototype.$httpurl = 'http://172.20.10.5:8082'
Vue.prototype.$websocketurl = 'ws://172.20.10.5:8082'
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

Vue.filter('timestampToHumanReadable', function(value) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
});

new Vue({
  render: h => h(App),
  //注册
  router,
  store // 将 Vuex store 挂载到 Vue 实例上
}).$mount('#app')
