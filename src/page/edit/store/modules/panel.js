import Vue from 'vue'
import * as types from '../mutation-types'
// initial state
// shape: [{ id, quantity }]
const state = {
	panelStatus: {}
}
// getters
const getters = {
	panelStatus(state) {
		return state.panelStatus
	}
}
// actions
const actions = {
	/* 增加一页 */
	changeMain({ commit, getters }, payload) {
		commit(types.CHANGE_CURRENT_MAIN, {
			currentPhone: getters.currentPhone,
			payload: payload
		});
	},
	panelShow({ commit, state }, type) {
		commit(types.PANEL_SHOW, {
			type: type
		})
	},
	panelHide({ commit, state }, type) {
		commit(types.PANEL_HIDE, {
			type: type
		})
	},
}
// mutations
const mutations = {
	[types.CHANGE_CURRENT_MAIN](state, { currentPhone, payload }) {
		currentPhone.main[payload[0]] = payload[1];
	},
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
