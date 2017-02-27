import Vue from 'vue'
import $ from 'jQuery'
import Store from '../store/index.js'
Vue.directive('dragItem', {
	bind: function(el) {
		$(el).on('mousedown', function(ev) {
			if($(ev.target).hasClass('resize')){
                return;
            }

			var oldLeft = parseInt($(el).css('left'));
			var oldTop = parseInt($(el).css('top'));
			var downLeft = ev.clientX;
			var downTop = ev.clientY;
			$(document).on('mousemove', function(ev) {
				var x = ev.clientX - downLeft + oldLeft;
				var y = ev.clientY - downTop + oldTop;
				$(el).css('left', x + 'px');
				$(el).css('top', y + 'px');
			});
			$(document).on('mouseup', function(){
				$(document).off('mousemove');
				$(document).off('mouseup');

				// Store.dispatch('updateItem', {
				// 	index : 0,
				// 	data : {
				// 		content : '123123132'
				// 	}
				// })
			})
		})
	}
})
