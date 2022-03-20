<template>


<canvas id="waveformcanvas"></canvas>


</template>


<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    components: { },
    data() {
        return {
            canvas: {} as HTMLCanvasElement,
            canvasctx: {} as CanvasRenderingContext2D,
            width: 0
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
        }
    }

})


</script>

<style scoped>
#waveformcanvas {
    width: 100%;
    height: 100px;
}

</style>