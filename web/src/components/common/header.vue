<style>

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

.create-panel {
    .list {
        .child-list {
            position: absolute;
            display: none;
            top: 50px;
            z-index: 999;
            background: #333;
            .item {
                display: flex;
                flex-direction: row;
            }
        }
    }
}

.create-panel,
.create-action {
    .list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 50px;
        .item {
            height: 40px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            padding: 5px 20px;
            color: #fff;
            cursor: pointer;
            .icon {
                font-size: 16px;
            }
            .text {
                font-size: 12px;
            }
        }
        .item:hover {
            >.icon,
            >.text {
                color: #ff5e5e;
            }
            .child-list {
                display: block;
            }
        }
    }
}

.create-action {}

</style>

<template>

	<header class="header">
	    <div class="logo-wrapper"><img class="logo"/></div>
	    <div class="create-panel">
	        <ul class="list">
				asdf
	        </ul>
	    </div>
	    <div class="create-action">
	        <ul class="list">
	          撒发的
	        </ul>
	    </div>

	</header>

</template>

<script>

export default {
    data: function() {
        return {

        }
    }
}

</script>
