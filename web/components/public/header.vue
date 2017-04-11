<style scoped lang="scss">
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

header {
    background: #333;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
}

.logo-wrapper {
    .logo {
        width: 67px;
        height: 39px;
    }
}
</style>

<template>
<header class="header">
	<div class="logo-wrapper">
		<img class="logo"
						src="../../assets/logo.png" />

	</div>

</header>
</template>

<script>
export default {

}
</script>
