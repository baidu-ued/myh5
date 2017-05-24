import jQuery from 'jQuery'
import * as types from '../const/item-types.js'
/*
	j_mydata_1
	最后一个元素的id + 1;
*/
import store from '../store/edit.js'

function getNewId(){
	return 'myh5_item_' + store.getters.phoneData.main.itemNumId++;
}
export default {
	[types.TXT] : function(){
		return {
			type : types.TXT,
			content : '空白文本',
			style : {
				left : '50px',
				top : '50px',
				color : '#666666'
			}
		}
	}
}
