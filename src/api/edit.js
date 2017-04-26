import $ from 'jQuery'
export const get = function(data, cb) {
	$.ajax({
		url: '/api/edit/get',
		type: 'get',
		data: data,
		success: (rs) => {
			console.log(rs);
			cb && cb(rs);
		}
	});
}
