<template>

<ul>
<li v-for="zender in zenders">
    <label><input type="radio" v-model="radio" name="radiozenders" :value="zender" @change="$emit('zenderChange', zender)">{{zender.naam}}</label>
</li>
</ul>

<h1>{{radio.naam}}</h1>


<button @click="volgende()">volgende radio</button>
<button @click="random()">random radio</button>



</template>

<script lang="ts">
import { defineComponent } from 'vue'

import type { Zender } from "../interfaces"

export default defineComponent({
    data() {
        return {
            zenders: [
                { naam: "Radio538", url: "https://25633.live.streamtheworld.com/RADIO538AAC.aac" , api: "" },
                { naam: "SkyRadio", url: "https://22343.live.streamtheworld.com/SKYRADIOAAC.aac" , api: "" },
                { naam: "Radio10", url: "https://25683.live.streamtheworld.com/RADIO10AAC.aac" , api: "" },
                { naam: "Veronica", url: "https://25693.live.streamtheworld.com/VERONICAAAC.aac" , api: "" },
                { naam: "Q-Music", url: "https://icecast-qmusicnl-cdp.triple-it.nl/Qmusic_nl_live_high.aac" , api: "" },
                { naam: "Radio 1", url: "https://icecast.omroep.nl/radio1-bb-mp3" , api: "" },
                { naam: "Radio 2", url: "https://icecast.omroep.nl/radio2-bb-mp3" , api: "" },
                { naam: "Sublime", url: "https://25323.live.streamtheworld.com/SUBLIMEAAC.aac" , api: "" },
                { naam: "SlamFM", url: "https://25533.live.streamtheworld.com/SLAM_MP3.mp3" , api: "" },
                { naam: "3FM", url: "https://icecast.omroep.nl/3fm-bb-mp3" , api: "" },
                { naam: "Radio 4", url: "https://icecast.omroep.nl/radio4-bb-mp3" , api: "" },
                { naam: "Radio 5", url: "https://icecast.omroep.nl/radio5-bb-mp3" , api: "" },
                { naam: "FunX", url: "https://icecast.omroep.nl/funx-sb-mp3" , api: "" },
                { naam: "100% NL", url: "https://25333.live.streamtheworld.com/100PNL_MP3.mp3" , api: "" },
                { naam: "KINK", url: "https://25353.live.streamtheworld.com/KINKAAC.aac" , api: "" },
                { naam: "Soul Radio", url: "https://25273.live.streamtheworld.com/SOULRADIOAAC.aac" , api: "" },
                { naam: "Arrow Classic Rock", url: "https://stream.player.arrow.nl/arrow", api: ""  },
                { naam: "classicnl", url: "https://22323.live.streamtheworld.com/CLASSICFMAAC.aac", api: ""  },
                { naam: "Studio040", url: "https://stream.studio040.nl/studio040.mp3", api: ""  },
                { naam: "StuBru", url: "https://25643.live.streamtheworld.com/STUDIO_BRUSSEL_128.mp3?dist=belgiefm", api: "" }
            ] as unknown as [Zender],
            radio: {} as Zender
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

ul {
    list-style: none;
    padding-left: 0;
}

</style>