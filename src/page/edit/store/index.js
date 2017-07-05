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
		music: ''
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
		tplTypes: tplTypes,
		colorPicker : {
			show : false,
			color : '',
			attr : ''
		}
	},
	getters: {
		tplTypes(state) {
			return state.tplTypes
		},
		colorPicker(state){
			return state.colorPicker;
		},
	},
	actions: {

		colorPickerShow({commit}, {color, attr}){
			commit('colorPickerShow', {
				color : color,
				attr : attr
			})
		},
		colorPickerHide({commit}, val){
			commit('colorPickerHide', {

			});
		},
		/**
		 * 加载数据
		 */
		loadData({ commit, state }) {
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
		/**
		 * 保存数据
		 */
		savePhoneData: function({ commit, state }) {
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
	mutations: {
		[types.LOAD_DATA](state, { data }) {
			state.phone = data;
		},
		colorPickerShow(state, { color, attr }){
			state.colorPicker.show = true;
			state.colorPicker.color = color;
			state.colorPicker.attr = attr;
		},
		colorPickerHide(state){
			state.colorPicker.show = false;
		}
	},
	modules: {
		page,
		m_phone,
		panel,
		setting
	}
})
