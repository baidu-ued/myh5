<template>
<Pagination :page-num="pageNum"
				wrapperClass="page-wrap"
				pageItemClass="page-item"
				:active-page="activePage"
				v-on:change="change">
	</Pagination>
</template>

<script>
import $ from 'jQuery'
import {
	mapGetters,
	mapActions
}
from 'vuex'
import Pagination from 'vuejs-pagination'
export default {
	data: function() {
		return {

		}
	},
	computed: {
		...mapGetters(['activePage', 'pageNum'])
	},
	methods: {
		...mapActions(['changePage']),
		change: function(val) {
			this.changePage(val);
		}
	},
	components: {
		Pagination
	}
}
</script>
<style lang="scss">;
@import '../../css/global.scss';
.page-wrap {
    display: flex;
    .page-item {
        border: 1px solid #000;
        padding: 5px;
        min-width: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        margin: 10px;
    }
    .page-item.active {
        background: red;
    }
}
</style>
