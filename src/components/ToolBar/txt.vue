<style scoped lang="scss">

.item {
    display: flex;
    margin: 10px 0;
    span {
        width: 100px;
    }
}

</style>

<template>

<div>
    <div class="item">
        <span>内容</span>
        <input type="text" v-model="activeItem.content" />
    </div>
    <div class="item">
        <span>背景颜色</span>
        <input type="color" v-model="activeItem.style.background" />
    </div>
    <div class="item">
        <span>行高</span>
        <input type="range" step="0.1" max="3" min="1" v-model="lineHeight" @input="change('lineHeight', lineHeight)" />
		<span>{{lineHeight}}倍</span>
    </div>
	<div class="item">
        <span>字体大小</span>
        <input type="range" step="1" max="30" min="10" v-model="fontSize" @input="change('fontSize', fontSize)" />
		<span>{{fontSize}}px</span>
    </div>


    <p>{{activeItem}}</p>
</div>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
export default {
    props: {
        tabs: Number
    },
    created: function() {
        this.lineHeight = this.activeItem.style.lineHeight;
		this.fontSize = parseInt(this.activeItem.style.fontSize);
    },
    methods: {
        ...mapActions(['updateItem']),
            change(key, value) {

                this.activeItem.style[key] = value;
            }
    },
    computed: {
        ...mapGetters(['activePhone', 'activeItem']),
            // lineHeight : function() {
            // 	return parseInt(this.activeItem.style.lineHeight)
            // }
    },
    data() {
        return {
            a: 10
        }
    }
}

</script>
