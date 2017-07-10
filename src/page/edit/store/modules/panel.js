import Vue from 'vue'
const types = {
	PANEL_SHOW: 'PANEL_SHOW',
	PANEL_HIDE: 'PANEL_HIDE'
}
// initial state
const state = {
	panelStatus: {}
}
// getters
const getters = {
	/**
	 * [panelStatus description]
	 * @return {Object}       面板状态对象
	 */
	panelStatus(state) {
		return state.panelStatus
	}
}
// actions
const actions = {
	/**
	 * 面板显示
	 * @param  {String} type   需要展示的面板类型(元素什么类型面板就是什么类型)
	 */
	panelShow({ commit, state, dispatch, rootGetters }, type) {
		//如果当前选中元素类型相同
		if (rootGetters.isSingleSelect && rootGetters.currentItem.type == type) {} else {
			dispatch('cancelSelect');
		}
		commit(types.PANEL_SHOW, {
			type: type
		})
	},
	/**
	 * 面板隐藏
	 * @param  {String} type   需要隐藏的面板类型(元素什么类型面板就是什么类型)
	 */
	panelHide({ commit, state }, type) {
		commit(types.PANEL_HIDE, {
			type: type
		})
	},
}
// mutations
const mutations = {
	[types.PANEL_SHOW](state, { type }) {
		Vue.set(state.panelStatus, type, 1);
	},
	[types.PANEL_HIDE](state, { type }) {
		Vue.set(state.panelStatus, type, 0);
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
