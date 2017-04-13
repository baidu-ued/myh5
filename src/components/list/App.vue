<template>
<List/>
</template>

<script>
import List from './List.vue'
export default {
	name: 'hello',
	data() {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	},
	components : {
		List
	}
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
