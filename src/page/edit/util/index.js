import store from '../store/index.js'
/**
 * 判断是否有选中元素
 * hasSelectItem()       是否有选中元素, 不管单选还是多选
 * hasSelectItem(false)  是否有选中元素, 仅单选
 * hasSelectItem(true)   是否有选中元素, 仅多选
 * @param  {Boolean}  type 单选多选
 * @return {Boolean}
 */
export const hasSelectItem = (type) => {
	if (typeof type == 'undefined') {
		return store.getters.currentItemId != -1 || store.state.m_phone.multSelectId.length != 0;
	} else if (type === false) {
		return store.getters.currentItemId != -1 && store.state.m_phone.multSelectId.length == 0;
	} else if (type === true) {
		return store.getters.currentItemId == -1 && store.state.m_phone.multSelectId.length != 0;
	}
};
/**
 * 判断指定元素是否选中
 * isSelect(1)         判断索引为1的元素是否选中
 * isSelect(1, false)  判断索引为1的元素是否选中, 仅单选
 * isSelect(1, true)   判断索引为1的元素是否选中, 仅多选
 * @param  {Number}  index 索引
 * @param  {Boolean} type  [description]
 * @return {Boolean}
 * 
 */
export const isSelect = (index, type) => {
	if (typeof type == 'undefined') {
		return store.getters.currentItemId == index || store.state.m_phone.multSelectId.includes(index);
	} else if (type === false) {
		return store.getters.currentItemId == index;
	} else if (type === true) {
		return store.state.m_phone.multSelectId.includes(index);
	}
};
