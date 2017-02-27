/*
	功能：
	添加，删除，选中
*/
import * as types from '../mutation-types.js'
// initial state
const state = {
	activePage: 0
}
// getters
const getters = {
	pageList: (state, getters, rootState) => {
		return rootState.data.data;
	},
	activePage: (state) => {
		return state.activePage;
	}
}
// actions
const actions = {
	addPage({ commit, getters }) {
		commit(types.ADD_PAGE, {
			pageList: getters.pageList
		});
		commit(types.SELECT_PAGE, {
			index : getters.pageList.length - 1
		});
	},
	delPage({ commit, getters }, index) {
		// console.log(typeof index);
		// a(String, Number);
		// function a(...a){
		// 	console.log(a[0]);
		// }


		if(!index || typeof index != 'number'){
			return;
		}
		commit(types.DELETE_PAGE, {
			pageList: getters.pageList,
			index: index
		})

		commit(types.SELECT_PAGE, {
			index: index - 1
		})
	},
	selectPage({ commit }, index) {
		commit(types.SELECT_PAGE, {
			index: index
		})
	}
}
// mutations
const mutations = {
	[types.ADD_PAGE](state, payload) {
		payload.pageList.push({
			main : {

			},
			data : []
		});
	},
	[types.DELETE_PAGE](state, payload) {
		payload.pageList.splice(payload.index, 1);
	},
	[types.SELECT_PAGE](state, payload) {
		state.activePage = payload.index;
	}
}
export default {
	state,
	getters,
	actions,
	mutations
}
