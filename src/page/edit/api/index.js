import $ from 'jQuery'
/**
 * 加载数据
 * @param  {Object} data 数据列表
 * @return {Object}      当前项目的数据
 */
export const loadData = (data) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: '/api/edit/get',
			type: 'get',
			data: data,
			success: (rs) => {
				resolve(rs.data.data);
			}
		});
	})
}
