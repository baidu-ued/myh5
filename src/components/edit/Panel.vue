<style scoped lang="scss">

</style>

<template>

<section>
<p>背景颜色</p>
<input type="color" v-model="aaa" @change="changeMain({'background' : aaa})"/>
{{aaa}}
</section>
</template>

<script>

import {
    mapGetters,
    mapActions
}
from 'vuex'
// import VueSort from 'vue-sort'
export default {
    computed: {

    },
    methods: {
		...mapActions(['changeMain'])
    },
    data: function() {
        return {
			aaa : '#ffffff'
        }
    }
}

</script>
