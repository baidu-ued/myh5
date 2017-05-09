import jQuery from 'jQuery'

/*
	j_mydata_1
	最后一个元素的id + 1;
*/

function getId(){

}

export default {
	txt : function(){
		return {
			type : 'txt',
			content : '空白文本',
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
