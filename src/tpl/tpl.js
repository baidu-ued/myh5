import jQuery from 'jQuery'
import * as types from '../const/item-types.js'
import { PHONE_WIDTH } from '../const/edit.js'
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
			class : [],
			style : {
				left : '50px',
				top : '50px',
				color : '#666666'
			}
		}
	},
	[types.PIC] : function(payload){
		let width = (payload.width / (PHONE_WIDTH / 100 * 4)).toFixed(0);
		width = width > 100 ? 100 : width;
		return {
			type : types.PIC,
			content : `<img style="width:100%;height:100%;" src="${payload.src}"/>`,
			class : [],
			style : {
				width : width + '%',
				left : '0',
				top : '0',
				color : '#666666'
			}
		}
	}
}
