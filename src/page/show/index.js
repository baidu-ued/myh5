import * as itemTypes from '../edit/tpl/types.js'
let hot = {
	init() {
		$('.' + itemTypes.HOT_SPACE).css('opacity', 0);
	}
}
$(document).on('click', '.item', function(){
	console.log(rootSwiper.slides.length)
	let arr = $(this).attr('event').split(',');
	if(arr[0] == 'goto'){
		rootSwiper.slideTo(Number(arr[1]))
	}else if(arr[0] == 'href'){
		window.location.href = arr[1];
	}
})





hot.init();
window.rootSwiper = new Swiper('#wrapAll', {
	direction: 'vertical',
	loop: phoneSet.allowPage,
	onSlideChangeEnd : function(swiper){
		// console.log(swiper.activeIndex)
	}
})
