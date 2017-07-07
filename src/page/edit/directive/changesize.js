import Vue from 'vue'
import store from '../store/index.js'
// 注册一个全局自定义指令 v-focus
// 注册（传入一个简单的指令函数）
Vue.directive('my-changesize', {

	bind: function(el, binding) {
		var x,y,width,height;
		$(el).on('mousedown', (ev) => {
			var type = binding.value.type;
			var obj = $(el).parents('.phone-item');
			var initLeft = x = $(obj).position().left;
			var initTop = y = $(obj).position().top;
			var initWidth = width = parseInt($(obj).css('width'));
			var initHeight = height = parseInt($(obj).css('height'));
			var initX = ev.clientX;
			var initY = ev.clientY;
			$(document).on('mousemove', (ev) => {
				x = initLeft + ev.clientX - initX;
				y = ev.clientY - initY + initTop;
				width = initWidth + ev.clientX - initX;
				height = initHeight + ev.clientY - initY;
				//右上，右下
				if (type == 'ne' || type == 'se') {
					x = initLeft;
				}
				//左下，右下
				if (type == 'sw' || type == 'se') {
					y = initTop;
				}
				//左上，右上
				if (type == 'nw' || type == 'ne') {
					y = initTop + (ev.clientY - initY);
					height = initHeight + (-ev.clientY + initY);
					if (y >= initTop + initHeight) {
						y = initTop + initHeight;
					}
				}
				//左上，左下
				if (type == 'nw' || type == 'sw') {
					width = initWidth + (-ev.clientX + initX);
					if (x >= initLeft + initWidth) {
						x = initLeft + initWidth;
					}
				}
				$(obj).css({
					'left': x + 'px',
					'top': y + 'px',
					'width': width + 'px',
					'height': height + 'px'
				});

			});
			$(document).on('mouseup', (ev) => {
				var obj = $(el).parents('.phone-item');
				$(document).off('mousemove');
				$(document).off('mouseup');
				store.dispatch('updateStyle', {
					'left': x + 'px',
					'top': y + 'px',
					'width': width + 'px',
					'height': height + 'px'
				})
			});
		});
	}
})
