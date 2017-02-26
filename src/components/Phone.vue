<style scoped lang="scss">

#phone {
    position: absolute;
    // width: 320px;
    // background: #fff;
    left: 30%;
    top: 20px;
    .phone-top {
        width: 320px;
        height: 43px;
        background: url('../images/phone_top.png');
    }
    .phone-center {
        width: 320px;
        height: 504px;
        background: #fff;
        position: relative;
    }
    .phone-left {
        width: 3px;
        height: 189px;
        background: url('../images/phone_left.png');
        position: absolute;
        top: 80px;
        left: -3px;
    }
    .phone-bottom {
        width: 320px;
        height: 50px;
        background: url('../images/phone_bottom.png');
    }
    .resizeable {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border: 1px solid #000;
    }
    .resize {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px solid #fff;
        position: absolute;
        background: #0f6cd5;
    }
    .resize-nw {
        top: -6px;
        left: -6px;
        cursor: nw-resize;
    }
    .resize-ne {
        top: -6px;
        right: -6px;
        cursor: ne-resize;
    }
    .resize-sw {
        bottom: -6px;
        left: -6px;
        cursor: sw-resize;
    }
    .resize-se {
        bottom: -6px;
        right: -6px;
        cursor: se-resize;
    }
}

</style>

<template>

<div id="phone" v-select>
    <div class="phone-top"></div>
    <div class="phone-center" :style="{background:activePhone.main.background}">
        <div class="lllll"  :id="item.id" @mousedown.stop="selectItem(index)" v-drag-item :style="item.style" v-for="(item, index) in activePhone.data">
            <div class="inner" v-html="item.content"></div>
            <div v-if="activeIndex.includes(index)" class="resizeable">
                <div v-change-size="{type : 'nw'}" class="resize resize-nw"></div>
                <div v-change-size="{type : 'ne'}" class="resize resize-ne"></div>
                <div v-change-size="{type : 'sw'}" class="resize resize-sw"></div>
                <div v-change-size="{type : 'se'}" class="resize resize-se"></div>
            </div>
        </div>
    </div>
    <div class="phone-left"></div>
    <div class="phone-bottom"></div>
</div>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'

import select from '../directive/select.js'
import dragItem from '../directive/drag.js'
import changeSize from '../directive/changesize.js'
export default {
    computed: {
        ...mapGetters(['activePhone', 'activeIndex'])
    },
    methods: {
        ...mapActions(['selectItem'])
    },
    data() {
        return {

        }
    }
}

</script>
