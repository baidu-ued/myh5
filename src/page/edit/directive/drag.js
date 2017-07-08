import Vue from 'vue'
import store from '../store/index.js'
Vue.directive('my-drag', {
	bind: function(el) {
		let x, y;
		$(el).on('mousedown', function(ev) {
			if ($(ev.target).hasClass('ui-resizable-handle')) {
				return;
			}
			let isMove = false;
			var list = [];
			store.getters.currentItemForList.forEach((item, index) => {
				list.push({
					oldLeft: parseInt(store.getters.currentPhone.data[item].style.left),
					oldTop: parseInt(store.getters.currentPhone.data[item].style.top),
					x: parseInt(store.getters.currentPhone.data[item].style.left),
					y: parseInt(store.getters.currentPhone.data[item].style.top),
					index: item
				})
			})
			let oldLeft = parseInt($(this).css('left'));
			let oldTop = parseInt($(this).css('top'));
			let downLeft = ev.clientX;
			let downTop = ev.clientY;
			$(document).on('mousemove', function(ev) {
				isMove = true;
				list.forEach((item, index) => {
					let x = list[index].x = ev.clientX - downLeft + item.oldLeft;
					let y = list[index].y = ev.clientY - downTop + item.oldTop;
					$(store.getters.currentPhone.data[item.index]).css({
						'left': x + 'px',
						'top': y + 'px'
					})
				});
				return false;
			});
			$(document).on('mouseup', function() {
				$(document).off('mousemove');
				$(document).off('mouseup');
				if (isMove) {
					list.forEach((item, index) => {
						store.dispatch('updateStyle', {
							index: item.index,
							payload: {
								left: item.x + 'px',
								top: item.y + 'px'
							}
						});
					})
				}
			})
		})
	}
})
