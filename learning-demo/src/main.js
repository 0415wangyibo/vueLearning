import Vue from 'vue'
import App from './App'
import router from './router/index';
import store from './store/store';
import urlApi from './axios/url';


// 全量引入ElementUI
import ElementUI from 'element-ui';
import './assets/css/common.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;

// 封装Axios
import { getRequest, postRequest, postJSON, post, postToken, multipleRequest } from './axios/http'
Vue.prototype.post = post;
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.multipleRequest = multipleRequest;
Vue.prototype.postJSON = postJSON;
Vue.prototype.postToken = postToken;
Vue.prototype.$urlApi = urlApi;

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
