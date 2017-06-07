<style scoped lang="scss">

;
@import '../../css/global.scss';
.box-wrap {
    width: $panel_width;
    border: 1px solid #ccc;
    height: calc(100% - $header_height);
    overflow: scroll;
    position: absolute;
    left: 0;
    top: $header_height;
    bottom: 0;
    .box {
        height: 2000px;
        li {}
        li.active {
            color: red;
        }
    }
}

</style>

<template>

<section class="box-wrap">
    <div class="box">
        <ul>
            <!-- <li :class="{ 'active' : type == i.ename}" @click="changeType(i.ename)" v-for="i in list">{{i.text}}</li> -->
        </ul>
    </div>

</section>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
export default {
    data() {
        return {
            list: [{
                text: '体育',
                ename: 'sports'
            }, {
                text: '新闻',
                ename: 'news'
            }]
        }
    },
    computed: {
        ...mapGetters(['type'])
    },
    methods: {...mapActions([])
    }
};

</script>
