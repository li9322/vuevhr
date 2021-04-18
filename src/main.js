import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {getRequest} from './utils/api'
import {keyValueRequest} from './utils/api'
import {postRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {putRequest} from './utils/api'


Vue.use(Element)

Vue.prototype.getRequest=getRequest;
Vue.prototype.keyValueRequest=keyValueRequest;
Vue.prototype.postRequest=postRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.prototype.putRequest=putRequest;


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
