<template>

<div v-for="zender in zenders">
    <label><input type="radio" v-model="radio" name="radiozenders" :value="zender" @change="$emit('zenderChange', zender)">{{zender.naam}}</label>

</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            zenders: [
                { naam: "Radio538", url: "https://25633.live.streamtheworld.com/RADIO538AAC.aac" },
                { naam: "SkyRadio", url: "https://22343.live.streamtheworld.com/SKYRADIOAAC.aac" },
                { naam: "Radio10", url: "https://25683.live.streamtheworld.com/RADIO10AAC.aac" },
                { naam: "Veronica", url: "https://25693.live.streamtheworld.com/VERONICAAAC.aac" },
                { naam: "Q-Music", url: "https://23823.live.streamtheworld.com/QMUSICNL.mp3" },
                { naam: "Radio 1", url: "https://icecast.omroep.nl/radio1-bb-mp3" },
                { naam: "Radio 2", url: "https://icecast.omroep.nl/radio2-bb-mp3" },
                { naam: "Sublime", url: "https://25323.live.streamtheworld.com/SUBLIMEAAC.aac" },
                { naam: "SlamFM", url: "https://25533.live.streamtheworld.com/SLAM_MP3.mp3" },
                { naam: "3FM", url: "https://icecast.omroep.nl/3fm-bb-mp3" },
                { naam: "FunX", url: "https://icecast.omroep.nl/funx-sb-mp3" },
                { naam: "100% NL", url: "https://25333.live.streamtheworld.com/100PNL_MP3.mp3" },
                { naam: "KINK", url: "https://25353.live.streamtheworld.com/KINKAAC.aac" },
                { naam: "Radio 5", url: "https://icecast.omroep.nl/radio5-bb-mp3" },
                { naam: "Soul Radio", url: "https://25273.live.streamtheworld.com/SOULRADIOAAC.aac" },
                { naam: "Arrow Classic Roock", url: "https://stream.player.arrow.nl/arrow" }
            ],
            radio: {}
        }
    },
    emits: ['zenderChange'],
    methods: {
        volgende() {
            let index = this.zenders.indexOf(this.radio);
            this.radio = this.zenders[(index + 1) % this.zenders.length];
            this.$emit('zenderChange', this.radio);
        },
        random() {
            let index = Math.floor(Math.random() * this.zenders.length);
            this.radio = this.zenders[index];
            this.$emit('zenderChange', this.radio);
        }
    }
})
</script>

<style>

</style>