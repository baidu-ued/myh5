import Vue from 'vue'
import App from './components/list/App.vue'
import store from './store/list.js'
Vue.config.productionTip = false
new Vue({
	el: '#app',
	store,
	template: '<App/>',
	components: { App }
})
