<style lang="scss">
.list {
    display: flex;
    flex-wrap: wrap;
    width: 800px;
    .item {
        width: 120px;
        height: 160px;
        margin: 10px;
        border: 1px solid #000;
    }
    a {
        width: 50px;
        height: 50px;
        display: block;
        background: red;
    }
}

.pagination {
    display: flex;
    .page-item {
        width: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid #000;
        margin: 0 10px;
        cursor: pointer;
    }
    .page-item.actived {
        background: red;
    }
    .page-item.disabled {
        background: blue;
        cursor: not-allowed;
    }
}
</style>

<template>

<div>
	<Public-Header></Public-Header>
	<ul class="list">
		<li class="item"
						v-for="i in list">
			{{i.work_id}}
			<a :href="'edit/' + i.work_id"></a>
			</li>
	</ul>

	<Pagination class="pagination"
					v-on:change="change"
					pageItemClass="page-item"
					:pageLength="pageLength"
					:activePage="activePage"
					pageSize="3" />
</div>
</template>

<script>
import $ from 'jQuery'
import Pagination from 'vuejs-pagination'
import PublicHeader from '../public/header.vue'
export default {
	data: function() {
		return {
			list: [],
			activePage: 1,
			pageLength: 10
		}
	},
	created: function(){
		this.getList(1)
	},
	methods: {
		getList: function(page) {
			$.ajax({
				url: '/api/list/get',
				type: 'get',
				data: {
					page: page,
					length: 10
				},
				success: (rs) => {
					console.log(rs);
					this.pageLength = rs.data.pageNum;
					this.list = rs.data.data;
				}
			});
		},
		change: function(value) {
			this.getList(value)
			this.activePage = value;
		}
	},
	components: {
		Pagination,
		PublicHeader
	}
}
</script>
