import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jQuery'
import * as types from './mutation-types.js'
import * as api from '../api/index.js'
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		list: [],
		activePage: 1,
		pageNum: 1,
		loadMorePage: 1
	},
	getters: {
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
		},
		loadMore({ commit, state }, cb) {
			$.ajax({
				url: '/api/list/get',
				type: 'get',
				data: {
					limit: 20,
					page: state.loadMorePage
				},
				success: (rs) => {
					console.log(rs.data)
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
