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
    <li><input type="checkbox" disabled checked>Werkend krijgen</li>
    <li><input type="checkbox" disabled>Huidige nummer met API van zenders</li>
    <li><input type="checkbox" disabled>de hele 'player' in een los component stoppen?</li>
    <li><input type="checkbox" disabled>Opmaak/css, radiologo's etc..</li>
    <li><input type="checkbox" disabled checked>Mediakeys (Volgende radio en pauze?)</li>
    <li><input type="checkbox" disabled>Mediakeys <a href="https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API">metadata toevoegen</a> (zender, huidige nummer en artiest?)</li>
    <li><input type="checkbox" disabled>Waveform van afgelopen x minuten met buffer die geanalyseerd wordt mooi canvas toevoegen</li>
    <li><input type="checkbox" disabled>Die fourieranalyse en daar dan mee trainen of er commercial is of niet</li>
    <li><input type="checkbox" disabled>resultaat van reclameanalyse toevoegen aan canvas</li>
    <li><input type="checkbox" disabled>volume opslaan zodat hij niet bij refresh weer reset</li>
    <li><input type="checkbox" disabled>manier van trainen toevoegen en opslag (localstorage?)</li>
    <li><input type="checkbox" disabled>toevoegen dat hij ook handelt automatisch (bijvoorbeeld popup met 3seconde delay)</li>
    <li><input type="checkbox" disabled>super fancy dat je op de mooie canvas met de waveform ook kan schuiven en kan luisteren en repeat en dergelijke</li>
    <li><input type="checkbox" disabled>oude trainwaarden inzien en wijzigen, of nieuwe toevoegen met bovenstaande functionaliteit</li>
    <li><input type="checkbox" disabled>misschien al die fancy meuk achter een vinkje doen zodat het geen performence kost als je niet gebruikt</li>
    <li><input type="checkbox" disabled>een 'add'/zoek op spotify knop  :)</li>
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
    mounted() {
        navigator.mediaSession.setActionHandler('play', () => {
            //this.$refs.audio.play();
            this.newZender(this.zender);

        });
        navigator.mediaSession.setActionHandler('pause', () => {
            this.$refs.audio.pause();
        });
        // navigator.mediaSession.setActionHandler('previoustrack',  () => {

        // });
        navigator.mediaSession.setActionHandler('nexttrack',  () => {
            this.$refs.radiolist.volgende();
        });
    },
    methods: {
        newZender(zender) {
            this.zender = zender;
            this.$refs.audio.load();
            this.skippedcommercial = false;

            navigator.mediaSession.metadata = new MediaMetadata({
                title: zender.naam,
                artist: "artist",
                album: "album"
            })

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