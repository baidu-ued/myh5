<style lang="scss">

#pagination {
    ul {
        display: flex;
        flex-direction: row;
    }
    li {
        padding: 0 10px;
        line-height: 50px;
        border: 1px solid #000;
        margin: 0 10px;
    }
	li.actived{
		background: red;
	}
}

</style>

<template>

<div id="app">
    <p>dsafklasfdaaaj</p>
    <ul class="list">
        <li class="item" v-for="item in items">{{item.name}}</li>
    </ul>
    <Pagination id="pagination" v-on:change="change" :pageLength="pageLength" :activePage="activePage" pageSize="7"></Pagination>
</div>

</template>

<script>

import Pagination from 'vuejs-pagination'

    // import Box from './list/components/box.vue'
    // console.log(Pagination)
export default {
    name: 'List',
    data() {
        return {
			items : [1,2,3],
            pageLength: 20,
            activePage: 1
        }
    },
    methods: {
        change: function(value) {
            this.activePage = value; //必须改变activePage
        }
    },
    components: {
        Pagination,
        // Box
    }
}

</script>
