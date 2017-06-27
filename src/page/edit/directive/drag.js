import Vue from 'vue'
import store from '../store/index.js'
// 注册一个全局自定义指令 v-focus
// 注册（传入一个简单的指令函数）
Vue.directive('my-drag', {
	bind: function(el) {
		var x, y;
		$(el).on('mousedown', function(ev) {
			if($(ev.target).hasClass('ui-resizable-handle')){
                return;
            }
			let isMove = false;
			console.log(store.state.m_phone.multSelectId)
			// store.state.m_phone.multSelectId.forEach((item, index)=>{
			// 	var oldLeft = x = parseInt(store.getters.currentPhone.data[item].style.left);
			// 	var oldTop = y = parseInt(store.getters.currentPhone.data[item].style.top);
			//
			// })
			//



			var oldLeft = x = parseInt($(this).css('left'));
			var oldTop = y = parseInt($(this).css('top'));
			var downLeft = ev.clientX;
			var downTop = ev.clientY;
			$(document).on('mousemove', function(ev) {
				isMove = true;

				store.state.m_phone.multSelectId.forEach((item, index)=>{
					x = ev.clientX - downLeft + parseInt(store.getters.currentPhone.data[item].style.left);
					y = ev.clientY - downTop + parseInt(store.getters.currentPhone.data[item].style.top);


					// $(el).css({
					// 	'left': x + 'px',
					// 	'top': y + 'px'
					// })
					// store.dispatch('changeStyle', {
					// 	item : store.getters.currentPhone.data[item],
					// 	payload : {
					// 			'left': x + 'px',
					// 			'top': y + 'px'
					// 	}
					// })
				});





				return false;
			});
			$(document).on('mouseup', function() {
				$(document).off('mousemove');
				$(document).off('mouseup');
				// if(isMove){
				// 	store.dispatch('changeStyle', {
				// 		left: x + 'px',
				// 		top: y + 'px'
				// 	})
				// }
			})
		})
	}
})
