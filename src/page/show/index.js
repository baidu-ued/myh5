import * as itemTypes from '../edit/tpl/types.js'
let hot = {
	init() {
		$('.' + itemTypes.HOT_SPACE).css('opacity', 0);
	}
}
const ctrlAnimation = {}
const music = {
	init() {
		if (phoneMain.music && phoneMain.music.path) {
			$('audio').attr('src', 'http://res1.eqh5.com/store/35a3f72ba00d441a8d9a6fab0a4b388a.mp3')
			$('audio')[0].play();
		}
	}
}
$(document).on('click', '.item', function() {
	console.log(rootSwiper.slides.length)
	let arr = $(this).attr('event').split(',');
	if (arr[0] == 'goto') {
		rootSwiper.slideTo(Number(arr[1]))
	} else if (arr[0] == 'href') {
		window.location.href = arr[1];
	}
})
const load = {
	init() {
		var firstSlide = $('body .swiper-container>.swiper-wrapper>.swiper-slide').eq(0);
		var imgArr = [];
		let successCount = 0;
		firstSlide.find('img').each((index, item) => {
			imgArr.push($(item).attr('data-src'));
		})
		imgArr.forEach((item) => {
			let img = new Image();
			img.onload = () => {
				successCount++;
				$('#loading').html(successCount / imgArr.length * 100 + '%');
				if (successCount == imgArr.length) {
					setTimeout(function() {
						$('#loadingWrap').hide();
					}, 100);
				};
			}
			img.src = item;
		})
	}
}
load.init();
hot.init();
music.init();
window.rootSwiper = new Swiper('#wrapAll', {
	direction: 'vertical',
	loop: phoneSet.allowPage,
	onSlideChangeEnd: function(swiper) {
		// console.log(swiper.activeIndex)
	}
})
