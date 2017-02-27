<style scoped lang="scss">

$width: 175px;
$bottomBar: 30px;
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-thumb {
    background: rgba(33, 33, 33, .5);
    border-radius: 3px;
    border: 1px solid rgba(33, 33, 33, .8);
}

::-webkit-scrollbar-track-piece {
    background: 0 0;
    background: rgba(100, 100, 100, .2);
}

#page {
    width: $width;
    position: absolute;
    left: 0;
    top: 0;
    overflow: auto;
    bottom: 0;
    background: #494950;
    border-right: 1px solid #000;
    .list {
        padding: 10px 0 $bottomBar;
        z-index: 1;
        position: relative;
        .item {
            width: 112px;
            height: 182px;
            background: #333333;
            margin-bottom: 30px;
            border: #333333 solid 3px;
            transition: 0.3s;
            position: relative;
            margin-left: 25px;
            margin-top: 20px;
            // padding: 12px 15px 18px 25px;
        }
        .item.active {
            border-color: #ff5e5e;
        }
    }
    .add-page-button {
        position: fixed;
        bottom: 0;
        width: $width;
        height: 30px;
        border-top: 1px solid #323237;
        text-align: center;
        line-height: $bottomBar;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        background: #48484f;
        z-index: 999;
    }
}

</style>


<template>

<div id="page">
    <ul class="list">
        <li :class="{'item':true, 'active' : index == activePage}" v-for="(item, index) in list">
			<p>{{index}}</p>
			<div @click="delPage(index)" style="position:absolute;right:0;top:0;width:30px;height:30px;line-height:30px;text-align:center;">x</div>
		</li>
    </ul>
    <div class="add-page-button" @click="addPage()">+</div>
</div>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
import $ from 'jQuery'
import Drag from '../plugins/drag.js'
export default {
    computed: {
        ...mapGetters({
            list: 'pageList',
            activePage: 'activePage'
        })
    },
    methods: {
        ...mapActions(['addPage', 'delPage', 'selectPage'])
    },
    data() {
        return {

        }
    },
    mounted() {
        var _this = this;
        var obj = new Drag($('#page .list'), {
            itemsClass: '.item',
            onMouseUp: function(Drag) {
                _this.selectPage(Drag.activeItem.index)
            }
        })
        console.log(obj);
    }
}

</script>
