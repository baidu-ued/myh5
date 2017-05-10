import jQuery from 'jQuery'

/*
	j_mydata_1
	最后一个元素的id + 1;
*/
import store from '../store/edit.js'

function getNewId(){
	return 'myh5_item_' + store.getters.phoneData.main.itemNumId++;
}
export default {
	txt : function(){
		return {
			type : 'txt',
			content : '空白文本',
			attr : {
				id : getNewId()
			},
			style : {
				left : '50px',
				top : '50px',
				color : '#666666'
			}
		}
	},
	qrcode : function(){
		return {
			type : 'qrcode',
			content : '<canvas></canvas>',
			style : {
				left : '50px',
				top : '50px'
			}
		}
	}
}
