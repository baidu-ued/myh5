import store from '../store/index.js'
/*
	是否选中，默认为单选, 如果第二个参数为true， 则为多选, 以及是否有选中元素，
	如果 isSelected()  是否有选中元素
	isSelected(1) 	索引=1的元素是否被选中
	isSelected(1, true) 索引=1的元素是否是单选
	isSelected(1, false) 索引=1的元素是否是多选
	判断是否选中， 无论是单选还是多选，
	第二个参数为true, 则单选
*/
/**
 * 是否选中
 * @param  {Number}  index     元素索引, 默认
 * @return {Boolean} multiLine 多选
 */
export const isSelected = function(index, multiLine) {

	if (typeof index == 'undefined' && (store.getters.currentItemId != -1 || store.state.m_phone.multSelectId.length != 0)) {
		return true;
	} else if (typeof index == 'number' && typeof multiLine == 'undefined' && (store.getters.currentItemId == index || store.state.m_phone.multSelectId.includes(index))) {
		return true;
	} else if (typeof index == 'number' && typeof multiLine === true && store.getters.currentItemId == index) {
		return true;
	} else if (typeof index == 'number' && typeof multiLine === true && store.state.m_phone.multSelectId.includes(index)) {
		return true;
	}
}
