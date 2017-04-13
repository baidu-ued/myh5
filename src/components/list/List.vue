<template>
<ul class="list">
	<li class="item"
					v-for="i in list"> {{i.work_id}}
		<a :href="'edit/' + i.work_id"></a>
		</li>
</ul>
</template>

<script>
import $ from 'jQuery'
export default {
	name: 'List',
	data() {
		return {
			list: []
		}
	},
	mounted: function() {
		$.ajax({
			url: '/api/list/get',
			type: 'get',
			data: {
				page: 1,
				length: 10
			},
			success: (rs) => {
				console.log(rs);
				this.list = rs.data.data;
			}
		});
	},
	methods: {
		get: function() {
			alert(2)
		}
	},
	components: {}
}
</script>

<style scoped lang="scss">
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
