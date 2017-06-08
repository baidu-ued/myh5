import Vue from 'vue'
import App from '../../components/backstage/App.vue'
// import store from '../../store/edit.js'
Vue.config.productionTip = false
new Vue({
	el: '#app',
	// store,
	template: '<App/>',
	components: { App }
})
