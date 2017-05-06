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
    <div class="content">
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
import * as api from '../../api/edit.js'
export default {
	methods : {
		...mapActions(['selectItem', 'changePhone'])
	},
	mounted : function(){
		var me = this;
		api.get('aaa', function(rs){
			console.log(rs);
			me.changePhone(rs.data.data);
		})
	},
    components: {
        PublicHeader,
        Page,
		Phone,
		Panel
    }
}

</script>
