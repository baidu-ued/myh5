<style scoped lang="scss">

.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

header {
    background: #333;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
}

.logo-wrapper {
    .logo {
        width: 67px;
        height: 39px;
    }
}

.create-panel {
    .list {
        .child-list {
            position: absolute;
            display: none;
            top: 50px;
            z-index: 999;
            background: #333;
            .item {
                display: flex;
                flex-direction: row;
            }
        }
    }
}

.create-panel,
.create-action {
    .list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 50px;
        .item {
            height: 40px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            padding: 5px 20px;
            color: #fff;
            cursor: pointer;
            .icon {
                font-size: 16px;
            }
            .text {
                font-size: 12px;
            }
        }
        .item:hover {
            >.icon,
            >.text {
                color: #ff5e5e;
            }
            .child-list {
                display: block;
            }
        }
    }
}

.create-action {}

</style>

<template>

<header class="header">
    <div class="logo-wrapper"><img class="logo" src="../images/logo.png" /></div>
    <div class="create-panel">
        <ul class="list">
            <li class="item" v-for="i in panelList" @click="_addItem(i.type)">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="'#icon-' + i.icon"></use>
                </svg>
                <span class="text">{{i.name}}</span>
                <ul class="child-list">
                    <li class="item" v-for="j in i.data" @click="_addItem(j.type)">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="'#icon-' + j.icon"></use>
                        </svg>
                        <span class="text">{{j.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="create-action">
        <ul class="list">
            <li class="item" v-for="i in actionList">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="'#icon-' + i.icon"></use>
                </svg>
                <span class="text">{{i.name}}</span>
            </li>
        </ul>
    </div>

</header>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
import * as types from '../tpl/tpl-types.js'
import $ from 'jQuery'
export default {
    methods: {
        ...mapActions(['addItem', 'selectItem']),
            _addItem(type) {
                if (type) {
                    this.addItem(type);
                    this.selectItem(this.activePhone.data.length - 1);
					// setTimeout(function(){
					// 	$('#n_10').find('.inner').qrcode({
					// 		// render : 'table',
					// 		width : 200,
					// 		height : 200,
					// 		text : 'https://www.baidu.com/'
					// 	})
					// }, 0)

                }
            }
    },
    computed: {
        ...mapGetters(['activePhone'])
    },
    data() {
        return {
            types: types,
            panelList: [{
                name: "文本",
                icon: "text",
                data: [{
                    name: '文本',
                    icon: 'text',
                    type: "txt"
                }, {
                    name: '富文本',
                    icon: 'text'
                }]
            }, {
                name: "图片",
                icon: "tupian"
            }, {
                name: "交互",
                icon: "73",
                data: [{
                    name: '表单',
                    icon: 'text'
                }, {
                    name: '富文本',
                    icon: 'text'
                }]
            }, {
                name: "二维码",
                icon: "73",
				type: "qrcode"
            }, {
                name: "文本",
                icon: "73"
            }],


            actionList: [{
                name: "设置",
                icon: 'shezhi'
            }, {
                name: "预览",
                icon: 'yulan'
            }, {
                name: "保存",
                icon: '73'
            }, {
                name: "发布",
                icon: 'fabu'
            }]
        }
    }
}

</script>
