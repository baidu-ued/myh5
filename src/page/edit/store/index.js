import Vue from 'vue'
import Vuex from 'vuex'
import tpl from '../tpl/tpl.js'
import page from './modules/page.js'
import m_phone from './modules/phone.js'
import panel from './modules/panel.js'
import setting from './modules/setting.js'
import * as tplTypes from '../tpl/types.js'
import { loadData } from '../api/index.js'
Vue.use(Vuex);
const types = {
	LOAD_DATA: 'LOAD_DATA'
};
const BASE_BLANK = {
	main: {
		background: '#ffffff',
		music: ''
	},
	data: []
};
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
		colorPicker: {
			show: false,
			color: '',
			attr: ''
		}
	},
	getters: {
		/**
		 * @return {Object} 元素类型对象
		 */
		tplTypes(state) {
			return state.tplTypes
		},
		/**
		 * @return {Object} 颜色选择器属性
		 */
		colorPicker(state) {
			return state.colorPicker;
		},
	},
	actions: {
		/**
		 * 启动颜色选择器
		 * @param {String} color  指定元素指定属性的颜色
		 * @param {String} attr   指定元素的指定属性
		 */
		colorPickerShow({ commit }, { color, attr }) {
			if (!color || !attr) {
				console.log('颜色or属性不存在');
				return;
			}
			commit('colorPickerShow', {
				color: color,
				attr: attr
			})
		},
		/**
		 * 关闭颜色选择器
		 */
		colorPickerHide({ commit }) {
			commit('colorPickerHide');
		},
		/**
		 * 加载数据
		 */
		loadData: async({ commit, state }) => {
			let data = await loadData({
				work_id: work_id
			});
			if (!data) {
				data = $.extend(true, {}, state.phone)
			}
			commit(types.LOAD_DATA, {
				data: data
			})
		},
		/**
		 * 保存数据
		 * @type {[type]}
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
		/**
		 * 颜色选择器 显示
		 * @param  {String} color 初始颜色
		 * @param  {String} attr  要操作的属性
		 */
		colorPickerShow(state, { color, attr }) {
			state.colorPicker.show = true;
			state.colorPicker.color = color;
			state.colorPicker.attr = attr;
		},
		/**
		 * 颜色选择器 隐藏
		 * @param  {String} color 初始颜色
		 * @param  {String} attr  要操作的属性
		 */
		colorPickerHide(state) {
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
