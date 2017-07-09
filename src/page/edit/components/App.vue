<style scoped lang="scss">

.main {
    height: 100%;
    .content {
        display: flex;
    }
    background: #4c4c4e;
}
.vue-color__chrome{
	position: absolute;
	z-index: 9999;
	left:50%;
	top:100px;
}
</style>

<template>

<div class="main">
    <Public-Header></Public-Header>
	<!-- <div style="position:absolute;z-index:99999;width:50px;height:50px;left:30%;" :style="{background:colors}">{{colors}}</div> -->
    <div class="content">
        <Page></Page>
        <Phone></Phone>
        <Panel></Panel>
        <Setting></Setting>
        <PanelPic v-show="panelStatus[tplTypes.PIC]"></PanelPic>
        <PanelQrcode v-if="panelStatus[tplTypes.QRCODE]"></PanelQrcode>
        <PanelMusic v-if="panelStatus[tplTypes.MUSIC]"></PanelMusic>
        <PanelShape v-if="panelStatus[tplTypes.SHAPE]"></PanelShape>
        <!-- <PanelShape></PanelShape> -->
		<chrome-picker v-if="colorPicker.show" :value="colorPicker.color" @input="updateValue" />
    </div>
</div>

</template>

<script>

import PanelPic from './panel/pic.vue'
import PanelQrcode from './panel/qrcode.vue'
import PanelMusic from './panel/music.vue'
import PanelShape from './panel/shape.vue'
import { Chrome } from 'vue-color'
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
        ...mapActions(['colorPickerHide','selectItem', 'loadData', 'updateStyle']),
		updateValue({rgba}){
			var str = 'rgba(' + rgba['r'] + ',' + rgba['g'] + ',' + rgba['b'] + ',' + rgba['a'] + ')';
			this.updateStyle({ [this.colorPicker.attr] : str });
		}
    },
    computed: {
        ...mapGetters(['colorPicker', 'currentItem', 'panelStatus', 'tplTypes'])
    },
    mounted() {
        this.loadData();
    },
	watch : {
		currentItem(a, b){
			if($.isEmptyObject(a)){
				this.colorPickerHide();
			}
		}
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
        PanelShape,
		'chrome-picker': Chrome,
    }
}

</script>
