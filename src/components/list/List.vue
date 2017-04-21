<style scoped lang="scss">

@import '../../css/global.scss';
.box-wrap {
	display: flex;
	justify-content: center;
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
            .item2 {
                width: 160px;
                height: 260px;
                position: relative;
                .marker {
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    display: none;
                    .qr-code {}
                }
                .bg {
                    width: 100%;
                    height: 100%;
                }
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
    <ul class="list">
        <li class="item" v-for="i in list">
            <div class="item2">
                <a href="#"><img class="bg" :src="i.bg" /></a>
                <div class="marker">
                    <img class="qr-code" src="http://z.sina.com.cn/s/qrcode/image?content=http://z.sina.com.cn/z/66987/&height=130&width=130" />
                </div>
            </div>
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
        return {
        }
    },
    computed: {...mapGetters(['list'])
    },
    methods: {
        ...mapActions(['changeType']),
            change: function() {

            }
    }
}

</script>
