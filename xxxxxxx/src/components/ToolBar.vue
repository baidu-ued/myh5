<style scoped lang="scss">

.tool-bar {
    position: absolute;
    right: 0;
    width: 320px;
    top: 0;
    bottom: 0;
    background: #f6f6f6;
    .tool-bar-tabs {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        ;
        align-items: center;
        >.item {
            border: 1px solid #000;
            line-height: 32px;
            flex: 1;
            text-align: center;
        }
        >.item.active {
            background: red;
        }
    }
}

</style>

<template>

<div class="tool-bar">
    <div>
        <ul class="tool-bar-tabs">
            <li @click="changeTabs(index)" v-for="(i, index) in tabs.list" :class="{'item' : true, 'active' : index == tabs.index}">{{i.name}}</li>
        </ul>
        <Mainx v-if="activeIndex.length == 0" :tabs="tabs.index"></Mainx>
		<Tool-Txt v-if="test('txt')"></Tool-Txt>
    </div>
</div>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
    // import * as types from '../tpl/tpl-types.js'
import Mainx from './ToolBar/main'
import ToolTxt from './ToolBar/txt'


import $ from 'jQuery'




export default {
    methods: {
        ...mapActions(['updateItem']),
            changeTabs(index) {
                this.tabs.index = index;
            },
			test(type){
				return this.activeIndex.length == 1 && this.activePhone.data[this.activeIndex[0]].type == type;
			}
    },
    computed: {
        ...mapGetters(['activePhone', 'activeIndex'])
    },
    components: {
        Mainx,
		ToolTxt
    },
    data() {
        return {

            tabs: {
                index: 0,
                list: [{
                    name: '背景'
                }, {
                    name: '音乐'
                }]
            }

        }
    }
}

</script>
