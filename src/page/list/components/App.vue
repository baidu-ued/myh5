<style scoped>
 .main {
 	display: flex;
 }

 .content {
 	position: absolute;
 	left: 200px;
 	top: 50px;
 	right: 0;
 	bottom: 0;
 	overflow: scroll;
 	display: flex;
 	flex-direction: column;
 }
</style>

<template>
<div>
	<PublicHeader page="list"/>
	<div class="main">

		<!-- <Panel></Panel> -->
		<div class="content">
			<List></List>
		</div>


	</div>
</div>
</template>

<script>
import '../../../public/iconfont/iconfont.js'

import PublicHeader from '../../../public/components/Header.vue'
// import Panel from './Panel.vue'
import List from './List.vue'
import Pagination from './Pagination.vue'
import {
	mapGetters,
	mapActions
}
from 'vuex'
export default {
	name: 'App',
	computed: {
		...mapGetters(['page'])
	},
	mounted: function() {
		this.loadMore();
	},
	methods: {
		...mapActions(['loadMore']),
	},
	components: {
		PublicHeader,
		// Panel,
		List,
		Pagination
	}
}
</script>
