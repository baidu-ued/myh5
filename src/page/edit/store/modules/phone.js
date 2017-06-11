import Vue from 'vue'
import * as types from '../mutation-types'
import tpl from '../../tpl/tpl.js'
import panel from './panel'
// initial state
const state = {
	currentItemId: -1
}
// getters
const getters = {
	/* 当前页:Object */
	currentPhone(state, getters, rootState) {
		return rootState.phone.data[rootState.page.currentPage];
	},
	/* 当前元素id:Number */
	currentItemId(state) {
		return state.currentItemId;
	},
	/* 当前元素:Object */
	currentItem(state, getters) {
		return getters.currentPhone.data[state.currentItemId] || {};
	},
	phoneData(state, getters, rootState) {
		return rootState.phone
	},
}
// actions
const actions = {
	/* 根据id选择元素 */
	selectItem({ commit, state }, index) {
		commit(types.SELECT_ITEM, {
			index: typeof index == 'undefined' || typeof index == 'object' ? -1 : index
		})
	},
	/* 改变元素的style */
	changeStyle({ commit, state, getters }, payload) {
		commit(types.CHANGE_ITEM_STYLE, {
			currentItem: getters.currentItem,
			payload: payload
		})
	},
	/* 增加元素 */
	addItem({ commit, state, rootState, getters }, payload) {
		let item = tpl[payload.type](payload);
		let id = 'myh5_item_' + rootState.phone.main.itemNumId++;
		item.attr ? item.attr.id = id : item.attr = { id: id };
		commit(types.ADD_ITEM, {
			currentPhone: getters.currentPhone,
			item: item
		});
		commit(types.PANEL_HIDE, {
			type: payload.type
		})
	},
	delItem({ commit, state, getters }, index) {
		commit(types.DEL_ITEM, {
			currentPhone: getters.currentPhone,
			index: index
		})
	},
	changeAni({ commit, state, getters, dispatch }, ani) {
		dispatch('changeStyle', ani);
	},
	reloadAllAni({ commit, state, dispatch, getters }) {},
	reloadAni({ commit, state, dispatch, getters }) {
		let name = getters.currentItem.style['animation-name'];
		dispatch('changeStyle', {
			'animation-name': 'none'
		});
		setTimeout(function() {
			dispatch('changeStyle', {
				'animation-name': name
			});
		}, 0)
	},
	changeEvent({ commit, state, getters }, data) {
		commit(types.CHANGE_ITEM_EVENT, {
			currentItem: getters.currentItem,
			data: data
		})
	}
}
// mutations
const mutations = {
	[types.SELECT_ITEM](state, { index }) {
		state.currentItemId = index;
	},
	[types.CHANGE_ITEM_STYLE](state, { currentItem, payload }) {
		for (let attr in payload) {
			Vue.set(currentItem.style, attr, payload[attr])
		}
	},
	[types.DEL_ITEM](state, { currentPhone, index }) {
		state.currentItemId = -1;
		currentPhone.data.splice(index, 1);
	},
	[types.ADD_ITEM](state, { currentPhone, item }) {
		currentPhone.data = currentPhone.data || [];
		currentPhone.data.push(item);
		Vue.set(currentPhone, 'data', currentPhone.data);
		state.currentItemId = currentPhone.data.length - 1;
	},
	[types.CHANGE_ITEM_EVENT](state, { currentItem, data }) {
		Vue.set(currentItem, 'event', data);
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
