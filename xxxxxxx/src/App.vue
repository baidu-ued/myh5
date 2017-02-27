<style>

body {
    -webkit-user-select: none;
    -webkit-font-smoothing: antialiased;
}

#app {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #514f53;
}

.xxx {
    width: 100%;
    height: 100%;
    background: #514f53;
    position: relative;
    background: url('./images/makerbg.jpg')
}

</style>

<template>

<div id="app">
    <TopBar></TopBar>
    <!-- <div class="xxx" @mousedown="selectItem(-1)"> -->
	<div class="xxx">
        <Page></Page>
        <!-- <div> -->
        <Phone></Phone>
        <!-- </div> -->
        <ToolBar></ToolBar>
    </div>
</div>

</template>

<script>

import {}
from './iconfont/iconfont.js'
import Page from './components/Page'
import Phone from './components/Phone'
import ToolBar from './components/ToolBar'
import TopBar from './components/TopBar'
import {
    mapGetters,
    mapActions
}
from 'vuex'

export default {
    name: 'app',
    computed: {
        ...mapGetters(['count'])
    },
    methods: {
        ...mapActions(['selectItem'])
    },
    data() {
        return {

        }
    },
    components: {

        Page,
        Phone,
        ToolBar,
        TopBar
    }
}

</script>
