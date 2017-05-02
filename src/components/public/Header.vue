<style scoped lang="scss">;
@import '../../css/global.scss';
header {
    height: $header_height;
    background: #333;
    color: #d5d5d5;
    display: flex;
    .logo-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 200px;
    }
}
</style>

<template>
<header>
	<div class="logo-wrap">
		<img src="http://z.sina.com.cn/styles/images/logo.png" />
	</div>
	<div class="panel">
		<ul>
			<li @click="addItem({type : 'txt'})">
				<svg class="icon"
								aria-hidden="true">
					<use xlink:href="#icon-tupian"></use>
					</svg>
			</li>
		</ul>
	</div>
</header>
</template>
<script>
import {
	mapGetters,
	mapActions
}
from 'vuex'
import '../../iconfont/iconfont.js'
export default {
	methods: {
		...mapActions(['addItem'])
	},
	data() {
		return {}
	},
}
</script>
