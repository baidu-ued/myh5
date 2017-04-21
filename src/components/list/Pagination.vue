<style lang="scss">

@import '../../css/global.scss';
.page-wrap {
    display: flex;
	justify-content: center;
    .page-item {
        border: 1px solid #D8D8D8;
        background: #fff;
        min-width: 12px;
        padding: 0 9px;
        line-height: 28px;
        text-align: center;
        cursor: pointer;
        margin: 0 5px;
        border-radius: 2px;
		-webkit-user-select:none
    }
    .page-item.active {
        background: #E1B355;
        border-color: #E1B355;
        color: #fff;
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
