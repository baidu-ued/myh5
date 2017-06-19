import Vue from 'vue'
import * as types from '../mutation-types'
import tpl from '../../tpl/tpl.js'
import panel from './panel'
// initial state
const state = {
	currentItemId: -1,
	multSelect : []
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
			item: payload.item || getters.currentItem,
			payload: payload
		})
	},
	/* 增加元素 */
	addItem({ commit, state, rootState, getters }, payload) {
		(async() => {
			const item = await tpl[payload.type](payload);
			const id = 'myh5_item_' + rootState.phone.main.itemNumId++;
			const zIndex = getters.currentPhone.data.length + 1;
			item.style['z-index'] = zIndex;
			item.attr ? item.attr.id = id : item.attr = { id: id };
			commit(types.ADD_ITEM, {
				currentPhone: getters.currentPhone,
				item: item
			});
			commit(types.PANEL_HIDE, {
				type: payload.type
			})
		})()
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
		const name = getters.currentItem.style['animation-name'];
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
	},
	changeContent({ commit, state, getters }, data) {
		commit(types.CHANGE_ITEM_CONTENT, {
			currentItem: getters.currentItem,
			data: data
		})
	},
	changeAttr({ commit, state, getters }, data) {
		commit(types.CHANGE_ITEM_ATTR, {
			currentItem: getters.currentItem,
			data: data
		})
	},
	/*
		置顶
	*/
	toTopLimit({ commit, state, getters, dispatch }) {
		const nowIndex = getters.currentItem.style['z-index'];
		getters.currentPhone.data.forEach((item) => {
			if (item.style['z-index'] > nowIndex) {
				commit(types.CHANGE_ITEM_STYLE, {
					item: item,
					payload: {
						'z-index': item.style['z-index'] - 1
					}
				})
			}
		})
		commit(types.CHANGE_ITEM_STYLE, {
			item: getters.currentItem,
			payload: {
				'z-index': getters.currentPhone.data.length
			}
		})
	},
	toTop({ commit, state, getters, dispatch }) {
		const nowIndex = getters.currentItem.style['z-index'];
		for (let i = 0; i < getters.currentPhone.data.length; i++) {
			if (getters.currentPhone.data[i].style['z-index'] == nowIndex + 1) {
				commit(types.CHANGE_ITEM_STYLE, {
					item: getters.currentPhone.data[i],
					payload: {
						'z-index': getters.currentPhone.data[i].style['z-index'] - 1
					}
				})
				break;
			}
		}
		commit(types.CHANGE_ITEM_STYLE, {
			item: getters.currentItem,
			payload: {
				'z-index': nowIndex + 1
			}
		})
	},
	toBottomLimit({ commit, state, getters, dispatch }) {
		const nowIndex = getters.currentItem.style['z-index'];
		getters.currentPhone.data.forEach((item) => {
			if (item.style['z-index'] < nowIndex) {
				commit(types.CHANGE_ITEM_STYLE, {
					item: item,
					payload: {
						'z-index': item.style['z-index'] + 1
					}
				})
			}
		})
		commit(types.CHANGE_ITEM_STYLE, {
			item: getters.currentItem,
			payload: {
				'z-index': 1
			}
		})
	},
	toBottom({ commit, state, getters, dispatch }) {
		const nowIndex = getters.currentItem.style['z-index'];
		for (let i = 0; i < getters.currentPhone.data.length; i++) {
			if (getters.currentPhone.data[i].style['z-index'] == nowIndex - 1) {
				commit(types.CHANGE_ITEM_STYLE, {
					item: getters.currentPhone.data[i],
					payload: {
						'z-index': getters.currentPhone.data[i].style['z-index'] + 1
					}
				})
				break;
			}
		}
		commit(types.CHANGE_ITEM_STYLE, {
			item: getters.currentItem,
			payload: {
				'z-index': nowIndex - 1
			}
		})
	},
	multSelect({commit, getters}, index){
		commit('multSelect', index)
	}
}
// mutations
const mutations = {
	multSelect(state, index){
		state.multSelect = index;
	},
	[types.CHANGE_ITEM_ATTR](state, { currentItem, data }) {
		for (const attr in data) {
			Vue.set(currentItem.attr, attr, data[attr]);
		}
	},
	[types.CHANGE_ITEM_CONTENT](state, { currentItem, data }) {
		Vue.set(currentItem, 'content', data);
	},
	[types.SELECT_ITEM](state, { index }) {
		state.currentItemId = index;
	},
	[types.CHANGE_ITEM_STYLE](state, { item, payload }) {
		for (const attr in payload) {
			Vue.set(item.style, attr, payload[attr])
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
