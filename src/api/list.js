import $ from 'jQuery'
export const get = function(data, cb) {
	$.ajax({
		url: '/api/list/get',
		type: 'get',
		data: data,
		success: (rs) => {
			console.log(rs);
			cb && cb(rs);
		}
	});
}

export const add = function(data, cb) {
	$.ajax({
		url: '/api/list/add',
		type: 'get',
		success: (rs) => {
			console.log(rs);
		}
	});
}
