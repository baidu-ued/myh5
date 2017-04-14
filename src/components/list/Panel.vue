<template>
<section class="box-wrap">
	<div class="box">
		<ul>
			<li @click="changeType('sports')">选项1</li>
			<li @click="changeType('news')">选项2</li>
		</ul>
	</div>

</section>
</template>

<script>
import {
	mapGetters,
	mapActions
}
from 'vuex'
export default {
	data() {
		return {}
	},
	methods: { ...mapActions(['changeType'])
	}
}
</script>

<style scoped lang="scss">;
@import '../../css/global.scss';
.box-wrap {
    width: $panel_width;
    border: 1px solid #ccc;
    height: calc(100% - $header_height);
    overflow: scroll;
    position: absolute;
    left: 0;
    top: $header_height;
    bottom: 0;
    .box {
        height: 2000px;
    }
}
</style>
