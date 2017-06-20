import Vue from 'vue'
import * as types from '../mutation-types'
// initial state
const BASE_BLANK = {
	main: {
		background: '#ffffff'
	},
	data: []
}
const state = {
	currentPage: 0
}
// getters
const getters = {
	pageLength(state, getters, rootState) {
		return rootState.phone.data.length;
	},
	currentPage(state) {
		return state.currentPage
	}
}
// actions
const actions = {
	/* 改变页码 */
	changePage({ commit, state }, page) {

		commit(types.CHANGE_PAGE, {
			page: page
		})
	},
	sortPage({ commit, state, getters, dispatch }, { list, index }) {
		commit(types.SORT_PAGE, {
			phoneData: getters.phoneData,
			list: list
		});
		dispatch('changePage', index)
	},
	/* 增加一页 */
	addPage({ commit, state, getters }) {
		commit(types.ADD_PAGE, {
			phoneData: getters.phoneData
		})
	},
	/*	删除一页 */
	delPage({ commit, state, dispatch, getters }, page) {
		if (getters.pageLength > 1) {
			commit(types.DEL_PAGE, {
				phoneData: getters.phoneData,
				page: page
			});
			dispatch('changePage', 0);
		} else {
			console.log('最少1页， 是否清空该页内容')
		}
	},
	/*	清空一页	*/
	emptyPage({ commit, state, getters }, page) {
		commit(types.EMPTY_PAGE, {
			phoneData: getters.phoneData,
			page: page
		})
	},
}
// mutations
const mutations = {
	[types.SORT_PAGE](state, { phoneData, list }) {
		phoneData.data = list;
	},
	[types.CHANGE_PAGE](state, { page }) {
		state.currentPage = page;
	},
	[types.ADD_PAGE](state, { phoneData }) {
		phoneData.data.push($.extend(true, {}, BASE_BLANK))
	},
	[types.DEL_PAGE](state, { phoneData, page }) {
		phoneData.data.splice(page, 1);
	},
	[types.EMPTY_PAGE](state, { phoneData, page }) {
		Vue.set(phoneData.data, page, $.extend(true, {}, BASE_BLANK))
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
