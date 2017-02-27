<style scoped lang="scss">



</style>

<template>

<div>
    <div v-if="tabs == 0">
        <p>背景颜色</p>
        <input type="color" :value="activePhone.main.background || '#ffffff'" @input="updateItem($event.target.value)" />
        <input type="text" :value="activePhone.main.background || '#ffffff'" @input="updateItem($event.target.value)" />
        <!-- <p>{{activePhone.main.background}}</p> -->
		<p>背景图片</p>
    </div>
    <div v-if="tabs == 1">

    </div>
</div>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
import Txt from './txt.vue'
export default {
    props: {
        tabs: Number
    },
    methods: {
        ...mapActions(['updateItem'])
    },
    computed: {
        ...mapGetters(['activePhone', 'activeIndex'])
    },
	components : {

	},
    data() {
        return {

        }
    }
}

</script>
