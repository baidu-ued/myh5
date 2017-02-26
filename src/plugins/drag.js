import $ from 'jQuery'
let Drag = function(container, params = {}) {
	if (!container || !$(container)[0]) {
		console.log('container不存在')
		return false;
	}
	let d = this;
	//私有属性
	const _Drag = {
		row: 0, //视图view的行数
		col: 0, //视图view的列数
		containerWidth: 0, //container的初始宽度
		containerHeight: 0, //container的初始高度
		listLen: 0, //数据列表的长度
		zIndex: 'auto', //按下item的初始z-index
		action: () => {} //行为方法
	};
	//默认值
	let defaults = {
		paused: false, //是否暂停
		freeMode: false, //自由模式
		observer: false, //自动监听变化,尽量使用update进行状态变更
		mvvm: false, //视图由数据驱动
		//class
		itemsClass: 'drag-item', //item的class
		//attr
		moveTransitionTime: '0.3s', //其他item缓冲时间
		data: function() {},
		//callbacks
		// onMouseDown:function(swiper)
		// onMouseMove:function(swiper)
		// onMouseUp:function(swiper)
	};
	//赋值
	for (let attr in defaults) {
		if (!params[attr]) {
			params[attr] = defaults[attr];
		}
	}
	d.params = params;
	d.container = $(container)[0]; //根元素
	//开始
	d.start = function() {
		d.params.paused = false;
		_Drag.action()
	}
	//暂停
	d.pause = function() {
		d.params.paused = true;
	}
	//行为
	_Drag.action = function() {
		$(d.container).on('mousedown', d.params.itemsClass, function(ev) {
			if (d.params.paused) {
				return false;
			}
			// if (d.params.observer) {
			d.update()
			// }
			let _this = this;
			let downX = ev.pageX;
			let downY = ev.pageY;
			let activeItem = d.list.filterOne(function(item) {
				return item.dom == _this;
			});
			d.activeItem = activeItem;
			let oldIndex = activeItem.index; //活跃的item在dom中的最初的位置
			let downIndex = $(activeItem.dom).index(); //活跃的item对应的dom在d.list的位置
			$(d.container).find(d.params.itemsClass).css('transition', d.params.moveTransitionTime);
			_Drag.zIndex = $(activeItem.dom).css('z-index');
			$(activeItem.dom).css({
				'transition': '0s',
				'z-index': Number(_Drag.zIndex) || 1
			});
			$(document).on('mousemove', function(ev) {

				let nowX = ev.pageX;
				let nowY = ev.pageY;
				let x = d.list[oldIndex].left + nowX - downX;
				let y = d.list[oldIndex].top + nowY - downY;
				//找到左面的item
				let lItem = d.list.filterOne(function(item) {
					return (item.index === activeItem.index - 1) && (activeItem.index % _Drag.col !== 0);
				});
				//找到右面的item
				let rItem = d.list.filterOne(function(item) {
					return (item.index === activeItem.index + 1) && ((activeItem.index + 1) % _Drag.col !== 0);
				});
				//找到上面的item
				let tItem = d.list.filterOne(function(item, index) {
					return (item.index === activeItem.index - _Drag.col) && (activeItem.index > _Drag.col - 1);
				});
				//找到下面的item
				let bItem = d.list.filterOne(function(item, index) {
					return (item.index === activeItem.index + _Drag.col);
				});
				//4个方向的碰撞检测
				if (lItem != -1 && x < d.list[lItem.index].left + d.list[lItem.index].width / 2) {
					$(lItem.dom).css({
						left: d.list[activeItem.index].left + 'px',
						top: d.list[activeItem.index].top + 'px',
					});
					activeItem.index--;
					lItem.index++;
				} else if (rItem != -1 && x + d.list[activeItem.index].width > d.list[rItem.index].left + d.list[rItem.index].width / 2) {
					$(rItem.dom).css({
						left: d.list[activeItem.index].left + 'px',
						top: d.list[activeItem.index].top + 'px'
					});
					activeItem.index++;
					rItem.index--;
				} else if (tItem != -1 && y < d.list[tItem.index].top + d.list[tItem.index].height / 2) {
					let obj = d.list.filter(function(item) {
						return item.index >= tItem.index && item.index < activeItem.index
					})
					obj.forEach(function(item) {
						$(item.dom).css({
							left: d.list[item.index + 1].left + 'px',
							top: d.list[item.index + 1].top + 'px'
						})
						item.index++;
						activeItem.index--;
					})
				} else if (bItem != -1 && y + activeItem.height > d.list[bItem.index].top + d.list[bItem.index].height / 2) {
					let obj = d.list.filter(function(item) {
						return item.index <= bItem.index && item.index > activeItem.index
					})
					obj.forEach(function(item) {
						$(item.dom).css({
							left: d.list[item.index - 1].left + 'px',
							top: d.list[item.index - 1].top + 'px'
						})
						item.index--;
						activeItem.index++;
					})
				}
				//限制拖拽范围
				if (!d.params.freeMode) {
					x = x <= 0 ? 0 : x;
					x = x >= _Drag.containerWidth - activeItem.width ? _Drag.containerWidth - activeItem.width : x;
					y = y <= 0 ? 0 : y;
					y = y >= _Drag.containerHeight - activeItem.height ? _Drag.containerHeight - activeItem.height : y;
				}
				//设置当前item的class
				$(activeItem.dom).css({
					left: x + 'px',
					top: y + 'px'
				})
			});
			$(document).on('mouseup', function() {
				$(document).off('mousemove');
				$(document).off('mouseup');
				$(d.container).find(d.params.itemsClass).css({
					left: '',
					top: '',
					position: ''
				});
				$(d.container).css({
					height: 'auto'
				})


				// if (activeItem.index > 12) {
				// 	d.list[12] = activeItem;
				// }
				// while (d.list.length > _Drag.listLen) {
				// 	d.list.pop();
				// }

				// var arr = new Array(d.list.length);
				// d.list.forEach(function(item, index) {
				// 	arr[item.index] = vm.list[index];
				// })

				// d.list.sort(function(a, b) {
				//     return a.index - b.index;
				// })
				// vm.list = arr;

				_Drag.emit('onMouseUp');
				// d.activeItem = null;
			})
		})
	}
	d.getData = function() {
		return d.params.data();
	}
	//callback
	_Drag.emit = function(eventName) {


		if (d.params[eventName]) {
			d.params[eventName](d);
		}
	}
	//更新视图
	d.update = function() {
		/*
		    更新数据，更新行数列数,更新宽高
		*/
		//更新container
		_Drag.containerWidth = $(d.container).width();
		_Drag.containerHeight = $(d.container).height();
		$(d.container).css({
			width: _Drag.containerWidth + 'px',
			height: _Drag.containerHeight + 'px'
		});
		//存储z-index
		d.list = [];
		$(d.container).find(d.params.itemsClass).each(function(index, item) {
			let left = $(item).position().left;
			let top = $(item).position().top;
			let width = $(item).outerWidth(true);
			let height = $(item).outerHeight(true);
			$(item).css({
				left: left + 'px',
				top: top + 'px'
			});
			d.list.push({
				dom: item,
				index: index,
				left: left,
				top: top,
				width: width,
				height: height
			})
		})
		_Drag.listLen = d.list.length;
		//判断行数，列数
		if (d.list.length) {
			let firstT = d.list[0].top;
			_Drag.col = d.list.filter(function(item) {
				return item.top == firstT;
			}).length;
			_Drag.row = Math.ceil(d.list.length / _Drag.col);
		}
		//添加虚拟数据
		if (_Drag.row > 1) {
			for (let i = _Drag.listLen; i < _Drag.row * _Drag.col; i++) {
				d.list.push({
					index: i,
					left: d.list[i - _Drag.col].left,
					top: d.list[_Drag.listLen - 1].top,
					width: d.list[_Drag.listLen - 1].width,
					height: d.list[_Drag.listLen - 1].height
				})
			}
		}
		$(d.container).find(d.params.itemsClass).css('position', 'absolute');
	}
	//销毁
	d.destory = function() {
		d.container.off('mousedown');
		d.container.off('mouseover');
		d.container.off('mouseout');
	}
	d.start();
}
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
export default Drag;
