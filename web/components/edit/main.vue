<style>



</style>

<template>

<div>
    <Common-Header/>
    <!-- <div>
        <Page/>
        <Phone/>
        <Panel/>
    </div> -->
</div>

</template>

<script>
import CommonHeader from '../common/header.vue'
import Page from './page.vue'
import Panel from './panel.vue'
import Phone from './phone.vue'
export default {
    components: {
		CommonHeader,
        Page,
        Panel,
        Phone
    },
    data: function() {
        return {

        }
    }
}

</script>
