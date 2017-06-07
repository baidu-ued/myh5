import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jQuery'
import * as types from './mutation-types-list.js'
import * as api from '../api/list.js'
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		type: 'sports',
		list: [],
		activePage: 1,
		pageNum: 1,
		loadMorePage: 1
	},
	getters: {
		type: function(state) {
			return state.type
		},
		list: function(state) {
			return state.list
		},
		activePage: function(state) {
			return state.activePage
		},
		pageNum: function(state) {
			return state.pageNum
		}
	},
	actions: {
		addPage({ commit, state }) {
			api.add();
			//新增一页
			// commit(types.ADD_PAGE);
		},
		// changePage: function({ commit, state }, page) {
		// 	commit(types.CHANGE_PAGE, {
		// 		activePage: page
		// 	});
		// 	api.get({
		// 		page: page,
		// 		length: 12
		// 	}, function(rs) {
		// 		commit(types.CHANGE_LIST, {
		// 			type : 'cover',
		// 			list: rs.data.data
		// 		});
		// 	})
		// },
		// changeType: function({ commit }, type) {
		// 	api.get({
		// 		page: 1,
		// 		length: 12,
		// 		type: type
		// 	}, function(rs) {
		// 		commit(types.CHANGE_LIST, {
		// 			type : 'cover',
		// 			list: rs.data.data
		// 		});
		// 		commit(types.CHANGE_PAGE, {
		// 			activePage: 1,
		// 			pageNum: rs.data.pageNum
		// 		});
		// 	})
		// 	commit(types.CHANGE_TYPE, {
		// 		type: type
		// 	});
		// },
		loadMore({ commit, state }, cb) {
			$.ajax({
				url: '/api/list/get',
				type: 'get',
				data: {
					length: 20,
					page: state.loadMorePage
				},
				success: (rs) => {
					commit(types.CHANGE_LIST, {
						type: 'push',
						list: rs.data.data
					});
					cb && cb(rs.data.data.length);
				}
			});
		}
	},
	mutations: {
		[types.CHANGE_TYPE](state, payload) {
			state.type = payload.type;
		},
		[types.CHANGE_LIST](state, payload) {
			if (payload.type == 'cover') {
				state.list = payload.list;
			} else if (payload.type == 'push') {
				state.list.push(...payload.list);
			}
			state.loadMorePage++;
		},
		[types.CHANGE_PAGE](state, payload) {
			state.activePage = payload.activePage || 1;
			state.pageNum = payload.pageNum || state.pageNum;
		}
	}
})
