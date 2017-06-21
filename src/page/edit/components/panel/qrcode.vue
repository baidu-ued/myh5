<style scoped lang="scss">

.modal-dialog {
	z-index: 999;
    user-select: none;
    width: 500px;
    background: #f7f7f7;
    position: absolute;
    left: calc(50% - 250px);
    top: 80px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    border-radius: 6px;
    overflow: hidden;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 17px 5px 17px 20px;
        border-bottom: 1px solid #ccd5db;
        h4 {
            font-size: 18px;
            line-height: 27px;
            font-weight: bold;
            color: #76838f;
        }
        .close {
            font-size: 20px;
            font-weight: 700;
            color: #c6c6c6;
            padding: 0 15px;
        }
        .close:hover {
            color: #7c7c7c;
        }
    }
    .main {
        position: relative;
        height: calc(100% - 65px);
        display: flex;
        min-height: 200px;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        .modal-footer {
            align-self: flex-end;
            padding: 20px;
            .modal-cancle {
                margin-right: 20px;
                color: #76838f;
                cursor: pointer;
                padding: 7px 12px;
                line-height: 1.42857143;
                font-size: 14px;
            }
            .modal-cancle:hover {
                color: #08a1ef;
            }
        }
        .btn-primary {
            display: inline-block;
            margin-bottom: 0;
            font-weight: 400;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            border: 1px solid transparent;
            white-space: nowrap;
            padding: 7px 12px;
            font-size: 14px;
            line-height: 1.42857143;
            border-radius: 3px;
            color: #fff;
            background-color: #44cb83;
        }
        .btn-primary:hover {
            color: #fff;
            background-color: #8cdfb3;
        }
        .text {
            display: flex;
            text-align: right;
            align-items: center;
            margin-left: -150px;
            padding-top: 50px;
            label {
                width: 100px;
                display: block;
                font-size: 12px;
                color: #76838f;
            }
            .form-input {
                margin-left: 12px;
                input {
                    width: 260px;
                    height: 35px;
                    text-indent: 12px;
                }
            }
        }
    }
}

</style>

<template>

<!--
	title
	网址
	确定
	使用默认地址
-->
<section id="pic-layer-box" class="modal-dialog">
    <div class="header">
        <h4>二维码</h4>
        <a href="javascript:void(0);" class="close" @click="panelHide(tplTypes.QRCODE)">x</a>
    </div>
    <div class="main">
        <div class="text">
            <label>网址：</label>
            <div class="form-input">
                <input ref="input" :value="currentHref" placeholder="请输入网址,比如: https://www.baidu.com/" type="text" />
            </div>
        </div>
        <div class="modal-footer">
            <a class="modal-cancle" @click="panelHide(tplTypes.QRCODE)">取消</a>
            <a class="btn btn-primary" @click="confirm()">确定</a>
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
import tpl from '../../tpl/tpl.js'
import { isSelected } from '../../util/index.js'

export default {
    computed: {
		...mapGetters(['currentItem', 'currentItemId', 'tplTypes']),
        currentPanel() {
            return this.panel.list[this.panel.index]
        },
		currentHref(){
			return this.currentItem && this.currentItem.attr && this.currentItem.attr.href || this.url
		}
    },
    data() {
        return {
            url: location.href,
        }
    },
    methods: {
        ...mapActions(['addItem', 'panelHide', 'changeContent', 'changeAttr']),
            confirm: async function() {
                const newItem = await tpl.qrcode({
                    url: this.$refs.input.value
                });
				if(isSelected()){
					this.changeAttr({'href' : this.$refs.input.value})
	                this.changeContent(newItem.content);
				}else{
					this.addItem({
						type : this.tplTypes.QRCODE,
						url  : this.$refs.input.value
					})
				}
				this.panelHide(this.tplTypes.QRCODE)
            }
    }
}

</script>
