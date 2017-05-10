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
