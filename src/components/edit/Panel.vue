<style scoped lang="scss">

.box-wrap {
    width: 320px;
    border: 1px solid #000;
    height: 100%;
    position: absolute;
    right: 0;
    overflow: scroll;
    background: #f6f6f6;
    .color-wrap {
        display: flex;
        // justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .color-item {
        // margin:1px;
        margin: 0 1px 1px 0;
        border: 1px solid #ccc;
        width: 20px;
        height: 16px;
    }
    .color-item:hover {
        border-color: #ff5e5e;
    }
    .panel-tabs {
        display: flex;
        // justify-content: center;
        justify-content: space-between;
        align-items: center;
        .tab-item {
            // border: 1px solid #000;
            background: #d7d7d7;
            width: 100%;
            text-align: center;
            line-height: 30px;
            font-size: 14px;
        }
        .tab-item.active {
            background: #f6f6f6;
        }
    }
    .panel-list {
        .panel-item {
            padding: 0 20px;
            border-bottom: 1px solid #cccccc;
            display: flex;
            flex-direction: column;
            .panel-item-title {
                font-size: 14px;
                text-indent: 30px;
                line-height: 46px;
            }
        }
        .panel-item:last-child {
            border-bottom: none;
        }
    }
    .color-wrap {
        width: 276px;
        align-self: center;
    }
    .public-color-wrap {
        display: flex;
        margin-top: 10px;
        align-items: center;
        p {
            font-size: 14px;
        }
    }
    .public-color-input {
        width: 26px;
        padding: 1px;
        height: 26px;
    }
    .public-text-input {
        width: 73px;
        align-self: stretch;
        background: #f6f6f6;
        font-size: 13px;
        border: 1px solid #9a9ca1;
        outline: none;
        text-align: center;
        border-left: none;
    }
}

</style>

<template>

<section class="box-wrap">
    <ul class="panel-tabs">
        <li v-if="currentItemId == -1" class="tab-item active" data-i="0">页面设置</li>
        <li v-if="currentItemId != -1" v-for="(i, index) in list" class="tab-item" :class="{ active : index == listIndex}" data-i="0">{{i.title}}</li>
    </ul>
    <div class="panel-list" v-if="currentItemId == -1">
        <div class="panel-item">
            <h4 class="panel-item-title">背景颜色</h4>
            <ul class="color-wrap">
                <li @click="changeMain(['background', item])" class="color-item" v-for="item in backgroundColor" :style="{background: item}"></li>
            </ul>
            <div class="public-color-wrap">
                <input class="public-color-input" type="color" v-model="currentPhone.main.background" />
                <input class="public-text-input" type="text" v-model="currentPhone.main.background" />
            </div>
        </div>
    </div>

    <div v-if="currentItemId != -1">
		<div class="public-color-wrap">
        	<p>文本</p>
        	<input type="text" v-model="currentItem.content">
		</div>
        <div class="public-color-wrap">
            <p>文字颜色</p>
            <input class="public-color-input" type="color" :value="currentItem.style.color || '#666666'" @change="changeStyle({ 'color' : $event.target.value })">
			<input class="public-text-input" type="text" :value="currentItem.style.color || '#ffffff'" @input="changeStyle({ 'color' : $event.target.value })">
        </div>
        <div class="public-color-wrap">
            <p>背景颜色</p>
            <input class="public-color-input" type="color" :value="currentItem.style.background || '#ffffff'" @change="changeStyle({ 'background' : $event.target.value })">
            <input class="public-text-input" type="text" :value="currentItem.style.background || '#ffffff'" @input="changeStyle({ 'background' : $event.target.value })">
        </div>
    </div>
</section>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
import Vue from 'vue'



export default {
    computed: {
        ...mapGetters(['currentPhone', 'currentItem', 'currentItemId']),
    },
    methods: {
        ...mapActions(['changeMain', 'changeStyle']),
    },
    data: function() {
        return {
            list: [{
                title: '文本'
            }, {
                title: '布局'
            }, {
                title: '动画'
            }, {
                title: '事件'
            }],
            listIndex: 0,
            backgroundColor: ["#002939", "#001445", "#0e002d", "#22002f", "#2d0515", "#490000", "#471400", "#452700", "#432f00", "#535000", "#3e4505", "#1d300d", "#003c52", "#001f67", "#140041", "#340047", "#430a1f", "#6e0500", "#671d00", "#663900", "#644600", "#7a7500", "#5c650a", "#2b4714", "#005a7c", "#002d99", "#200063", "#4d0069", "#640e2f", "#a40800", "#9b2c01", "#975500", "#956900", "#b7b100", "#89980e", "#3f691e", "#0079a5", "#003dcc", "#290082", "#66008d", "#86133e", "#d90b00", "#ce3b00", "#c97100", "#c78d00", "#f3eb00", "#b7ca14", "#558e28", "#0091ce", "#0044fe", "#3b00a4", "#8500af", "#a8184b", "#ff2712", "#ff5308", "#fd9a00", "#fcbd00", "#ffff33", "#d1eb2b", "#66b132", "#00bafb", "#2e6ffd", "#4a00e6", "#ae00f0", "#dd2067", "#fe4940", "#fe7038", "#fda531", "#fdc131", "#fff959", "#deef53", "#86cd4d", "#47ccfc", "#6293fe", "#722cfd", "#c632fd", "#e6578d", "#ff766f", "#fe936a", "#febb64", "#fed164", "#fffa83", "#e6f37d", "#a3d979", "#84ddfd", "#98b7fe", "#a072fd", "#da77fe", "#ef8fb3", "#ffa49f", "#ffb79b", "#fed198", "#fedf98", "#fffcab", "#eff7a9", "#c2e5a6", "#c0edfe", "#cadbfe", "#cfbbfe", "#ecbafe", "#f6c7d9", "#fed1cf", "#ffdbcd", "#ffe8cb", "#ffefcb", "#fefdd5", "#f6fad3", "#d9eaca", "#edfaff", "#f0f5ff", "#f1ecff", "#faecff", "#fdeff4", "#fff2f1", "#fff5f1", "#fff8f0", "#fffaf0", "#fffef3", "#fdfef3", "#f7fcf3", "#ffffff", "#e6e6e6", "#cdcdcd", "#b3b3b3", "#9a9a9a", "#808080", "#676767", "#4d4d4d", "#343434", "#1a1a1a", "#000000", "transparent"]
        }
    }


}

</script>
