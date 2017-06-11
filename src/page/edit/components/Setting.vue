<style scoped>

.main {
    position: absolute;
    width: 500px;
    height: 300px;
    margin: 0 auto;
    left: 50%;
    margin-left: -250px;
    top: 100px;
}

</style>

<template>

<div class="main" v-if="settingLayer">
	<p @click="changeSetLayer(false)">关闭</p>
    <div>
        <label>标题</label>
        <input type="text" :value="phoneSet.title" @input="changeSet({'title' : $event.target.value})" />
    </div>
    <div>
        <label>描述</label>
        <input type="text" :value="phoneSet.desc" @input="changeSet({'desc' : $event.target.value})" />
    </div>
    <div>
        <label>允许翻页</label>
        <input type="checkbox" :checked="phoneSet.allowPage" @change="changeSet({'allowPage' : $event.target.checked})" />
    </div>
</div>

</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
export default {
    computed: {
        ...mapGetters(['phoneData', 'phoneSet', 'settingLayer'])
    },
    methods: {
        ...mapActions(['changeSet', 'changeSetLayer'])
    }
}

</script>
