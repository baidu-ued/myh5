<style>

html {
    background: #57585d;
    /*height: 100%;*/
    overflow: hidden;
}

body {
    font-size: 12px;
}

</style> <style scoped lang="scss"> @import '../../css/global.scss';
.main {
    display: flex;
    .content {
        position: absolute;
        left: $panel_width;
        top: $header_height;
        right: 0;
        bottom: 0;
        overflow: scroll;
        display: flex;
        flex-direction: column;
    }
}

</style>

<template>

<div>
    <PublicHeader page="list"/>
    <div class="main">

        <Panel></Panel>
        <div class="content">
            <List></List>
            <!-- <Pagination></Pagination> -->
        </div>


    </div>
</div>

</template>

<script>

import '../../css/reset.css'
import PublicHeader from '../public/Header.vue'
import Panel from './Panel.vue'
import List from './List.vue'
import Pagination from './Pagination.vue'
import {
    mapGetters,
    mapActions
}
from 'vuex'
export default {
    name: 'App',
    computed: {
        ...mapGetters(['type', 'page'])
    },
	mounted : function(){
		this.loadMore();
	},
    methods: {
        ...mapActions(['loadMore']),
    },
    components: {
        PublicHeader,
        Panel,
        List,
        Pagination
    }
}

</script>
