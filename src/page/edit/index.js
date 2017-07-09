import Vue from 'vue'
import App from './components/App.vue'
import store from './store/index.js'
import '../../public/css/reset.css'
import '../../public/css/animation.css'
import '../../public/iconfont/iconfont.js'
import './css/index.css'
import './keycode/index.js'
Vue.config.productionTip = false
new Vue({
	el: '#app',
	store,
	template: '<App/>',
	components: { App }
})
