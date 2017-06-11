<style lang="scss">

// @import '../../css/global.scss';
.page-wrap {
    display: flex;
	margin-top: 30px;
	justify-content: center;
    .page-item {
        // border: 1px solid #D8D8D8;
        background: #fff;
        min-width: 14px;
        padding: 0 10px;
        line-height: 28px;
        text-align: center;
        cursor: pointer;
        margin: 0 6px;
        border-radius: 3px;
		-webkit-user-select:none;

		// color: #999;
    }
	.page-item:active{
		// color: red;
	}
    .page-item.active {
        background: #E1B355;
        border-color: #E1B355;
        color: #fff;
    }
	.page-item.disabled {
        cursor: default;
		opacity: 0.5;
    }
	.page-item:hover{
		// color : #E1B355;
	}
}

</style>

<template>

<Pagination :page-num="pageNum" wrapperClass="page-wrap" pageItemClass="page-item" :active-page="activePage" v-on:change="change">
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
