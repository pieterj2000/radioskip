<template>

<RadioList ref="radiolist" @zenderChange="newZender" />

<h1>{{zender.naam}}</h1>


<audio ref="audio" :src="zender.url" autoplay 
        @canplaythrough="skipMandatoryCommercial"></audio>

<button @click="this.$refs.radiolist.volgende()">volgende radio</button>
<button @click="skipMandatoryCommercial(true)">skip verplichte commercial begin stream</button>
<button @click="this.$refs.audio.pause()">pauze</button>
<button @click="this.$refs.audio.play()">play</button>


</template>

<script lang="ts">
import { defineComponent } from 'vue'

import RadioList from "./components/RadioList.vue"

export default defineComponent({
    components: { RadioList },
    data() {
        return {
            zender: {},
            skippedcommercial: false,
        }
    },
    computed: {
        console: () => console,
        setTimeout: () => setTimeout,
    },
    methods: {
        newZender(zender) {
            this.zender = zender;
            this.skippedcommercial = false;
        },

        skipMandatoryCommercial(event, manual = false) {
            if(!this.skippedcommercial || manual){
                setTimeout(() => this.$refs.audio.currentTime = 30, 1000);
                this.skippedcommercial = true;
            }
        }
    }
})
</script>

<style>

</style>