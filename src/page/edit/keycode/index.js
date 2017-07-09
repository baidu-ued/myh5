import store from '../store/index.js'
$(window).keydown(function(ev) {
	if (ev.keyCode == 8) {
		store.dispatch('delItem', store.getters.currentItemForList);
	}
});
