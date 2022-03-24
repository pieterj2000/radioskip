<template>

<button @click="drawWF()">draw</button>
<canvas id="waveformcanvas"></canvas>
{{ this.audioctx.sampleRate }}

</template>


<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    components: { },
    props: {
        audio: HTMLAudioElement,
    },
    data() {
        return {
            canvas: {} as HTMLCanvasElement,
            canvasctx: {} as CanvasRenderingContext2D,
            width: 0,
            audioctx: new AudioContext(),

        }
    },
    computed: {
    },
    created() {
        window.addEventListener("resize", this.windowResizeHandler);
        
    },
    destroyed() {
        window.removeEventListener("resize", this.windowResizeHandler);
    },
    mounted() {
        this.canvas = document.querySelector("#waveformcanvas") as HTMLCanvasElement;
        this.canvasctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.width = window.innerWidth;

        this.canvas.width = this.width;

        this.draw();
    },
    methods: {
        windowResizeHandler(event: UIEvent){
            this.width = window.innerWidth;
            this.canvas.width = this.width;
            this.draw();
        },

        draw() {
            this.canvasctx.fillStyle = 'green';
            this.canvasctx.fillRect(10,10, 100, 40);
        },

        drawWF() {
            const track = this.audioctx.createMediaElementSource(this.audio as HTMLAudioElement);
            // const splitter = this.audioctx.createChannelSplitter(2);
            // const merger = this.audioctx.createChannelMerger(2);
            // track.connect(splitter).connect(merger, 0).connect(this.audioctx.destination);

            const analyser = this.audioctx.createAnalyser();
            analyser.fftSize = 256;
            //analyser.smoothingTimeConstant = 0.2;
            var bufferLength = analyser.frequencyBinCount;
            var dataArray = new Uint8Array(bufferLength);
            analyser.getByteTimeDomainData(dataArray);

            track.connect(analyser).connect(this.audioctx.destination);

            let ddd = () => {
                analyser.getByteFrequencyData(dataArray);

                this.canvasctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                this.canvasctx.lineWidth = 2;
                this.canvasctx.strokeStyle = 'black';
                this.canvasctx.beginPath();
                            
                var sliceWidth =  this.canvas.width * 1.0 / bufferLength;
                var x = 0;

                for(var i = 0; i < bufferLength; i++) {

                    var v = dataArray[i] / 128.0;
                    var y = v * this.canvas.height/2;

                    if(i === 0) {
                    this.canvasctx.moveTo(x, y);
                    } else {
                    this.canvasctx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }

                this.canvasctx.lineTo(this.canvas.width, this.canvas.height/2);
                this.canvasctx.stroke();

                
                const drawVisual = requestAnimationFrame(ddd);
            };

            requestAnimationFrame(ddd)

        }
    }
    
})



// drawWF() {
//             const track = this.audioctx.createMediaElementSource(this.audio as HTMLAudioElement);
//             // const splitter = this.audioctx.createChannelSplitter(2);
//             // const merger = this.audioctx.createChannelMerger(2);
//             // track.connect(splitter).connect(merger, 0).connect(this.audioctx.destination);

//             const analyser = this.audioctx.createAnalyser();
//             analyser.fftSize = 2048;
//             var bufferLength = analyser.frequencyBinCount;
//             var dataArray = new Uint8Array(bufferLength);
//             analyser.getByteTimeDomainData(dataArray);

//             track.connect(analyser).connect(this.audioctx.destination);

//             let ddd = () => {
//                 analyser.getByteTimeDomainData(dataArray);

//                 this.canvasctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

//                 this.canvasctx.lineWidth = 2;
//                 this.canvasctx.strokeStyle = 'black';
//                 this.canvasctx.beginPath();
                            
//                 var sliceWidth =  150 * 1.0 / bufferLength;
//                 var x = 0;

//                 for(var i = 0; i < bufferLength; i++) {

//                     var v = dataArray[i] / 128.0;
//                     var y = v * 150/2;

//                     if(i === 0) {
//                     this.canvasctx.moveTo(x, y);
//                     } else {
//                     this.canvasctx.lineTo(x, y);
//                     }

//                     x += sliceWidth;
//                 }

//                 this.canvasctx.lineTo(this.canvas.width, this.canvas.height/2);
//                 this.canvasctx.stroke();

                
//                 const drawVisual = requestAnimationFrame(ddd);
//             };

//             requestAnimationFrame(ddd)

//         }

</script>

<style scoped>
#waveformcanvas {
    width: 100%;
    height: 200px;
}

</style>

