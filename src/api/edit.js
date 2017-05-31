import $ from 'jQuery'
export const get = function(data, cb) {
	$.ajax({
		url: '/api/edit/get',
		type: 'get',
		data: data,
		success: (rs) => {
			cb && cb(rs);
		}
	});
}

export const save = function(data, cb) {

	$.ajax({
		url: '/api/edit/save',
		type: 'get',
		data: data,
		success: (rs) => {


			cb && cb(rs);
		}
	});
}

export const savePic = function(data, cb) {
	$.ajax({
		url: '/aj/pic/save',
		type: 'post',
		contentType: false,
		//必须false才会自动加上正确的Content-Type
		processData: false,
		//必须false才会避开jQuery对 formdata 的默认处理,XMLHttpRequest会对 formdata 进行正确的处理
		data: data,
		success: (rs) => {
			cb && cb(rs);
		}
	});
}

export const getPic = function(data, cb) {
	$.ajax({
		url: '/aj/pic/get',
		type: 'get',
		data: data,
		success: (rs) => {
			cb && cb(rs);
		}
	});
}

export const delPic = function(data, cb) {
	$.ajax({
		url: '/aj/pic/del',
		type: 'get',
		data: data,
		success: (rs) => {
			cb && cb(rs);
		}
	});
}
