<style>
html {
	background: #57585d;
	/*height: 100%;*/
	overflow: hidden;

}
body{
	font-size: 12px;
}
</style>
<style scoped lang="scss">
@import '../../css/global.scss';
.main {
    display: flex;
    .content {
        position: absolute;
        left: $panel_width;
        top: $header_height;
        right: 0;
        bottom: 0;
        overflow: scroll;
        display: flex;
        flex-direction: column;
    }
}
</style>

<template>
<div>
	<PublicHeader/>
	<div class="main">

		<Panel></Panel>
		<div class="content">
			<div @click="addPage">添加一页</div>
			<List></List>
			<Pagination></Pagination>
		</div>


	</div>
</div>
</template>

<script>
import '../../css/reset.css'
import PublicHeader from '../public/Header.vue'
import Panel from './Panel.vue'
import List from './List.vue'
import Pagination from './Pagination.vue'
// import pullload from 'pullload'
import {
	mapGetters,
	mapActions
}
from 'vuex'
export default {
	name: 'App',
	data() {
		return {}
	},
	computed: {
		...mapGetters(['type', 'page'])
	},
	created: function() {
		this.changeType(this.type)
	},
	methods: {
		...mapActions(['changeType', 'changePage', 'addPage']),
	},
	components: {
		PublicHeader,
		Panel,
		List,
		Pagination
	}
}
</script>
