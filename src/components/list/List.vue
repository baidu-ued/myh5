<style scoped lang="scss">

@import '../../css/global.scss';
.sitelist {
    // display: flex;
    // flex-wrap: wrap;
    // height: auto;
    padding: 0 10px;
    overflow: scroll;
    .item {
        float: left;
        transition: 0.5s;
        width: 166px;
        height: 280px;
        position: relative;
        margin: 20px 18px 10px;
        .item-content {
            transition-duration: 0.5s;
            background: url(http://z.sina.com.cn/styles/images/bg.png) no-repeat;
            padding: 0 6px 6px 0;
            position: relative;
            width: 160px;
            height: 252px;
            display: block;
            img {
                width: 100%;
                height: 100%;
            }
            .marker {
                left: 0;
                z-index: 11;
                width: 130px;
                height: 198px;
                padding: 44px 15px 10px;
                background: rgba(0, 0, 0, .6);
                opacity: 0;
                perspective: 200px;
                transition: .5s;
                position: absolute;
                top: 0;
                img {
                    width: 110px;
                    height: 110px;
                    padding: 10px;
                    background: #fff;
                    transform: translate(5px, 5px) scale(.1);
                    opacity: 1;
                    transition: .3s ease-in;
                }
                p {
                    height: 30px;
                    line-height: 30px;
                    color: #fff;
                    padding-top: 10px;
                    font-size: 12px;
                    text-align: center;
                    font-family: Helvetica;
                }
                .a_wrap {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 12px;
                    a {
                        text-decoration: none;
                        color: #e6e6e6;
                        display: block;
                        text-indent: 28px;
                        font-size: 12px;
                        background: url(http://z.sina.com.cn/styles/images/pre.png) no-repeat;
                    }
                }
            }
        }
        .item-content:hover {
            .marker {
                opacity: 1;
                img {
                    transform: scale(1);
                }
            }
        }
        label {
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            overflow: hidden;
            display: block;
        }
    }
    .item-blank {
        .item-content {
            background: url(http://z.sina.com.cn/styles/images/add.png) center center no-repeat #f0f0f0;
            box-shadow: 3px 3px 5px rgba(0, 0, 0, .6);
            cursor: pointer;
            padding: 0;
        }
    }
    .item:hover {
        transform: translate(-2px, -2px);
    }
}

</style>

<template>

<ul class="sitelist" id="sitelist">
    <li class="item item-blank">
        <a class="item-content" @click="addPage"></a>
        <label>空白场景</label>
    </li>
    <li class="item" v-for="i in list">
        <a class="item-content" :href="'http://localhost:8080/edit/' + i.work_id">
            <img src="http://z.sina.com.cn/s/site/snap/76297/page/0.png" />
            <div class="marker">
                <img src="http://z.sina.com.cn/s/qrcode/image?content=http://z.sina.com.cn/z/75492/&height=130&width=130" />
                <p>手机扫描查看</p>
                <div class="a_wrap">
                    <a class="prev" target="_blank" href="//z.sina.com.cn/z/75492/">预览</a>
                    <a class="choose" href="/maker/?tempid=75492">选用</a>
                </div>
            </div>
        </a>
        <label>毕业季·我们不说再见</label>
    </li>
</ul>

</template>

<script>

import $ from 'jQuery'
import {
    mapGetters,
    mapActions
}
from 'vuex'
import Pullload from 'Pullload'
export default {
    name: 'List',
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['list'])
    },
    mounted: function() {
        new Pullload({
			container : '#sitelist',
            onScrollEnd: (pullload) => {
                this.loadMore((len) => {
                    if (len == 0) {
                        pullload.stop();
                    } else {
                        pullload.tick();
                    }
                });
            }
        })

        // console.log($('#sitelist'));

    },
    methods: {
        ...mapActions(['addPage', 'loadMore'])
    }
}

</script>
