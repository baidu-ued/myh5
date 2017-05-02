<style scoped lang="scss">

.box-wrap {
    margin: 20px auto;
    .phone-wrap {
        width: 320px;
        // height: 520px;
        position: relative;
        .phone-top {
            height: 43px;
            background: url("http://z.sina.com.cn/styles/images/phone_top1.png");
        }
        .phone-bottom {
            height: 50px;
            background: url("http://z.sina.com.cn/styles/images/phone_bottom1.png");
        }
        .phone {
            height: 520px;
            background: #fff;
			position: relative;
			.phone-item{
				position: absolute;
				left:0;
				top:0;
			}
        }
        .phone-left {
            position: absolute;
            width: 3px;
            left: -3px;
            height: 189px;
            top: 50px;
            background: url("http://z.sina.com.cn/styles/images/phone_left.png");
        }
    }
}

</style>

<template>

<section class="box-wrap">
    <div class="phone-wrap">
        <div class="phone-top"></div>
        <div class="phone" id="phone" :style="{background:currentPhone.main.background}">
            <div class="phone-item" :style="i.style" v-for="i in currentPhone.data">{{i.style}}</div>
        </div>
        <div class="phone-left"></div>
        <div class="phone-bottom"></div>
    </div>
</section>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
import '../../js/drag.js'
export default {
    methods: {
        // ...mapActions([])
    },

    data: function() {
        return {

        }
    },
    computed: {
        ...mapGetters(['currentPhone'])
    },
}

</script>
