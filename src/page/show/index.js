import * as itemTypes from '../edit/tpl/types.js'
let hot = {
	init() {
		$('.' + itemTypes.HOT_SPACE).css('opacity', 0);
	}
}
const ctrlAnimation = {

}

const music = {
	init(){
		if(phoneMain.music && phoneMain.music.path){
			$('audio').attr('src', 'http://res1.eqh5.com/store/35a3f72ba00d441a8d9a6fab0a4b388a.mp3')
			$('audio')[0].play();
		}
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
music.init();
window.rootSwiper = new Swiper('#wrapAll', {
	direction: 'vertical',
	loop: phoneSet.allowPage,
	onSlideChangeEnd : function(swiper){
		// console.log(swiper.activeIndex)
	}
})
