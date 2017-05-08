import jQuery from 'jQuery'
import aa from '../library/jquery.qrcode.min.js'
console.log(aa);
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
			type : 'aaa',
			content : '刘少鹏',
			style : {
				left : '50px',
				top : '50px'
			}
		}
	}
}
