<template>

hoi
<RadioList @zenderChange="newZender" />

</template>

<script lang="ts">
import { defineComponent } from 'vue'

import RadioList from "./components/RadioList.vue"

export default defineComponent({
    components: { RadioList },
    methods: {
        newZender(zender) {
            alert(zender.naam + zender.url);
        }
    }
})
</script>

<style>

</style>