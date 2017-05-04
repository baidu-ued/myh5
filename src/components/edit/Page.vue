<style scoped lang="scss">

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

::-webkit-scrollbar-thumb {
    min-height: 20px;
    background-clip: content-box;
    box-shadow: 0 0 0 5px rgba(100, 100, 100, .5) inset;
}

.box-wrap {
    position: absolute;
    left: 0;
    top: 50px;
    bottom: 0;
    width: 175px;
    z-index: 2;
    border-right: 1px solid #000;
    overflow: auto;
    background: #494950;
    ul {
        height: 1000px;
        padding: 0 10px;

        li {
            height: 200px;
            border: 1px solid #000;
            margin: 10px;
			// width:175px;
        }
        li.active {
            border-color: #cccccc;
        }
    }
    .add-page-button {
        background: #48484f;
        border-top: 1px solid #323237;
        color: #fff;
        font-size: 24px;
        line-height: 30px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 175px;
        text-align: center;
        cursor: pointer;
        z-index: 999;
    }
}

</style>

<template>

<section class="box-wrap">
    <ul class="drag-wrapper" id="aaa">
        <li @click="changePage(index)" v-for="(i, index) in pageLength" class="v-sort-item" v-bind:class="{active : index == currentPage}">{{i}}</li>
    </ul>
    <div @click="addPage" class="add-page-button" id="addpage">+</div>
</section>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
export default {
    computed: {
        ...mapGetters(['pageLength', 'currentPage'])
    },
    methods: {
        ...mapActions(['changePage', 'addPage'])
    },
	mounted : function(){

	},
    data: function() {
        return {
            list: [1, 2, 3, 4, 5, 6, 7, 8]
        }
    }
}

</script>
