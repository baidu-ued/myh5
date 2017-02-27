import Vue from 'vue'
import Vuex from 'vuex'
import page from './modules/page'
import phone from './modules/phone'
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		data: {
			main: {
				background: '#ffffff'
			},
			data: [{
				main: {
					background: '#ffffff'
				},
				data: [{
					type: 'txt',
					content: '刘少鹏啊',
					style: {
						position: 'absolute',
						background: '#cccccc',
						left: '120px',
						top: '100px',
						padding: '10px',
						lineHeight: '1',
						fontSize: '14px',
						// width : '60px',
						// height: '30px'
						// overflow:'hidden'
					}
				}]
			}]
		}
	},
	modules: {
		page,
		phone
	}
})
