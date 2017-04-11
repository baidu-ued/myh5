/*
数组的筛选
参数 ： fn( item， index， array）
       thisArg : this的指向
返回值：被选中的item
只会返回第一个被选中的item，如果想筛选出多个值，请使用原生方法 ： Array.filter
*/
if (!Array.prototype.filterOne) {
	Array.prototype.filterOne = function(fun /*, thisArg */ ) {
		"use strict";
		if (this === void 0 || this === null) throw new TypeError();
		let t = Object(this);
		let len = t.length >>> 0;
		if (typeof fun !== "function") throw new TypeError();
		// let res = [];
		let thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (let i = 0; i < len; i++) {
			if (i in t) {
				let val = t[i];
				// NOTE: Technically this should Object.defineProperty at
				//       the next index, as push can be affected by
				//       properties on Object.prototype and Array.prototype.
				//       But that method's new, and _Drag.collisions should be
				//       rare, so use the more-compatible alternative.
				if (fun.call(thisArg, val, i, t)) return val;
			}
		}
		return -1;
	};
}
