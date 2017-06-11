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
	/* 增加一页 */
	addPage({ commit, state, getters }) {
		commit(types.ADD_PAGE, {
			phoneData : getters.phoneData
		})
	},
	/*	删除一页 */
	delPage({ commit, state, dispatch, getters }, page) {
		if (getters.pageLength > 1) {
			commit(types.DEL_PAGE, {
				page: page
			});
			dispatch('changePage', 0);
		} else {
			console.log('最少1页， 是否清空该页内容')
		}
	},
	/*	清空一页	*/
	emptyPage({ commit, state }, page) {
		commit(types.EMPTY_PAGE, {
			page: page
		})
	},
}
// mutations
const mutations = {
	[types.CHANGE_PAGE](state, payload) {
		state.currentPage = payload.page;
	},
	[types.ADD_PAGE](state, {phoneData}) {
		phoneData.data.push($.extend(true, {}, BASE_BLANK))
	},
	[types.DEL_PAGE](state, payload) {
		state.phone.data.splice(payload.page, 1);
	},
	[types.EMPTY_PAGE](state, payload) {
		Vue.set(state.phone.data, payload.page, $.extend(true, {}, BASE_BLANK))
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
