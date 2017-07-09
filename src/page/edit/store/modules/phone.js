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
	/**
	 * 以数组的形式返回当前选中元素索引
	 * @return {Array}
	 */
	currentItemForList(state, getters) {
		if (getters.isSingleSelect) {
			return [getters.currentItemId]
		} else if (getters.isMultSelect) {
			return getters.multSelectId
		} else {
			return []
		}
	},
	/**
	 * 多选元素的索引列表
	 * @return {Array}
	 */
	multSelectId(state) {
		return state.multSelectId;
	},
	/**
	 * 是否单选
	 * @return {Boolean}
	 */
	isSingleSelect(state) {
		return state.currentItemId != -1;
	},
	/**
	 * 是否多选
	 * @return {Boolean}
	 */
	isMultSelect(state) {
		return state.multSelectId.length != 0;
	},
	/**
	 * 当前页数据
	 * @return {Object}
	 */
	currentPhone(state, getters, rootState) {
		return rootState.phone.data[rootState.page.currentPage];
	},
	/**
	 * 当前选中元素的索引
	 * @return {Number}
	 */
	currentItemId(state) {
		return state.currentItemId;
	},
	/**
	 * 当前元素
	 * @return {Object}
	 */
	currentItem(state, getters) {
		return getters.currentPhone.data[state.currentItemId] || {};
	},
	/**
	 * phone数据
	 * @return {Object}
	 */
	phoneData(state, getters, rootState) {
		return rootState.phone
	},
}
// actions
const actions = {
	/**
	 * 选择元素
	 * @param  {Number} {Array} 索引， 或索引列表
	 * 当需要选择单个元素时， 如果此时处于多选状态， 并且该元素在多选元素内， return
	 *
	 */
	selectItem({ commit, state, getters }, index) {
		if (typeof index == 'number' && getters.isMultSelect && state.multSelectId.includes(index)) {
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
	 * 修改当前元素
	 * this.updateStyle({
	 *     left : '50px',
	 *     top : '50px'
	 * })
	 * 修改指定元素
	 * this.updateStyle({
	 *     index : 1,
	 *     payload : {
	 *         left : '50px',
	 *         top : '50px'
	 *     }
	 * })
	 */
	updateStyle({ commit, state, getters }, data) {
		let item;
		let payload;
		if (typeof data.index != 'undefined' && data.payload) {
			item = getters.currentPhone.data[data.index];
			payload = data.payload;
		} else {
			item = getters.currentItem;
			payload = data;
		}
		if ($.isEmptyObject(item) || $.isEmptyObject(payload)) {
			console.error('更新style失败');
			return;
		}
		commit(types.UPDATE_ITEM, {
			item: item,
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
			dispatch('cancelSelect')
			commit(types.ADD_ITEM, {
				currentPhone: getters.currentPhone,
				item: item
			});
			dispatch('panelHide', payload.type);
		})()
	},
	/**
	 * 删除元素
	 * @param  {Number} {Array} 元素索引或索引列表
	 */
	delItem({ commit, state, getters, dispatch }, list) {
		console.log(list)
		if (typeof list == 'number') {
			list = [list]
		}
		//从大到小排序， 从大到小删除
		list.sort((a, b) => {
			return b - a;
		})
		list.forEach((item) => {
			commit(types.DEL_ITEM, {
				currentPhone: getters.currentPhone,
				index: item
			})
		})
		dispatch('cancelSelect')
		dispatch('resetItemZIndex')
	},
	/**
	 * 重新播放动画效果
	 * 当参数不存在时， 播放当页动画，当id存在时， 播放指定元素动画
	 * @param  {Number} {Array}
	 */
	reloadAni({ commit, state, dispatch, getters }, id) {
		for (let i = 0; i < getters.currentPhone.data.length; i++) {
			if (typeof id == 'number' && id != i) {
				continue;
			}
			let item = getters.currentPhone.data[i];
			const name = item.style['animation-name'];
			dispatch('updateStyle', {
				index: i,
				'animation-name': 'none'
			});
			setTimeout(function() {
				dispatch('updateStyle', {
					index: i,
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
	 * 修正元素层级
	 * 当删除元素后， 元素层级会有空位， 此时需要修正层级
	 */
	resetItemZIndex({ commit, getters }) {
		const data = getters.currentPhone.data;
		const x = data.map((item, index) => {
			return {
				zIndex: item.style['z-index'],
				index: index
			}
		})
		x.sort(function(x, y) {
			return x.zIndex - y.zIndex;
		})
		x.forEach((item, index) => {
			commit(types.UPDATE_ITEM, {
				item: getters.currentPhone.data[item.index],
				key: 'style',
				val: {
					'z-index': index + 1
				}
			});
		})
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
