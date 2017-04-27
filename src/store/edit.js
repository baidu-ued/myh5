import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jQuery'
import * as types from './mutation-types.js'
// import * as api from '../api/edit.js'
import * as CONST from '../const/edit.js'
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		currentPage: 0,
		phone: {
			main: {},
			data: [$.extend(true, {}, CONST.BASE_BLANK)]
		}
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
		swapPage: function({ commit, state }, page) {
			//交换页
			commit('aaa')
		},
		changeMain: function({ commit, state }, payload) {
			for (var attr in payload) {
				commit('aaab', {
					[attr]: payload[attr]
				});
			}
		}
	},
	mutations: {
		aaa(state, payload) {
			state.phone.data[state.currentPage].main.background = 'red';
		},
		aaab(state, payload) {
			for(var attr in payload){
				state.phone.data[state.currentPage].main[attr] = payload[attr];
			}
		},
		[types.CHANGE_PAGE](state, payload) {
			state.currentPage = payload.page;
		},
		[types.ADD_PAGE](state) {
			state.phone.data.push($.extend(true, {}, CONST.BASE_BLANK))
		},
	}
})
