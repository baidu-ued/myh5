<style scoped lang="scss">

.box-wrap {
    margin: 20px auto;
    // width: 100%;
    flex: 1;
    position: relative;
    .phone-wrap {
        width: 320px;
        // height: 520px;
        position: relative;
        margin: 0 auto;
        .phone-top {
            height: 43px;
            background: url("../images/phone_top1.png");
        }
        .phone-bottom {
            height: 50px;
            background: url("../images/phone_bottom1.png");
        }
        .phone {
            height: 486px;
            background: #fff;
            position: relative;
            .control-mask-show {
                outline: #007afc solid 1px;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
            .phone-item {
                position: absolute;
                left: 0;
                top: 0;
                -webkit-user-select: none;
                .phone-item-container {
                    overflow: hidden;
                    width: 100%;
                    position: relative;
                    height: 100%;
                }
                .border {}
                .ui-resizable-handle {
                    border: 1px solid #fff;
                    background-color: #0f6cd5;
                    border-radius: 50%;
                    box-shadow: 0 0 2px rgba(0, 0, 0, .2);
                    width: 10px;
                    height: 10px;
                    position: absolute;
                    font-size: 0.1px;
                    display: block;
                    -ms-touch-action: none;
                    touch-action: none;
                }
                .ui-resizable-nw {
                    cursor: nw-resize;
                    left: -5px;
                    top: -5px;
                }
                .ui-resizable-ne {
                    cursor: ne-resize;
                    right: -5px;
                    top: -5px;
                }
                .ui-resizable-sw {
                    cursor: sw-resize;
                    left: -5px;
                    bottom: -5px;
                }
                .ui-resizable-se {
                    cursor: se-resize;
                    right: -5px;
                    bottom: -5px;
                }
            }
        }
        .phone-left {
            position: absolute;
            width: 3px;
            left: -3px;
            height: 189px;
            top: 50px;
            background: url("../images/phone_left.png");
        }
    }
}

</style>

<template>
<section class="box-wrap" v-my-select @mousedown="cancelSelect">
    <div class="phone-wrap">
        <div class="phone-top"></div>
        <div class="phone" id="phone" :style="{background:currentPhone.main.background}">
            <div @dblclick="panelShow(currentItem.type)" v-if="i.if != false" :tabindex="currentItemId == index ? 0 : ''" @mousedown.stop="selectItem(index)" v-my-drag class="phone-item" :style="i.style" v-for="(i, index) in currentPhone.data">
                <div class="phone-item-container" :id="i.attr.id" v-html="i.content"></div>
                <div :class="{ 'control-mask-show' : isSelect(index)}" v-show="isSelect(index)">
                    <div v-my-changesize="{type : 'nw'}" class="ui-resizable-handle ui-resizable-nw"></div>
                    <div v-my-changesize="{type : 'ne'}" class="ui-resizable-handle ui-resizable-ne"></div>
                    <div v-my-changesize="{type : 'sw'}" class="ui-resizable-handle ui-resizable-sw"></div>
                    <div v-my-changesize="{type : 'se'}" class="ui-resizable-handle ui-resizable-se"></div>
                </div>
            </div>
        </div>
        <div class="phone-left"></div>
        <div class="phone-bottom"></div>
    </div>
    <div v-if="currentItemForList.length == 1" @mousedown.stop="" style="width:50px;font-size:12px;display:flex;flex-direction:column;height:100px;position:absolute;background:red;left:200px;top:30%;">
        <span @click="updateItemZIndex('++')">置顶</span>
        <span @click="updateItemZIndex('+1')">向上一级</span>
        <span @click="updateItemZIndex('-1')">向下一级</span>
        <span @click="updateItemZIndex('--')">置底</span>
    </div>
</section>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
import '../directive/drag.js'
import '../directive/changesize.js'
import '../directive/select.js'
import {
    isSelect
}
from '../util/index.js'
export default {
    methods: {
        ...mapActions(['updateStyle', 'cancelSelect', 'selectItem', 'delItem', 'panelShow']),
            isSelect: isSelect,
            /**
             * 修改元素层级
             * @param  ++ 置顶， +1 上移一位， -1 下移一位， -- 置底
             */
            updateItemZIndex(type) {
                const data = this.currentPhone.data;
                const nowIndex = this.currentItem.style['z-index'];
                let hasChange = false;
                let newIndex;
                if (data.length == 1) {
                    return;
                }
                for (let i = 0; i < data.length; i++) {
                    let item = data[i];
                    if (type == '++' && item.style['z-index'] > nowIndex) {
                        this.updateStyle({
                            index: i,
                            payload: {
                                'z-index': item.style['z-index'] - 1
                            }
                        })
                    } else if (type == '+1' && item.style['z-index'] == nowIndex + 1) {
                        this.updateStyle({
                            index: i,
                            payload: {
                                'z-index': nowIndex
                            }
                        });
                        hasChange = true;
                        break;
                    } else if (type == '-1' && item.style['z-index'] == nowIndex - 1) {
                        this.updateStyle({
                            index: i,
                            payload: {
                                'z-index': nowIndex
                            }
                        });
                        hasChange = true;
                        break;
                    } else if (type == '--' && item.style['z-index'] < nowIndex) {
                        this.updateStyle({
                            index: i,
                            payload: {
                                'z-index': item.style['z-index'] + 1
                            }
                        });
                    }
                };
                switch (type) {
                    case '++':
                        newIndex = data.length;
                        break;
                    case '+1':
                        newIndex = hasChange ? nowIndex + 1 : nowIndex;
                        break;
                    case '-1':
                        newIndex = hasChange ? nowIndex - 1 : nowIndex;
                        break;
                    case '--':
                        newIndex = 1;
                        break;
                };
                this.updateStyle({
                    index: this.currentItemId,
                    payload: {
                        'z-index': newIndex
                    }
                });
            }
    },
    computed: {
        ...mapGetters(['currentItemForList', 'tplTypes', 'currentPhone', 'currentItemId', 'currentItem'])
    },
}

</script>
