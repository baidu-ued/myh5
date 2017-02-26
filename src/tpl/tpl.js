export default {
	txt(type) {
		return {
			type: type,
			content: '刘少鹏',
			style: {
				position: 'absolute',
				left: '100px',
				top: '100px'
			}
		}
	},
	qrcode(type) {
		return {
			type : type,
			// content:'<div class="inner"></div>',
			id : 'n_' + 10,
			style : {
				position : 'absolute',
				left : '10px',
				top : '10px',
				background : 'red',
				width : '200px',
				height : '200px'
			}

		}
	}
}
