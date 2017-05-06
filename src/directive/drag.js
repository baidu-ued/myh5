import $ from 'jQuery'
import Vue from 'vue'
import store from '../store/edit.js'
// 注册一个全局自定义指令 v-focus
// 注册（传入一个简单的指令函数）
Vue.directive('my-drag', {
	bind: function(el) {
		var x, y;
		$(el).on('mousedown', function(ev) {
			if($(ev.target).hasClass('ui-resizable-handle')){
                return;
            }
			var oldLeft = x = $(this).position().left;
			var oldTop = y = $(this).position().top;
			var downLeft = ev.clientX;
			var downTop = ev.clientY;
			$(document).on('mousemove', function(ev) {
				x = ev.clientX - downLeft + oldLeft;
				y = ev.clientY - downTop + oldTop;
				$(el).css({
					'left': x + 'px',
					'top': y + 'px'
				})
			})
			$(document).on('mouseup', function() {
				$(document).off('mousemove');
				$(document).off('mouseup');
				store.dispatch('changeStyle', {
					left: x + 'px',
					top: y + 'px'
				})
			})
		})
	}
})
