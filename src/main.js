import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import  'amfe-flexible'
import "./assets/reset.css"
import { getToken } from "@/utils/auth"
Vue.config.productionTip = false
import Mui from 'vue-awesome-mui';
Vue.use(Mui);

import { Dialog, Notify } from 'vant'
Vue.use(Dialog)
Vue.use(Notify);

router.beforeEach((to, from, next) => {
    // next();
    if(to.name == 'login' && (getToken() == null || getToken() == "")){
      next();
      return;
    }
    console.log("路由", to, from, next, getToken());
    if(getToken()){
      console.log("有token");
      if(to.name == 'login'){
        next("/");
      } else {
        next();
      }
    } else {
      console.log("没有token");
      next('/login');
    }
})
let vueThis = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vueThis
