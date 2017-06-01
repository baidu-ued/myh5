<style scoped lang="scss">

;
@import '../../css/global.scss';
header {
    height: $header_height;
    background: #333;
    color: #d5d5d5;
    display: flex;
    justify-content: space-between;
    .logo-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 200px;
    }
    .opt-panel,
    .ctrl-panel {
        display: flex;
        justify-content: center;
        align-items: center;
        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 10px;
            transition: 0.5s;
			cursor: pointer;
            svg {
                font-size: 20px;
            }
			span{
				font-size: 12px;
			}
        }
        li:hover {
            color: #ff5e5e;
        }
    }
}

</style>

<template>

<header>
    <div class="logo-wrap">
        <img src="http://z.sina.com.cn/styles/images/logo.png" />
    </div>

    <ul class="ctrl-panel">
        <li @click="addItem({type : types.TXT})">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-wenben"></use>
            </svg>
            <span>文本</span>
        </li>

		<li @click="panelShow(types.PIC)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tupian"></use>
            </svg>
            <span>图片</span>
        </li>
		<li>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinle"></use>
            </svg>
            <span>音乐</span>
        </li>
		<li>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-x-mpg"></use>
            </svg>
            <span>视频</span>
        </li>
		<li>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-biaodan"></use>
            </svg>
            <span>表单</span>
        </li>
    </ul>
    <ul class="opt-panel">
        <li @click="savePhoneData(phoneData)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-baocun"></use>
            </svg>
            <span>保存</span>
        </li>
        <li>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fabu"></use>
            </svg>
            <span>发布</span>
        </li>
        <li>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yulan"></use>
            </svg>
            <span>预览</span>
        </li>
        <li>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shezhi"></use>
            </svg>
            <span>设置</span>
        </li>
    </ul>

</header>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
import * as api from '../../api/edit.js'
import '../../iconfont/iconfont.js'
import * as types from '../../const/item-types.js'
export default {
    computed: {
        ...mapGetters(['phoneData'])
    },
    methods: {
        ...mapActions(['addItem', 'panelShow', 'savePhoneData'])
    },
    data() {
        return {
			types : types
        }
    },
}

</script>
