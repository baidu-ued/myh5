<style scoped lang="scss">

@import '../../css/global.scss';
.box-wrap {
    display: flex;
    justify-content: center;
    text-align: center;
    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .item {
            transition: 0.5s;
            width: 166px;
            height: 266px;
            position: relative;
            background: url("http://z.sina.com.cn/styles/images/bg.png");
            margin: 10px;
            .item-main {
                width: 160px;
                height: 260px;
                position: relative;
                .marker {
                    left: 0;
                    z-index: 11;
                    width: 130px;
                    height: 206px;
                    padding: 44px 15px 10px;
                    background: rgba(0, 0, 0, .6);
                    opacity: 0;
                    perspective: 200px;
                    transition: 0.5s;
                    position: absolute;
                    top: 0;
                    font-size: 12px;
                    .qr-code {
                        width: 110px;
                        height: 110px;
                        padding: 10px;
                        background: #fff;
                        transform: translate(5px, 5px) scale(.1);
                        opacity: 0;
                        transition: 0.3s ease-in;
                    }
                    .marker-text {
                        height: 30px;
                        line-height: 30px;
                        color: #fff;
                        font-size: 12px;
                    }
                    .option {
                        text-decoration: none;
                        color: #e6e6e6;
                        display: block;
                        text-indent: 28px;
                    }
                    .prev {
                        float: left;
                        background: url("http://z.sina.com.cn/styles/images/pre.png") no-repeat;
                    }
                    .prev:hover {
                        background: url("http://z.sina.com.cn/styles/images/pre1.png") no-repeat;
                        color: #ff5e5e;
                    }
                    .choose {
                        float: right;
                        background: url("http://z.sina.com.cn/styles/images/choose.png") no-repeat;
                    }
                    .choose:hover {
                        background: url("http://z.sina.com.cn/styles/images/choose1.png") no-repeat;
                        color: #ff5e5e;
                    }
                }
                .bg {
                    width: 100%;
                    height: 100%;
                }
            }
            .item-main:hover .marker {
                opacity: 1;
            }
            .item-main:hover .qr-code {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            .sitetitle {
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                overflow: hidden;
            }
        }
        .item:hover {
            transform: translate(-2px, -2px);
        }
    }
}

</style>

<template>

<section class="box-wrap">
    <ul class="list" id="aaa">
        <li class="item" v-for="i in list">
            <div class="item-main">
                <a href="#"><img class="bg" :src="i.bg" /></a>
                <div class="marker">
                    <img class="qr-code" src="http://z.sina.com.cn/s/qrcode/image?content=http://z.sina.com.cn/z/66987/&height=130&width=130" />
                    <p class="marker-text">手机扫描查看</p>
                    <div class="marker-options">
                        <a class="prev option" target="_blank" href="//z.sina.com.cn/z/68606/">预览</a>
                        <a class="choose option" href="/maker/?tempid=68606">选用</a>
                    </div>
                </div>
            </div>
            <div class="sitetitle">毕业季·我们不说再见</div>
        </li>
    </ul>
</section>

</template>

<script>

import $ from 'jQuery'
import {
    mapGetters,
    mapActions
}
from 'vuex'
export default {
    name: 'List',
    data() {
        return {}
    },
    computed: {...mapGetters(['list'])
    },
	mounted : function(){
		// new VueSort('.drag-wrapper', {
        //     onMouseUp: function(s) {
        //         // _this.list = s.sort(_this.list);
        //     }
        // })

	},
    methods: {
        ...mapActions(['changeType']),
            change: function() {

            }
    }
}

</script>
