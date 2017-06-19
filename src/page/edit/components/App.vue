<style scoped lang="scss">

.main {
    height: 100%;
    .content {
        display: flex;
    }
    background: #4c4c4e;
}

</style>

<template>

<div class="main">
    <Public-Header></Public-Header>
    <div class="content">
        <Page></Page>
        <Phone></Phone>
        <Panel></Panel>
        <Setting></Setting>
        <PanelPic v-show="panelStatus[tplTypes.PIC]"></PanelPic>
        <PanelQrcode v-if="panelStatus[tplTypes.QRCODE]"></PanelQrcode>
		<PanelMusic v-if="panelStatus[tplTypes.MUSIC]"></PanelMusic>
		<PanelShape v-if="panelStatus[tplTypes.SHAPE]"></PanelShape> -->
		<!-- <PanelShape></PanelShape> -->
    </div>
</div>

</template>

<script>

import PanelPic from './panel/pic.vue'
import PanelQrcode from './panel/qrcode.vue'
import PanelMusic from './panel/music.vue'
import PanelShape from './panel/shape.vue'
import PublicHeader from '../../../public/components/Header.vue'
import Page from './Page.vue'
import Phone from './Phone.vue'
import Panel from './Panel.vue'
import Setting from './Setting.vue'
import {
    mapGetters,
    mapActions
}
from 'vuex'
export default {
    methods: {
        ...mapActions(['selectItem', 'loadData']),
    },
    computed: {
        ...mapGetters(['panelStatus', 'tplTypes'])
    },
    mounted() {
        this.loadData();
    },
    components: {
        PublicHeader,
        Page,
        Phone,
        Panel,
        Setting,
        PanelPic,
        PanelQrcode,
		PanelMusic,
		PanelShape
    }
}

</script>
