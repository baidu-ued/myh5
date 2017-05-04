<style>
html{
	overflow: hidden;
}
body{
	/*height:100%;*/
	/*position: relative;*/
}
</style>
<style scoped lang="scss">
.main{
	.content{
		display: flex;

	}
	background: #4c4c4e;

}


</style>

<template>

<div class="main">
    <Public-Header>
    </Public-Header>
    <div class="content" @mousedown="selectItem(-1)">
        <Page></Page>
        <Phone></Phone>
		<Panel></Panel>
    </div>
</div>

</template>

<script>

import '../../css/reset.css'
import PublicHeader from '../public/Header.vue'
import Page from './Page.vue'
import Phone from './Phone.vue'
import Panel from './Panel.vue'
import {
    mapGetters,
    mapActions
}
from 'vuex'
export default {
	methods : {
		...mapActions(['selectItem'])
	},
    components: {
        PublicHeader,
        Page,
		Phone,
		Panel
    }
}

</script>
