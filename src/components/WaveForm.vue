<template>

<button @click="drawButton()">draw</button>
<canvas id="waveformcanvas"></canvas>
<!--{{ this.audioctx.sampleRate }} -->

</template>


<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    components: { },
    props: {
        audio: HTMLAudioElement,
        audioctx: AudioContext,
        rawoutput: AudioNode,
    },
    data() {
        return {
            canvas: {} as HTMLCanvasElement,
            canvasctx: {} as CanvasRenderingContext2D,
            width: 0,
            analyser: {} as AnalyserNode,
            bufferLength: 0 as number,
            dataArray: {} as Uint8Array,
            drawVisual: {} as number,
            mediarec: {} as MediaRecorder,
        }
    },
    computed: {
        console: () => console,
    },
    created() {
        window.addEventListener("resize", this.windowResizeHandler);
        
    },
    mounted() {
        this.canvas = document.querySelector("#waveformcanvas") as HTMLCanvasElement;
        this.canvasctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.width = window.innerWidth;

        this.canvas.width = this.width;

        this.draw();



        // const splitter = this.audioctx.createChannelSplitter(2);
        // const merger = this.audioctx.createChannelMerger(2);
        // track.connect(splitter).connect(merger, 0).connect(this.audioctx.destination);

        this.analyser = (this.audioctx as AudioContext).createAnalyser();
        this.analyser.fftSize = 4096;
        //analyser.smoothingTimeConstant = 0.2;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyser.getByteTimeDomainData(this.dataArray);

        const dest = (this.audioctx as AudioContext).createMediaStreamDestination();
        this.mediarec = new MediaRecorder(dest.stream);
        this.mediarec.ondataavailable = (evt) => {
            this.console.log(evt.data);
        }

        
        (this.rawoutput as AudioNode).connect(this.analyser).connect(dest);

        
        this.mediarec.start(1000);
        this.console.log(this.mediarec.state);


        var recorder: AudioWorkletNode;
        (this.audioctx as AudioContext).audioWorklet.addModule('recorder.js').then(() => {
            recorder = new AudioWorkletNode(this.audioctx as AudioContext, 'recorder');
            (this.analyser as AnalyserNode).connect(recorder);
        });



    },
    unmounted() {
        window.removeEventListener("resize", this.windowResizeHandler);
        
        cancelAnimationFrame(this.drawVisual);
        (this.rawoutput as AudioNode).disconnect(this.analyser);
        this.analyser.disconnect();
        this.mediarec.stop();

    },
    methods: {

        windowResizeHandler(event: UIEvent){
            this.width = window.innerWidth;
            this.canvas.width = this.width;
            this.draw();
        },

        draw() {

            let ddd = () => {
                this.dataArray.fill(0);
                this.analyser.getByteTimeDomainData(this.dataArray);

                //this.console.log(this.dataArray);
                //this.console.log(this.analyser);

                this.canvasctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                this.canvasctx.lineWidth = 2;
                this.canvasctx.strokeStyle = 'black';
                this.canvasctx.beginPath();
                            
                var sliceWidth =  this.canvas.width * 1.0 / this.bufferLength;
                var x = 0;

                for(var i = 0; i < this.bufferLength; i++) {

                    var v = this.dataArray[i] / 128.0;
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

                
                this.drawVisual = requestAnimationFrame(ddd);
            };

            this.drawVisual = requestAnimationFrame(ddd);

        },

        drawButton() {
            this.mediarec.stop();

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

