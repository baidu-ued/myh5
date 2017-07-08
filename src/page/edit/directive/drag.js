import Vue from 'vue'
import store from '../store/index.js'
Vue.directive('my-drag', {
	bind: function(el) {
		let x, y;
		$(el).on('mousedown', function(ev) {
			if($(ev.target).hasClass('ui-resizable-handle')){
                return;
            }
			let isMove = false;

			// console.log(ev.clientX)

			// console.log(store.state.m_phone.multSelectId)
			// store.state.m_phone.multSelectId.forEach((item, index)=>{
			// 	let oldLeft = x = parseInt(store.getters.currentPhone.data[item].style.left);
			// 	let oldTop = y = parseInt(store.getters.currentPhone.data[item].style.top);
			//
			// })
			//



			let oldLeft = x = parseInt($(this).css('left'));
			let oldTop = y = parseInt($(this).css('top'));
			let downLeft = ev.clientX;
			let downTop = ev.clientY;
			$(document).on('mousemove', function(ev) {
				isMove = true;
				x = ev.clientX - downLeft + oldLeft;
				y = ev.clientY - downTop + oldTop;
				$(el).css({
					'left': x + 'px',
					'top': y + 'px'
				})
				// store.state.m_phone.multSelectId.forEach((item, index)=>{
				// 	x = ev.clientX - downLeft + parseInt(store.getters.currentPhone.data[item].style.left);
				// 	y = ev.clientY - downTop + parseInt(store.getters.currentPhone.data[item].style.top);
				//
				//
				// 	$(el).css({
				// 		'left': x + 'px',
				// 		'top': y + 'px'
				// 	})
				// 	// store.dispatch('updateStyle', {
				// 	// 	item : store.getters.currentPhone.data[item],
				// 	// 	payload : {
				// 	// 			'left': x + 'px',
				// 	// 			'top': y + 'px'
				// 	// 	}
				// 	// })
				// });





				return false;
			});
			$(document).on('mouseup', function() {
				$(document).off('mousemove');
				$(document).off('mouseup');
				if(isMove){
					store.dispatch('updateStyle', {
						left: x + 'px',
						top: y + 'px'
					})
				}
			})
		})
	}
})
