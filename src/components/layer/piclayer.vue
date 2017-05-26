<style scoped lang="scss">

.layer-box {
    width: 968px;
    height: 582px;
    background: #f7f7f7;
    position: absolute;
    left: calc(50% - 484px);
    top: 100px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    border-radius: 6px;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 17px 20px;
        h4 {
            font-size: 18px;
            font-weight: bold;
            color: #76838f;
        }
    }
	.container{
		.list{
			display: flex;
			flex-direction: column;
		}
	}
}

</style>

<template>

<section class="layer-box">
    <div class="header">
        <h4>素材库</h4>
        <div>x</div>
    </div>
    <div class="container">
        <ul class="list">
			<li>图片库</li>
			<li>我的上传</li>
			<li>最近使用</li>
			<li>上传</li>
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

}

</script>
