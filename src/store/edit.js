import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jQuery'
import * as types from './mutation-types.js'
import * as CONST from '../const/edit.js'
import tpl from '../tpl/tpl.js'
import * as api from '../api/edit.js'
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		currentPage: 0,
		phone: {
			main: {
				itemNumId: 0
			},
			data: [$.extend(true, {}, CONST.BASE_BLANK)]
		},
		currentItemId: -1,
		panelStatus: {}
	},
	getters: {
		panelStatus(state) {
			return state.panelStatus
		},
		/* 总页码:Number */
		phoneData(state) {
			return state.phone;
		},
		/* 总页码:Number */
		pageLength(state) {
			return state.phone.data.length;
		},
		/* 当前页码:Number */
		currentPage(state) {
			return state.currentPage
		},
		/* 当前页:Object */
		currentPhone(state) {
			return state.phone.data[state.currentPage];
		},
		/* 当前元素:Object */
		currentItem(state, getters) {
			// console.log(getters.currentPhone.data[state.currentItem])
			return getters.currentPhone.data[state.currentItemId] || {};
		},
		/* 当前元素id:Number */
		currentItemId(state) {
			return state.currentItemId;
		}
	},
	actions: {
		changeClass({ commit, state }, data) {
			commit('changeClass', {
				data: data
			})
		},
		loadData({ commit, state }, data) {
			$.ajax({
				url: '/api/edit/get',
				type: 'get',
				data: data,
				success: (rs) => {
					commit(types.LOAD_DATA, {
						data: rs.data.data
					})
				}
			});
		},
		savePhoneData: function({ commit, state }, data) {
			$.ajax({
				url: '/api/edit/save',
				type: 'get',
				data: data,
				success: (rs) => {
					console.log(rs);
				}
			});
		},
		/* 改变页码 */
		changePage({ commit, state }, page) {
			commit(types.CHANGE_PAGE, {
				page: page
			})
		},
		/* 增加一页 */
		addPage({ commit, state }) {
			commit(types.ADD_PAGE)
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
		/* 增加一页 */
		changeMain({ commit, state }, payload) {
			commit(types.CHANGE_CURRENT_MAIN, payload);
		},
		/* 增加元素 */
		addItem({ commit, state }, payload) {
			let item = tpl[payload.type](payload);
			let id = 'myh5_item_' + state.phone.main.itemNumId++;
			item.attr ? item.attr.id = id : item.attr = { id: id };
			commit(types.ADD_ITEM, item);
			commit(types.PANEL_HIDE, {
				type: payload.type
			});
		},
		/* 改变元素的style */
		changeStyle({ commit, state }, payload) {
			commit(types.CHANGE_ITEM_STYLE, payload)
		},
		/* 根据id选择元素 */
		selectItem({ commit, state }, index) {
			commit(types.SELECT_ITEM, {
				index: typeof index == 'undefined' || typeof index == 'object' ? -1 : index
			})
		},
		delItem({ commit, state }, index) {
			commit(types.DEL_ITEM, {
				index: index
			})
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
		/**
		 * 显示元素
		 * @param collection
		 */
		showItem({ commit, state, getters }) {
			commit(types.SHOW_ITEM, {
				currentItem: getters.currentItem
			})
		},
		/**
		 * 改变animation
		 * @param collection
		 */
		changeAni({ commit, state }, type) {
			commit(types.CHANGE_ANI, type)
		},
		reloadAni({ commit, state, dispatch, getters }) {
			commit(types.HIDE_ITEM, {
				currentItem: getters.currentItem
			})
			setTimeout(function() {
				dispatch('showItem');
			}, 0)
		}
	},
	mutations: {
		[types.SHOW_ITEM](state, payload) {
			Vue.set(payload.currentItem, 'if', true)
		},
		[types.HIDE_ITEM](state, payload) {
			Vue.set(payload.currentItem, 'if', false);
		},
		[types.CHANGE_ANI](state, payload) {
			// console.log(payload)
			// alert(1)
			// Vue.set(state.phone.data[state.currentPage].data[state.currentItemId].ani, 'animation-duration', payload['animation-duration'])
			// Vue.set(state.phone.data[state.currentPage].data[state.currentItemId], 'display', 1)
			Vue.set(state.phone.data[state.currentPage].data[state.currentItemId].style, 'animation', 'flash ' + payload['animation-duration'])
		},
		changeClass(state, payload) {
			state.phone.data[state.currentPage].data[state.currentItemId].class.push('flash')
		},
		[types.PANEL_SHOW](state, payload) {
			Vue.set(state.panelStatus, payload.type, 1);
		},
		[types.PANEL_HIDE](state, payload) {
			Vue.set(state.panelStatus, payload.type, 0);
		},
		[types.CHANGE_CURRENT_MAIN](state, payload) {
			state.phone.data[state.currentPage].main[payload[0]] = payload[1];
		},
		[types.CHANGE_PAGE](state, payload) {
			state.currentPage = payload.page;
		},
		[types.ADD_PAGE](state) {
			state.phone.data.push($.extend(true, {}, CONST.BASE_BLANK))
		},
		[types.DEL_PAGE](state, payload) {
			state.phone.data.splice(payload.page, 1);
		},
		[types.EMPTY_PAGE](state, payload) {
			Vue.set(state.phone.data, payload.page, $.extend(true, {}, CONST.BASE_BLANK))
		},
		[types.ADD_ITEM](state, payload) {
			let data = state.phone.data[state.currentPage].data;
			data = data ? data : [];
			data.push(payload);
			Vue.set(state.phone.data[state.currentPage], 'data', data);
			state.currentItemId = data.length - 1;
		},
		[types.CHANGE_ITEM_STYLE](state, payload) {
			for (let attr in payload) {
				Vue.set(state.phone.data[state.currentPage].data[state.currentItemId].style, attr, payload[attr])
			}
		},
		[types.SELECT_ITEM](state, payload) {
			state.currentItemId = payload.index;
		},
		[types.LOAD_DATA](state, payload) {
			state.phone = payload.data;
		},
		[types.DEL_ITEM](state, payload) {
			state.currentItemId = -1;
			state.phone.data[state.currentPage].data.splice(payload.index, 1);
		}
	}
})
