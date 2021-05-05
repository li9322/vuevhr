import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {getRequest} from './utils/api'
import {keyValueRequest} from './utils/api'
import {postRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {putRequest} from './utils/api'
import { initMenu } from './utils/menus'
import 'font-awesome/css/font-awesome.min.css'


Vue.use(Element)

router.beforeEach((to, from, next) => {
  if(to.path=='/'){
    next();
  }else{
    if(window.sessionStorage.getItem("user")){
      initMenu(router,store);
      next();
    }else{
      next("/?redirect="+to.path);
    }
   
  }
 
})

Vue.prototype.getRequest=getRequest;
Vue.prototype.keyValueRequest=keyValueRequest;
Vue.prototype.postRequest=postRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.prototype.putRequest=putRequest;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
