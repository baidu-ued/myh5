import $ from 'jQuery'
export const get = function(data, cb) {
	$.ajax({
		url: '/api/list/get',
		type: 'get',
		data: data,
		success: (rs) => {
			cb && cb(rs);
		}
	});
}
