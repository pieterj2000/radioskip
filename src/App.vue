<template>

<RadioList ref="radiolist" @zenderChange="newZender" />


<audio ref="audio" :src="zender.url" autoplay
        @canplaythrough="skipMandatoryCommercial"></audio>

<button @click="skipMandatoryCommercial($event, true)">skip verplichte commercial begin stream</button>
<button @click="audio.pause()">pauze</button>
<button @click="audio.play()">play</button>
<button @click="newZender(zender)">skip naar live (reset)</button>

<input type="range" id="volume" name="volume" min="0" max="100" v-model="volume" @input="audio.volume = volume / 100.0">

<label><input type="checkbox" v-model="waveformcheck" />show waveform</label>
<WaveForm v-if="waveformcheck" />

<ToDo />

</template>

<script lang="ts">
import { defineComponent } from 'vue'

import RadioList from "./components/RadioList.vue"
import ToDo from "./components/ToDo.vue"
import WaveForm from "./components/WaveForm.vue"

import type { Zender } from "./interfaces"

export default defineComponent({
    components: { RadioList, ToDo, WaveForm },
    data() {
        return {
            zender: {} as Zender,
            skippedcommercial: false,
            volume: 100,
            waveformcheck: false,
            audio: {} as HTMLAudioElement
        }
    },
    computed: {
        console: () => console,
        setTimeout: () => setTimeout,
    },
    mounted() {
        navigator.mediaSession.setActionHandler('play', () => {
            //this.$refs.audio.play();
            this.newZender(this.zender);

        });
        navigator.mediaSession.setActionHandler('pause', () => {
            this.audio.pause();
        });
        // navigator.mediaSession.setActionHandler('previoustrack',  () => {

        // });
        navigator.mediaSession.setActionHandler('nexttrack',  () => {
            (this.$refs.radiolist as typeof RadioList).volgende();
        });
        this.audio = this.$refs.audio as HTMLAudioElement;

    },
    methods: {
        newZender(zender: Zender) {
            this.zender = zender;
            this.audio.load();
            this.skippedcommercial = false;

            navigator.mediaSession.metadata = new MediaMetadata({
                title: zender.naam,
                artist: "artist",
                album: "album"
            })

        },

        skipMandatoryCommercial(event: Event, manual = false) {
            if(!this.skippedcommercial || manual){
                setTimeout(() => this.audio.currentTime = 30, 1000);
                this.skippedcommercial = true;
            }
        }
    }
})
</script>

<style>

</style>