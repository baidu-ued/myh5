import $ from 'jQuery'
import store from '../store/edit.js'
$(document).on('mousedown', '.phone-item', function(ev) {
	var el = this;
	var oldLeft = $(this).position().left;
	var oldTop = $(this).position().top;
	var downLeft = ev.clientX;
	var downTop = ev.clientY;
	$(document).on('mousemove', function(ev) {
		var x = ev.clientX - downLeft + oldLeft;
		var y = ev.clientY - downTop + oldTop;
		$(el).css({
			'left': x + 'px',
			'top': y + 'px'
		})
	})
	$(document).on('mouseup', function(){
		$(document).off('mousemove');
		$(document).off('mouseup');
		store.dispatch('addPage');
	})
})
