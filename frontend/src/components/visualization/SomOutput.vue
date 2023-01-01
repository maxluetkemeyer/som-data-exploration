<script lang="ts" setup>
import { store } from '@/logic/store';
import chroma from 'chroma-js';
import HexSom from './hexagon/HexSom.vue';
import RectSom from './rectangular/RectSom.vue';
import VizControlls from './VizControlls.vue';
import Legend from "./Legend.vue"
import InfoBar from './InfoBar.vue';
</script>

<template>
    <div id="somOutput" class="somOutput">
        <div class="somOutputVisualization">
            <RectSom v-if="store.som.settings.topology === 'rectangular'"
                :somMap="store.som.result.distance_map"
                :winMap="store.som.result.win_map"
                :colorScale="store.som.umatrixColorScale"
                containerId="canvasContainer"
                :key="'rect' + store.som.displayInstancesPerNeuron" />
            <HexSom v-else :somMap="store.som.result.distance_map"
                :winMap="store.som.result.win_map"
                :colorScale="store.som.umatrixColorScale"
                containerId="canvasContainer"
                :key="'hex' + store.som.displayInstancesPerNeuron" />

            <Legend :minMaxColorScale="minMaxColorScale" vizType="umatrix"/>
        </div>


        <InfoBar />
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            minMaxColorScale: chroma.scale(["white", "black"]).mode("lab")
        };
    },

    mounted() {
        document.getElementById("somOutput")?.addEventListener("contextmenu", (e) => e.preventDefault());
    },
    components: { VizControlls, InfoBar }
}
</script>

<style scoped>
.somOutput {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
}

.somOutputVisualization {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
</style>