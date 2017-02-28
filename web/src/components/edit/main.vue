<style>



</style>

<template>

<div>
    <Header/>
    <div>
        <Page/>
        <Phone/>
        <Panel/>
    </div>
</div>

</template>

<script>

import Page from './page.vue'
import Panel from './panel.vue'
import Phone from './phone.vue'
export default {
    components: {
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
