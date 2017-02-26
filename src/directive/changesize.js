/*
	改变resizeable
	每一个元素都有resizeable属性，当resizeable=true时，才可以执行该方法
*/
import Vue from 'vue'
import $ from 'jQuery'
import Store from '../store/index.js'
Vue.directive('changeSize', {
	bind: function(el, binding) {



		$(el).on('mousedown', (ev) => {
			var type = binding.value.type;
			var obj = $(el).parents('.lllll');
			var initLeft = $(obj).position().left;
			var initTop = $(obj).position().top;
			var initWidth = parseInt($(obj).css('width'));
			var initHeight = parseInt($(obj).css('height'));
			var initX = ev.clientX;
			var initY = ev.clientY;
			$(document).on('mousemove', (ev) => {
				var x = ev.clientX - initX + initLeft;
				var y = ev.clientY - initY + initTop;
				var width = initWidth + ev.clientX - initX;
				var height = initHeight + ev.clientY - initY;
				if (type == 'ne' || type == 'se') {
					x = initLeft;
				}
				if (type == 'sw' || type == 'se') {
					y = initTop;
				}
				if (type == 'nw' || type == 'ne') {
					y = initTop + (ev.clientY - initY);
					height = initHeight + (-ev.clientY + initY);
				}
				if (type == 'nw' || type == 'sw') {
					width = initWidth + (-ev.clientX + initX);
				}
				$(obj).css({
					'left': x + 'px',
					'top': y + 'px',
					'width': width + 'px',
					'height': height + 'px'
				});

			});
			$(document).on('mouseup', (ev) => {
				var obj = $(el).parents('.lllll');
				var width = parseInt($(obj).css('width'));
				var height = parseInt($(obj).css('height'));
				// $('#n_10').find('.inner').qrcode({
				// 	// render : 'table',
				// 	width : width,
				// 	height : height,
				// 	text : 'https://www.baidu.com/'
				// })
				$(document).off('mousemove');
				$(document).off('mouseup');
			});
		});
	}
})
