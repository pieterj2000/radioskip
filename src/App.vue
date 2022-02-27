<template>

<RadioList ref="radiolist" @zenderChange="newZender" />

<h1>{{zender.naam}}</h1>


<audio ref="audio" :src="zender.url" autoplay 
        @canplaythrough="skipMandatoryCommercial"></audio>

<button @click="this.$refs.radiolist.volgende()">volgende radio</button>
<button @click="this.$refs.radiolist.random()">random radio</button>
<button @click="skipMandatoryCommercial($event, true)">skip verplichte commercial begin stream</button>
<button @click="this.$refs.audio.pause()">pauze</button>
<button @click="this.$refs.audio.play()">play</button>
<button @click="newZender(this.zender)">skip naar live (reset)</button>

<input type="range" id="volume" name="volume" min="0" max="100" v-model="volume" @input="this.$refs.audio.volume = this.volume / 100.0">



<hr style="margin-top: 100px">
<em>Todo:</em>
<ul>
    <li>Huidige nummer met API van zenders</li>
    <li>de hele 'player' in een los component stoppen?</li>
    <li>Opmaak/css, radiologo's etc..</li>
    <li>Mediakeys (Volgende radio en pauze?)</li>
    <li>Waveform van afgelopen x minuten met buffer die geanalyseerd wordt mooi canvas toevoegen</li>
    <li>Die fourieranalyse en daar dan mee trainen of er commercial is of niet</li>
    <li>resultaat van reclameanalyse toevoegen aan canvas</li>
    <li>volume opslaan zodat hij niet bij refresh weer reset</li>
    <li>manier van trainen toevoegen en opslag (localstorage?)</li>
    <li>toevoegen dat hij ook handelt automatisch (bijvoorbeeld popup met 3seconde delay)</li>
    <li>super fancy dat je op de mooie canvas met de waveform ook kan schuiven en kan luisteren en repeat en dergelijke</li>
    <li>oude trainwaarden inzien en wijzigen, of nieuwe toevoegen met bovenstaande functionaliteit</li>
    <li>misschien al die fancy meuk achter een vinkje doen zodat het geen performence kost als je niet gebruikt</li>
</ul>

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
            volume: 100
        }
    },
    computed: {
        console: () => console,
        setTimeout: () => setTimeout,
    },
    methods: {
        newZender(zender) {
            this.zender = zender;
            this.$refs.audio.load();
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