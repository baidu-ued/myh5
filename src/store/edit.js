import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jQuery'
import * as types from './mutation-types.js'
import * as CONST from '../const/edit.js'
import tpl from '../tpl/tpl.js'
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		currentPage: 0,
		phone: {
			main: {},
			data: [$.extend(true, {}, CONST.BASE_BLANK)]
		},
		currentItemId : -1
	},
	getters: {
		/* 总页码:Number */
		pageLength: function(state) {
			return state.phone.data.length;
		},
		/* 当前页码:Number */
		currentPage: function(state) {
			return state.currentPage
		},
		/* 当前页:Object */
		currentPhone: function(state) {
			return state.phone.data[state.currentPage]
		},
		/* 当前元素:Object */
		currentItem:function(state, getters){
			// console.log(getters.currentPhone.data[state.currentItem])
			return getters.currentPhone.data[state.currentItemId]
		},
		/* 当前元素id:Number */
		currentItemId : function(state){
			return state.currentItemId;
		}
	},
	actions: {
		/* 改变页码 */
		changePage: function({ commit, state }, page) {
			commit(types.CHANGE_PAGE, {
				page: page
			})
		},
		/* 增加一页 */
		addPage: function({ commit, state }) {
			commit(types.ADD_PAGE)
		},
		/* 增加一页 */
		changeMain: function({ commit, state }, payload) {
			commit(types.CHANGE_CURRENT_MAIN, payload);
		},
		/* 增加元素 */
		addItem: function({ commit, state }, payload) {
			commit(types.ADD_ITEM, tpl[payload.type]());
		},

		changeStyle: function({commit, state}, payload){
			//哪个参数？
			//style
			commit(types.CHANGE_ITEM_STYLE, payload)
		},

		/* 根据id选择元素 */
		selectItem : function({commit, state}, index){
			console.log(index)
			commit(types.SELECT_ITEM, {
				index : index
			})
		}
	},
	mutations: {
		[types.CHANGE_CURRENT_MAIN](state, payload) {
			state.phone.data[state.currentPage].main[payload[0]] = payload[1];
		},
		[types.CHANGE_PAGE](state, payload) {
			state.currentPage = payload.page;
		},
		[types.ADD_PAGE](state) {
			state.phone.data.push($.extend(true, {}, CONST.BASE_BLANK))
		},
		[types.ADD_ITEM](state, payload) {
			state.phone.data[state.currentPage].data.push(payload);
		},
		[types.CHANGE_ITEM_STYLE](state, payload){
			for(var attr in payload){
				state.phone.data[state.currentPage].data[state.currentItemId].style[attr] = payload[attr];
			}
		},
		[types.SELECT_ITEM](state, payload){
			state.currentItemId = payload.index;
		}
	}
})
