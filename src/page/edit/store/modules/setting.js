import Vue from 'vue'
import * as types from '../mutation-types'
// initial state
const state = {
	settingLayer: false
}
// getters
const getters = {
	settingLayer(state) {
		return state.settingLayer
	},
	/* 总页码:Number */
	phoneSet(state, getters, rootState) {
		return rootState.phone.set;
	},
}
// actions
const actions = {
	changeSetLayer({ commit }, a) {
		commit('changeSetLayer', a)
	},
	changeSet({ commit, state, rootState }, payload) {
		commit('changeSet', {
			phone: rootState.phone,
			payload: payload
		})
	},
	changeMain({ commit, state, rootState }, { attr , data }) {
		commit('xxx', {
			phone: rootState.phone,
			attr : 'music',
			data: data
		})
	},
}
// mutations
const mutations = {
	changeSetLayer(state, payload) {
		state.settingLayer = payload;
	},
	changeSet(state, { phone, payload }) {
		for (let attr in payload) {
			Vue.set(phone.set, attr, payload[attr])
		}
	},
	xxx(state, { phone, data, attr }) {

		Vue.set(phone.main, attr, data)
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
