<template>
<header>
	<div class="logo-wrap">
		<img src="http://z.sina.com.cn/styles/images/logo.png" />
	</div>
</header>
</template>

<script>
export default {
	data() {
		return {}
	},
}
</script>

<style scoped lang="scss">;
@import '../../css/global.scss';
header {
    height: $header_height;
    background: #333;
    .logo-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 200px;
    }
}
</style>
