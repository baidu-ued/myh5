<style scoped lang="scss">

.box-wrap {
    width: 260px;
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
        text-align: center;
        border-left: none;
    }
    .ooooo {
        padding: 0 20px 80px;
    }
    .item-box {
        display: flex;
        border-bottom: 1px solid #ccd5db;
        align-items: center;
        font-size: 12px;
        width: 100%;
        padding: 7px 0;
        label {
            width: 65px;
        }
        .item-box-control {
            // width: 100%;
            flex: 1;
            display: flex;
            justify-content: space-between;
            .control-range {
                width: 100px;
                background: #ccd5db;
                height: 20px;
                .control-range-child {
                    height: 100%;
                    background: #08a1ef;
                }
            }
            .control-number {
                text-indent: 10px;
                width: 46px;
                height: 18px;
                padding: 0;
                border: 1px solid #ccd5db;
                font-size: 12px;
            }
            .control-select {
                width: 153px;
                height: 18px;
            }
        }
    }
}

</style>

<template>

<section class="box-wrap">
    <ul class="panel-tabs">
        <li v-if="currentItemId == -1" class="tab-item active" data-i="0">页面设置</li>
        <li @click="selectPanel(index)" v-for="(i, index) in list" class="tab-item" :class="{ active : index == listIndex}" data-i="0">{{i.title}}</li>
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
    <div class="ooooo" v-if="currentItemId != -1">
        <!-- <div class="public-color-wrap">
            <p>文本</p>
            <textarea type="text" v-model="currentItem.content"></textarea>
        </div> -->
        <div class="item-box">
            <label>点击跳页</label>
            <input @input="updateItemEvent([ 'goto', $event.target.value])" type="text" />
        </div>
        <div class="item-box">
            <label>跳转链接</label>
            <input @input="updateItemEvent([ 'href' ,$event.target.value])" type="text" />
        </div>
        <div class="item-box">
            <label>动画</label>
            <div class="item-box-control">
                <select @input="updateStyle({ 'animation-name' : $event.currentTarget.value , 'animation-duration' : currentItem.style['animation-duration'] || '1s'})" :value="currentItem.style['animation-name'] || 'none'">
                    <option value="none">----无-----</option>
                    <option value="hide">隐藏</option>
                    <option value="flash">闪烁</option>
                    <option value="shake">摇动</option>
                    <option value="bounce">弹性</option>
                    <option value="tada">弹加摇动</option>
                    <option value="swing">摇摆（小）</option>
                    <option value="wobble">摇摆（大） </option>
                    <option value="pulse">脉冲放大</option>
                </select>
            </div>
        </div>
        <div class="item-box">
            <label>播放时间</label>
            <div class="item-box-control">
                <input type="number" @input="updateStyle({ 'animation-duration' : $event.target.value + 's'})" :value="parseFloat(currentItem.style['animation-duration']) || 1" step="0.1" max="5" min="0">
            </div>
            <label>延迟</label>
            <div class="item-box-control">
                <input type="number" @input="updateStyle({ 'animation-delay' : $event.target.value + 's'})" :value="parseFloat(currentItem.style['animation-delay']) || 0" step="0.1" max="5" min="0">
            </div>
            <label>播放次数</label>
            <div class="item-box-control">
                <input type="number" @input="updateStyle({ 'animation-iteration-count' : $event.target.value})" :value="parseInt(currentItem.style['animation-iteration-count']) || 1" step="1" max="10" min="1">
            </div>
        </div>
        <div class="item-box">
            <label @click="reloadAni(currentItemId)">重新播放</label>
            <label @click="reloadAni">播放当页</label>
        </div>
        <div class="item-box">
            <label>透明度</label>
            <div class="item-box-control">
                <div class="control-range" @click="updateStyle({ 'opacity' : $event.offsetX / 100 })">
                    <div class="control-range-child" :style="{width: (currentItem.style.opacity || 1) * 100 + '%'}"></div>
                </div>
                <input class="control-number" type="number" @input="updateStyle({ 'opacity' : $event.target.value / 100 })" :value="Math.round((currentItem.style.opacity || 1) * 100)" step="1" max="100" min="0">
            </div>
        </div>
        <div class="item-box">
            <label>行高</label>
            <div class="item-box-control">
                <div class="control-range" @click="updateStyle({ 'line-height' : ($event.offsetX / 100 * 3).toFixed(1) })">
                    <div class="control-range-child" :style="{width: (currentItem.style['line-height'] || parseInt(items.css('line-height'))/parseInt(items.css('font-size'))) * 100 / 3 + '%'}"></div>
                </div>
                <input class="control-number" type="number" @input="updateStyle({ 'line-height' : $event.target.value })" :value="currentItem.style['line-height'] || parseInt(items.css('line-height'))/parseInt(items.css('font-size'))" step="0.1" max="3" min="0">
            </div>
        </div>
        <p>边框样式</p>
        <div class="item-box">
            <label>尺寸</label>
            <div class="item-box-control">
                <div class="control-range" @click="updateStyle({ 'border-width' : ($event.offsetX / 100 * 20).toFixed(0) + 'px' ,'border-style' : currentItem.style['border-style'] || 'solid'} )">
                    <div class="control-range-child" :style="{width: (parseInt(currentItem.style['border-width']) || 0) * 100 / 20 + '%'}"></div>
                </div>
                <input class="control-number" type="number" @input="updateStyle({ 'border-width' : $event.target.value + 'px' })" :value="parseInt(currentItem.style['border-width']) || 0" step="1" max="20" min="0">
            </div>
        </div>
        <div class="item-box">
            <label>样式</label>
            <div class="item-box-control">
                <select class="control-select" @input="updateStyle({ 'border-style' : $event.currentTarget.value })" :value="currentItem.style['border-style'] || 'solid'">
                    <option value="none">----无-----</option>
                    <option value="solid">直线</option>
                    <option value="dashed">破折线</option>
                    <option value="dotted">点状线</option>
                    <option value="double">双划线</option>
                    <option value="groove">3D凹槽</option>
                    <option value="ridge">3D垄状</option>
                    <option value="inset">3D内嵌</option>
                    <option value="outset">3D外嵌</option>
                </select>
            </div>
        </div>
        <div class="item-box">
            <label>旋转</label>
            <div class="item-box-control">
                <div class="control-range" @click="updateStyle({ 'transform' : 'rotate(' + Math.round($event.offsetX / 100 * 365) +'deg)'} )">
                    <div class="control-range-child" :style="{width: transformRotate * 100 / 365 + '%'}"></div>
                </div>
                <input class="control-number" type="number" @input="updateStyle({ 'transform' : 'rotate(' + $event.currentTarget.value +'deg)' })" :value="transformRotate" step="1" max="359" min="0">
            </div>
        </div>
        <div class="public-color-wrap">
            <label>文字颜色</label>
            <div data-type="color" @click="colorPickerShow({ color : currentItem.style['color'] || '#666', attr : 'color'})" style="position:absolute;z-index:99999;width:50px;height:20px;left:30%;" :style="{background:currentItem.style.color}"></div>
        </div>
        <div class="public-color-wrap">
            <p>背景颜色</p>
            <div @click="colorPickerShow({ color : currentItem.style['background'] || '#666', attr : 'background'})" style="position:absolute;z-index:99999;width:50px;height:20px;left:30%;" :style="{background:currentItem.style.background}"></div>
        </div>
        <div class="public-color-wrap">
            <p>边框颜色</p>
            <div @click="colorPickerShow({ color : currentItem.style['border-color'] || '#666', attr : 'border-color'})" style="position:absolute;z-index:99999;width:50px;height:20px;left:30%;" :style="{background:currentItem.style['border-color']}"></div>
        </div>
        <div class="public-color-wrap">
            <p>文字大小</p>
            <input class="public-text-input" type="number" :value="parseInt(currentItem.style.fontSize) || parseInt(items.css('fontSize'))" @input="updateStyle({ 'fontSize' : $event.target.value + 'px'})">px
        </div>

        <div class="public-color-wrap">
            <button @click="updateStyle({ 'fontWeight' : items.css('fontWeight') == 'bold' ? 'normal' : 'bold'})">加粗</button>
        </div>
        <div class="public-color-wrap">
            <button @click="updateStyle({ 'fontStyle' : items.css('fontStyle') == 'italic' ? 'normal' : 'italic'})">倾斜</button>
        </div>

        <div class="public-color-wrap">
            <p>宽度</p>
            <input class="public-text-input" type="number" :value="parseInt(currentItem.style.width) || parseInt(items.css('width'))" @input="updateStyle({ 'width' : $event.target.value + 'px'})">px
        </div>
        <div class="public-color-wrap">
            <p>高度</p>
            <input class="public-text-input" type="number" :value="parseInt(currentItem.style.height) || parseInt(items.css('height'))" @input="updateStyle({ 'height' : $event.target.value + 'px'})">px
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
import $ from 'jQuery'
import tpl from '../tpl/tpl.js'
import * as types from '../tpl/types.js'
import {
    isSelected
}
from '../util/index.js'

export default {
    computed: {
        ...mapGetters(['currentPhone', 'currentItem', 'currentItemId']),
            items: function() {
                return $('#' + this.currentItem.attr.id)
            },
            transformRotate: function() {
                if (!this.currentItem.style.transform) {
                    return 0
                } else if (!this.currentItem.style.transform.match(/rotate\((\d+)deg\)/)) {
                    return 0;
                } else {
                    return this.currentItem.style.transform.match(/rotate\((\d+)deg\)/)[1];
                }
            },

    },
    methods: {
        ...mapActions(['colorPickerShow', 'updateItemEvent', 'changeMain', 'updateStyle', 'reloadAni']),
            isSelected: isSelected,
            selectPanel: function(index) {
                this.listIndex = index;
            }
    },
    data: function() {
        return {
            list: [{
                title: '常规',
                except: []
            }, {
                title: '动画',
                except: [types.TXT]
            }, {
                title: '事件',
                except: []
            }],
            listIndex: 0,
            backgroundColor: ["#002939", "#001445", "#0e002d", "#22002f", "#2d0515", "#490000", "#471400", "#452700", "#432f00", "#535000", "#3e4505", "#1d300d", "#003c52", "#001f67", "#140041", "#340047", "#430a1f", "#6e0500", "#671d00", "#663900", "#644600", "#7a7500", "#5c650a", "#2b4714", "#005a7c", "#002d99", "#200063", "#4d0069", "#640e2f", "#a40800", "#9b2c01", "#975500", "#956900", "#b7b100", "#89980e", "#3f691e", "#0079a5", "#003dcc", "#290082", "#66008d", "#86133e", "#d90b00", "#ce3b00", "#c97100", "#c78d00", "#f3eb00", "#b7ca14", "#558e28", "#0091ce", "#0044fe", "#3b00a4", "#8500af", "#a8184b", "#ff2712", "#ff5308", "#fd9a00", "#fcbd00", "#ffff33", "#d1eb2b", "#66b132", "#00bafb", "#2e6ffd", "#4a00e6", "#ae00f0", "#dd2067", "#fe4940", "#fe7038", "#fda531", "#fdc131", "#fff959", "#deef53", "#86cd4d", "#47ccfc", "#6293fe", "#722cfd", "#c632fd", "#e6578d", "#ff766f", "#fe936a", "#febb64", "#fed164", "#fffa83", "#e6f37d", "#a3d979", "#84ddfd", "#98b7fe", "#a072fd", "#da77fe", "#ef8fb3", "#ffa49f", "#ffb79b", "#fed198", "#fedf98", "#fffcab", "#eff7a9", "#c2e5a6", "#c0edfe", "#cadbfe", "#cfbbfe", "#ecbafe", "#f6c7d9", "#fed1cf", "#ffdbcd", "#ffe8cb", "#ffefcb", "#fefdd5", "#f6fad3", "#d9eaca", "#edfaff", "#f0f5ff", "#f1ecff", "#faecff", "#fdeff4", "#fff2f1", "#fff5f1", "#fff8f0", "#fffaf0", "#fffef3", "#fdfef3", "#f7fcf3", "#ffffff", "#e6e6e6", "#cdcdcd", "#b3b3b3", "#9a9a9a", "#808080", "#676767", "#4d4d4d", "#343434", "#1a1a1a", "#000000", "transparent"]
        }
    }


}

</script>
