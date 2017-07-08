import Vue from 'vue'
import tpl from '../../tpl/tpl.js'
import panel from './panel'
const types = {
	ADD_ITEM: 'ADD_ITEM',
	DEL_ITEM: 'DEL_ITEM',
	SELECT_ITEM: 'SELECT_ITEM',
	CANCEL_SELECT: 'CANCEL_SELECT',
	UPDATE_ITEM: 'UPDATE_ITEM'
};
/**
 * mutations 增， 删， 改
 * 选中， 取消选中
 * 增加， 删除
 * 修改
 */
// initial state
const state = {
	currentItemId: -1,
	multSelectId: []
}
// getters
const getters = {
	multSelectId(state) {
		return state.multSelectId;
	},
	/**
	 * 是否单选
	 * @return {Boolean}       [description]
	 */
	isSingleSelect(state){
		return state.currentItemId != -1;
	},
	/**
	 * 是否多选
	 * @return {Boolean}
	 */
	isMultSelect(state){
		return state.multSelectId.length != 0;
	},
	/**
	 * @return {Object} 当前页数据
	 */
	currentPhone(state, getters, rootState) {
		return rootState.phone.data[rootState.page.currentPage];
	},
	/**
	 * @return {Number} 当前元素id
	 */
	currentItemId(state) {
		return state.currentItemId;
	},
	/**
	 * @return {Object} 当前元素
	 */
	currentItem(state, getters) {
		return getters.currentPhone.data[state.currentItemId] || {};
	},
	/**
	 * @return {Object} phone数据
	 */
	phoneData(state, getters, rootState) {
		return rootState.phone
	},
}
// actions
const actions = {
	/* 根据id选择元素, 并且如果当前处于多选状态， 就 */
	selectItem({ commit, state }, index) {
		if (state.multSelectId.length != 0) {
			return;
		} else {
			if (typeof index == 'object' && index.length == 1) {
				index = index[0];
			}
			commit(types.SELECT_ITEM, {
				index: index
			})
		}
	},
	/**
	 * 取消选中元素
	 */
	cancelSelect({ commit, state }) {
		commit(types.CANCEL_SELECT)
	},
	/**
	 * 改变元素的style
	 * @param  {[type]} commit  [description]
	 */
	updateStyle({ commit, state, getters }, payload) {
		commit(types.UPDATE_ITEM, {
			item: payload.item || getters.currentItem,
			key: 'style',
			val: payload
		})
	},
	/* 增加元素 */
	addItem({ commit, state, rootState, getters, dispatch }, payload) {
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
			dispatch('panelHide', payload.type);
		})()
	},
	/**
	 * 删除元素
	 * @param  {Number} index  元素索引
	 */
	delItem({ commit, state, getters }, index) {
		commit(types.DEL_ITEM, {
			currentPhone: getters.currentPhone,
			index: index
		})
	},
	/**
	 * 重新播放动画效果
	 * 当参数不存在时， 播放当页动画，当id存在时， 播放指定元素动画
	 * @param  {Number} {Array}
	 */
	reloadAni({ commit, state, dispatch, getters }, id) {
		for(let i = 0; i < getters.currentPhone.data.length; i++){
			if(typeof id == 'number' && id != i){
				continue;
			}
			let item =getters.currentPhone.data[i];
			const name = item.style['animation-name'];
			dispatch('updateStyle', {
				item : item,
				'animation-name': 'none'
			});
			setTimeout(function() {
				dispatch('updateStyle', {
					item : item,
					'animation-name': name
				});
			}, 0)
		}
	},
	/**
	 * 更新元素的event属性
	 * @param  {[type]} val  [description]
	 */
	updateItemEvent({ commit, state, getters }, val) {
		commit(types.UPDATE_ITEM, {
			item: getters.currentItem,
			key: 'event',
			val: val
		})
	},
	/**
	 * 修改元素content
	 * @param  {String} content  新元素content
	 */
	updateItemContent({ commit, state, getters }, content) {
		commit(types.UPDATE_ITEM, {
			item: getters.currentItem,
			key: 'content',
			val: content
		})
	},
	/**
	 * 修改元素attr
	 * @param  {Object} data  data
	 */
	updateItemAttr({ commit, state, getters }, data) {
		commit(types.UPDATE_ITEM, {
			item: getters.currentItem,
			key: 'attr',
			val: data
		})
	},
	/**
	 * 修改元素层级
	 * @param  ++ 置顶， +1 上移一位， -1 下移一位， -- 置底
	 */
	updateItemZIndex({ commit, getters }, type) {
		const data = getters.currentPhone.data;
		const nowIndex = getters.currentItem.style['z-index'];
		let newIndex;
		if (data.length == 1) {
			return;
		}
		for (let i = 0; i < data.length; i++) {
			let item = getters.currentPhone.data[i];
			if (type == '++' && item.style['z-index'] > nowIndex) {
				commit(types.UPDATE_ITEM, {
					item: item,
					key: 'style',
					val: {
						'z-index': item.style['z-index'] - 1
					}
				});
				newIndex = data.length;
			} else if (type == '+1' && item.style['z-index'] == nowIndex + 1) {
				commit(types.UPDATE_ITEM, {
					item: getters.currentPhone.data[i],
					key: 'style',
					val: {
						'z-index': nowIndex - 1
					}
				});
				newIndex = nowIndex + 1;
				break;
			} else if (type == '-1' && item.style['z-index'] == nowIndex - 1) {
				commit(types.UPDATE_ITEM, {
					item: getters.currentPhone.data[i],
					key: 'style',
					val: {
						'z-index': nowIndex + 1
					}
				});
				newIndex = nowIndex - 1;
				break;
			} else if (type == '--' && item.style['z-index'] < nowIndex) {
				commit(types.UPDATE_ITEM, {
					item: item,
					key: 'style',
					val: {
						'z-index': item.style['z-index'] + 1
					}
				});
				newIndex = 1;
			}
		};
		commit(types.UPDATE_ITEM, {
			item: getters.currentItem,
			key: 'style',
			val: {
				'z-index': newIndex
			}
		});
	}
}
// mutations
const mutations = {
	/**
	 * 新增元素
	 * @type {Object} currentPhone  	当前页
	 * @type {Object} item           新元素
	 */
	[types.ADD_ITEM](state, { currentPhone, item }) {
		currentPhone.data = currentPhone.data || [];
		currentPhone.data.push(item);
		Vue.set(currentPhone, 'data', currentPhone.data);
		state.currentItemId = currentPhone.data.length - 1;
	},
	/**
	 * 删除元素, 只能删除单个元素
	 * @type {Object} currentPhone 当前页
	 * @type {Number} index 		  元素索引
	 */
	[types.DEL_ITEM](state, { currentPhone, index }) {
		state.currentItemId = -1;
		currentPhone.data.splice(index, 1);
	},
	/**
	 * 选择元素, 可以选择多个
	 * @type {Number} {Object} 元素索引， 或者索引数组
	 */
	[types.SELECT_ITEM](state, { index }) {
		if (typeof index == 'object') {
			state.multSelectId = index;
			state.currentItemId = -1;
		} else if (index != -1) {
			state.currentItemId = index;
			state.multSelectId = [];
		} else {
			state.currentItemId = -1;
			state.multSelectId = [];
		}
	},
	/**
	 * 取消选择元素
	 */
	[types.CANCEL_SELECT](state) {
		state.currentItemId = -1;
		state.multSelectId = [];
	},
	/**
	 * 更新元素属性, 只能更新单个元素
	 * @param item 指定元素
	 * @param key  修改哪个属性
	 * @param val  修改的值
	 */
	[types.UPDATE_ITEM](state, { item, key, val }) {
		if (typeof val == 'string') {
			Vue.set(item, key, val);
		} else {
			for (const attr in val) {
				Vue.set(item[key], attr, val[attr]);
			}
		}
	}
}
export default {
	state,
	getters,
	actions,
	mutations
}
