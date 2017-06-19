import Vue from 'vue'
import Vuex from 'vuex'
import tpl from '../tpl/tpl.js'
import page from './modules/page.js'
import m_phone from './modules/phone.js'
import panel from './modules/panel.js'
import setting from './modules/setting.js'
import * as types from './mutation-types.js'
import * as tplTypes from '../tpl/types.js'
Vue.use(Vuex);
const BASE_BLANK = {
	main: {
		background: '#ffffff',
		music : ''
	},
	data: []
}
export default new Vuex.Store({
	state: {
		phone: {
			main: {
				itemNumId: 0
			},
			set: {
				title: '', //标题
				desc: '', //描述
				allowPage: true, //是否允许翻页
			},
			data: [$.extend(true, {}, BASE_BLANK)]
		},
		tplTypes: tplTypes
	},
	getters: {
		tplTypes(state) {
			return state.tplTypes
		}
	},
	actions: {
		loadData({ commit, state }, data) {
			$.ajax({
				url: '/api/edit/get',
				type: 'get',
				data: {
					work_id: work_id
				},
				success: (rs) => {
					console.log(rs)
					let data = rs.data.data;
					if (!data) {
						data = $.extend(true, {}, state.phone)
					}
					commit(types.LOAD_DATA, {
						data: data
					})
				}
			});
		},
		savePhoneData: function({ commit, state }) {
			console.log(state.phone)
			$.ajax({
				url: '/api/edit/save',
				type: 'get',
				data: {
					work_id: work_id,
					data: JSON.stringify(state.phone)
				},
				success: (rs) => {
					console.log(rs);
				}
			});
		},
	},
	modules: {
		page,
		m_phone,
		panel,
		setting
	},
	mutations: {
		[types.LOAD_DATA](state, payload) {
			state.phone = payload.data;
		}
	}
})
