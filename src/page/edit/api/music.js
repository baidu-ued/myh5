import $ from 'jQuery'
export const getMusic = function(data, cb) {
	$.ajax({
		url: 'http://store.eqxiu.com/api/product/cat/listProdByCate?attrGroupId=3&pageSize=10',
		type: 'get',
		data: data,
		success: (rs) => {
			cb && cb(rs);
		}
	});
}
