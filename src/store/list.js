import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jQuery'
import * as types from './mutation-types.js'
import * as api from '../api/list.js'


Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		type: 'sports',
		list: [],
		activePage : 1,
		pageNum : 1
	},
	getters: {
		type : function(state){
			return state.type
		},
		list: function(state) {
			return state.list
		},
		activePage : function(state){
			return state.activePage
		},
		pageNum : function(state){
			return state.pageNum
		}
	},

	actions: {
		changePage : function({commit, state}, page){
			commit(types.CHANGE_PAGE, {
				activePage: page
			});
			api.get({
				page : page,
				length : 12,
				type : state.type
			}, function(rs){
				commit(types.CHANGE_LIST, {
					list: rs.data.data
				});
			})
		},
		changeType: function({ commit }, type) {
			api.get({
				page : 1,
				length : 12,
				type : type
			}, function(rs){
				commit(types.CHANGE_LIST, {
					list: rs.data.data
				});
				commit(types.CHANGE_PAGE, {
					activePage: 1,
					pageNum : rs.data.pageNum
				});
			})
			commit(types.CHANGE_TYPE, {
				type: type
			});

		}
	},
	mutations: {
		[types.CHANGE_TYPE](state, payload) {
			state.type = payload.type;
		},
		[types.CHANGE_LIST](state, payload) {
			state.list = payload.list;
		},
		[types.CHANGE_PAGE](state, payload){
			state.activePage = payload.activePage || 1;
			state.pageNum = payload.pageNum || state.pageNum;
		}
	}
})
