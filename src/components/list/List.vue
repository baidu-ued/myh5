
<template>
<ul class="list">
	<li class="item"
					v-for="i in list"> {{i.work_id}}{{i.type}}
		<a :href="'edit/' + i.work_id"></a>
		</li>
</ul>
</template>

<script>
import $ from 'jQuery'
import {
	mapGetters,
	mapActions
}
from 'vuex'
export default {
	name: 'List',
	data() {
		return {

			// list: []
		}
	},
	computed: { ...mapGetters(['list'])
	},
	methods: {
		...mapActions(['changeType']),
		change: function() {

		}
	}
}
</script>
<style scoped lang="scss">;
@import '../../css/global.scss';
.list {
    display: flex;
    flex-wrap: wrap;
    width: 800px;
	// height:2000px;
    .item {
        width: 120px;
        height: 160px;
        margin: 10px;
        border: 1px solid #000;
    }
    a {
        width: 50px;
        height: 50px;
        display: block;
        // background: red;
    }
}

.pagination {
    display: flex;
    .page-item {
        width: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid #000;
        margin: 0 10px;
        cursor: pointer;
    }
    .page-item.actived {
        background: red;
    }
    .page-item.disabled {
        background: blue;
        cursor: not-allowed;
    }
}
</style>
