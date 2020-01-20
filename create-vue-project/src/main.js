// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/common.css';

import urlApi from './axios/url';

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
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
