<style>
html {
	background: #57585d;
}
</style> <style scoped lang="scss">;
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
	computed : {
		...mapGetters(['type'])
	},
	created: function() {
		this.changeType(this.type)
	},
	methods: {
		...mapActions(['changeType']),
	},
	components: {
		PublicHeader,
		Panel,
		List,
		Pagination
	}
}
</script>
