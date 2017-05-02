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
		currentItem : 0
	},
	getters: {
		pageLength: function(state) {
			return state.phone.data.length;
		},
		currentPage: function(state) {
			return state.currentPage
		},
		currentPhone: function(state) {
			return state.phone.data[state.currentPage]
		}
	},
	actions: {
		changePage: function({ commit, state }, page) {
			commit(types.CHANGE_PAGE, {
				page: page
			})
		},
		addPage: function({ commit, state }) {
			commit(types.ADD_PAGE)
		},
		changeMain: function({ commit, state }, payload) {
			commit(types.CHANGE_CURRENT_MAIN, payload);
		},
		addItem: function({ commit, state }, payload) {
			commit(types.ADD_ITEM, tpl[payload.type]());
		},
		changeStyle: function({commit, state}, payload){
			//哪个参数？
			//style
			commit(types.CHANGE_ITEM_STYLE, payload)

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
				// state.phone.
			}
		}
	}
})
