// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './util/axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './util/api'
import serve from '../static/serve'
import VueClipboard from 'vue-clipboard2'

Vue.use(ElementUI);


Vue.use(VueClipboard)

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype.$API = api;
Vue.prototype.$serve = serve;

require('../src/assets/reset.less')

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
