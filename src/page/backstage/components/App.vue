<template>

<!--
	类型 当前类型，
-->
<div>
	<ul>
		<li @click="index = 0">用户管理</li>
		<li @click="index = 1">图片管理</li>

	</ul>

	<User v-if="index == 0"/>
	<Pic v-if="index == 1"/>
</div>

</template>

<script>

import Pic from './Pic.vue'
import User from './User.vue'
export default {
    name: 'App',
    components: {
		Pic,
        User
    },
	data(){
		return {
			index : 0
		}
	}
}

</script>
