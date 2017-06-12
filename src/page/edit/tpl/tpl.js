import jQuery from 'jQuery'
import * as types from './types.js'
import { PHONE_WIDTH } from '../../../public/constant/index.js'
/*
	j_mydata_1
	最后一个元素的id + 1;
*/
import store from '../store/index.js'

function getNewId() {
	return 'myh5_item_' + store.getters.phoneData.main.itemNumId++;
}
export default {
	/*
		文本
	*/
	[types.TXT]: function() {
		return {
			type: types.TXT,
			content: '空白文本',
			class: types.TXT.toLowerCase(),
			style: {
				left: '50px',
				top: '50px',
				color: '#666666'
			}
		}
	},
	/*
		文本
	*/
	[types.PIC]: function(payload) {
		let width = (payload.width / (PHONE_WIDTH / 100 * 4)).toFixed(0);
		width = width > 100 ? 100 : width;
		return {
			type: types.PIC,
			content: `<img style="width:100%;height:100%;" src="${payload.src}"/>`,
			class: types.PIC.toLowerCase(),
			style: {
				width: width + '%',
				left: '0',
				top: '0',
				color: '#666666'
			}
		}
	},
	/*
		热区

		不显示，不能添加动画 为了点击事件
	*/
	[types.HOT_SPACE]: function() {
		return {
			type: types.HOT_SPACE,
			content: '<div></div>',
			class: types.HOT_SPACE.toLowerCase(),
			style: {
				left: '50px',
				top: '50px',
				width: '100px',
				height: '100px',
				background: 'rgba(0,0,0,0.3)'
			}
		}
	},
	/*
		二维码
	*/
	[types.QRCODE]: async({ url }) => {
		let rs = await new Promise((resolve, reject) => {
			$.ajax({
				url: '/aj/qrcode/save',
				type: 'get',
				data: {
					url: url
				},
				success: (rs) => {
					resolve(rs)
				}
			});
		})
		return {
			type: types.QRCODE,
			content: '<div><img style="width:100%;height:100%;" src="' + rs.url + '"/></div>',
			class: types.QRCODE.toLowerCase(),
			attr : {
				'href' : url
			},
			style: {
				left: '50px',
				top: '50px',
				width: '100px',
				height: '100px',
			}
		}
	}
}
