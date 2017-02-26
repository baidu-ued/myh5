/*

*/
import Vue from 'vue'
import $ from 'jQuery'
import Store from '../store/index.js'
Vue.directive('select', {
	inserted(el) {
		$('body').append($('<div class="g"></div>'))
		$('.g').css({
			position: 'absolute',
			left: 0,
			top: 0,
			width: '0',
			height: '0',
			border: '1px solid #000',
			display: 'none',
			background: 'rgba(0,0,0,0.3)'
		})
	},
	bind: function(el, binding) {
		$(el).on('mousedown', (ev) => {
			var arr = Store.getters.activePhone.data;
			// console.log(arr);
			// document.title = ($('.phone-center').offset().left);
			var xxxLeft = $('.phone-center').offset().left;
			var xxxTop = $('.phone-center').offset().top;
			var initX = ev.clientX;
			var initY = ev.clientY;
			$('.g').css('display', 'block')
			$(document).on('mousemove', (ev) => {
				var width = ev.clientX - initX;
				var height = ev.clientY - initY;
				if (ev.clientX - initX < 0) {
					var left = initX - Math.abs(width);
					width = -ev.clientX + initX;
				} else {
					left = initX;
				}
				if (ev.clientY - initY < 0) {
					var top = initY - Math.abs(height);
					height = -ev.clientY + initY;
				} else {
					top = initY;
				}
				$('.g').css({
					'left': left + 'px',
					'top': top + 'px',
					'width': width + 'px',
					'height': height + 'px',
				})
				var xxxx = [];
				arr.forEach(function(item, index) {
					var left2 = xxxLeft + parseInt(item.style.left);
					var width2 = parseInt(item.style.width);
					var top2 = xxxTop + parseInt(item.style.top);
					var height2 = parseInt(item.style.height);
					if (left + width >= left2 && left <= left2 + width2 && top + height >= top2 && top <= top2 + height2) {
						xxxx.push(index);
					}
				});

				Store.dispatch('selectItem', xxxx)
			});
			$(document).on('mouseup', (ev) => {
				$(document).off('mousemove');
				$(document).off('mouseup');
				$('.g').css({
					'display': 'none',
					'width': 0,
					'height': 0,
					'left': 0,
					'top': 0
				})
			});
		});
	}
})
