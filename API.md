列表页
拿到数据	/api/list/get?page=1&

API       | Type          | Default | min | Required | Description
:--------- | :------------ | :------ | :-- | :------- | :----------
/api/list/get | GET        |         | 1   | true     | 总页码长度
activePage | Number        |         | 1   | true     | 当前页
pageSize   | String,Number | 5       | 3   |          | 显示区域长度
