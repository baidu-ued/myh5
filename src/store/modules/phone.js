/*
	功能：
	添加，删除，选中
*/
import * as types from '../mutation-types.js'
import tpl from '../../tpl/tpl.js'
import Vue from 'Vue'
// initial state
const state = {
	activeIndex: [],
	activePhone: {},
	activeItem: -1
	// activeItems : []
}
// getters
const getters = {
	activePhone: (state, getters, rootState) => {
		return rootState.data.data[rootState.page.activePage];
	},
	activeIndex: (state, getters, rootState) => {
		return state.activeIndex
	},
	activeItem: (state, getters, rootState) => {
		if(getters.activeIndex.length == 1){
			return getters.activePhone.data[getters.activeIndex[0]];
		}else{
			return -1;
		}

	}
}
// state.activePhone = getters.activePhone;
// actions
const actions = {
	addItem({ commit, getters }, type) {
		commit(types.ADD_ITEM, {
			activePhone: getters.activePhone,
			data: tpl[type](type)
		});
	},
	/*
		index : []   or    [1,4]     or    1   or  '4'
	*/
	selectItem({ commit, getters }, index) {
		if (typeof index == 'number' || typeof index == 'string') {
			if (parseInt(index) < 0) {
				index = [];
			} else {
				index = [index];
			}
		}
		commit(types.SELECT_ITEM, {
			index: index
		});
	},
	/*
		只能对单一item进行修改
		{
			content : '',
			style : {
				width : '200px'
			},
			type : 'pic'
		}
	}
	*/
	updateItem({ commit, getters, rootState }, obj) {
		commit(types.UPDATE_ITEM, {
			getters: getters,
			color: obj
		});
	}
}
// mutations
const mutations = {
	[types.ADD_ITEM](state, payload) {
		payload.activePhone.data.push(payload.data);
	},
	[types.SELECT_ITEM](state, payload) {
		state.activeIndex = payload.index;
	},
	[types.UPDATE_ITEM](state, payload) {
		Vue.set(payload.getters.activePhone.main, 'background', payload.color)
	},
}
export default {
	state,
	getters,
	actions,
	mutations
}
