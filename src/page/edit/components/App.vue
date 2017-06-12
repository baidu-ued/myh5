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
		<PanelPic v-show="panelStatus[types.PIC]"></PanelPic>
		<PanelQrcode v-if="panelStatus[types.QRCODE]"></PanelQrcode>
	</div>
</div>
</template>

<script>
import PanelPic from './panel/pic.vue'
import PanelQrcode from './panel/qrcode.vue'
import PublicHeader from '../../../public/components/Header.vue'
import Page from './Page.vue'
import Phone from './Phone.vue'
import Panel from './Panel.vue'
import Setting from './Setting.vue'
import * as types from '../tpl/types.js'
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
		...mapGetters(['panelStatus'])
	},
	mounted() {
		this.loadData();
	},
	data() {
		return {
			types: types
		}
	},
	components: {
		PublicHeader,
		Page,
		Phone,
		Panel,
		Setting,
		PanelPic,
		PanelQrcode
	}
}
</script>
