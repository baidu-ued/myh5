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
	/**
	 * @return {Number} 页码长度
	 */
	pageLength(state, getters, rootState) {
		return rootState.phone.data.length;
	},
	/**
	 * @return {Number} 当前页码， 从0开始
	 */
	currentPage(state) {
		return state.currentPage
	}
}
// actions
const actions = {
	/**
	 * 改变活跃页
	 * @param {Number} page 页码
	 */
	selectPage({ commit, state }, page) {
		commit(types.SELECT_PAGE, {
			page: page
		})
	},
	/**
	 * 页码排序
	 */
	sortPage({ commit, state, getters, dispatch }, { list, index }) {
		commit(types.SORT_PAGE, {
			phoneData: getters.phoneData,
			list: list
		});
		dispatch('selectPage', index)
	},
	/**
	 * 页尾增加一页
	 */
	addPage({ commit, state, getters }) {
		commit(types.ADD_PAGE, {
			phoneData: getters.phoneData
		})
	},
	/**
	 * 删除指定页
	 * @param {Number} page 页码
	 */
	delPage({ commit, state, dispatch, getters }, page) {
		if (getters.pageLength > 1) {
			commit(types.DEL_PAGE, {
				phoneData: getters.phoneData,
				page: page
			});
			if (state.currentPage > getters.phoneData.data.length - 1) {
				dispatch('selectPage', getters.phoneData.data.length - 1);
			}
		} else {
			console.log('最少1页， 是否清空该页内容')
		}
	},
	/**
	 * 清空指定页
	 * @param {Number} page 页码
	 */
	emptyPage({ commit, state, getters }, page) {
		commit(types.EMPTY_PAGE, {
			phoneData: getters.phoneData,
			page: page
		})
	},
}
// mutations
const mutations = {
	/**
	 * 选择一页
	 * @param {Number} phoneData 老列表
	 * @param {Number} list      新列表
	 */
	[types.SORT_PAGE](state, { phoneData, list }) {
		phoneData.data = list;
	},
	/**
	 * 选择一页
	 * @param {Number} page 页码
	 */
	[types.SELECT_PAGE](state, { page }) {
		state.currentPage = page;
	},
	/**
	 * 页尾增加一页
	 * @param {Number} phoneData 数据列表
	 */
	[types.ADD_PAGE](state, { phoneData }) {
		phoneData.data.push($.extend(true, {}, BASE_BLANK))
	},
	/**
	 * 删除指定页
	 * @param {Number} phoneData 数据列表
	 * @param {Number} page      要删除的页码
	 */
	[types.DEL_PAGE](state, { phoneData, page }) {
		phoneData.data.splice(page, 1);
	},
	/**
	 * 清空指定页
	 * @param {Number} phoneData 数据列表
	 * @param {Number} page      要清空的页码
	 */
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
