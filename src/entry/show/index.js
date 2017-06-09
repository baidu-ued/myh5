import * as itemTypes from '../../const/item-types.js'
let hot = {
	init() {
		$('.' + itemTypes.HOT_SPACE).css('opacity', 0);
	}
}
hot.init();
let obj = $('.txt').attr('attr')
console.log(JSON.parse(obj));
// alert(JSON.parse(obj));
$('.txt').on('click', function(){
	let goto = JSON.parse($(this).attr('attr'));
	a.slideTo(goto.goto)

})
let a = new Swiper('#wrapAll', {
	direction: 'vertical',
	loop: phoneSet.allowPage
})
