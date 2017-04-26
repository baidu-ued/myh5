import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jQuery'
import * as types from './mutation-types.js'
// import * as api from '../api/edit.js'

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		activePage : 1,
		phone : {
			main : {

			},
			data : [{
				main : {
					background : '#cccccc'
				},
				data : [{

				}]
			},{
				main : {
					background : '#e6e6e6'
				},
				data : [{

				}]
			}]
		}
	},
	getters: {
		data : function(state){
			return state.data;
		},
		phoneLength : function(state){
			return state.phone.data.length;
		},
		activePage : function(state){
			return state.activePage
		},
		activePhone : function(state){
			return state.phone.data[state.activePage]
		}
	},
	actions: {
		changePage : function({commit, state}, page){
			commit('CHANGE_PAGE', {
				page : page
			})
		},
		swapPage : function({commit, state}, page){
			//交换页
		}
	},
	mutations: {
		[types.CHANGE_PAGE](state, payload) {
			state.activePage = payload.page;
		},
	}
})
