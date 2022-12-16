<script lang="ts" setup>
import { store } from '@/logic/store';
import chroma from 'chroma-js';
import HexSom from './hexagon/HexSom.vue';
import RectSom from './rectangular/RectSom.vue';
</script>

<template>
    <div id="somOutput" class="somOutput">
        <input v-model="store.som.colorManipulator" type="range"
            class="form-range" min="-1" max="1" step="0.001">
        <input v-model="store.som.colorManipulator" type="range"
            class="form-range" min="-1" max="1" step="0.001">

        <RectSom v-if="store.som.settings.topology === 'rectangular'"
            :somMap="store.som.result.distance_map"
            :winMap="store.som.result.win_map" :showWinMap="true"
            :colorScale="colorScale" containerId="canvasContainer" />
        <HexSom v-else :somMap="store.som.result.distance_map"
            :winMap="store.som.result.win_map" :showWinMap="true"
            :colorScale="colorScale" containerId="canvasContainer" />

        <div class="input-group">
            <span class="input-group-text">Quantization Error</span>
            <input v-model="store.som.result.quantization_error" type="number"
                class="form-control" placeholder="Quantization Error"
                aria-label="Quantization Error" disabled>
            <span class="input-group-text">Topographic Error</span>
            <input v-model="store.som.result.topographic_error" type="number"
                class="form-control" placeholder="Topographic Error"
                aria-label="Topographic Error" disabled>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            colorScale: chroma.scale(["#fafafa", "grey"]).mode("lab")
        }
    },
    mounted() {
        document.getElementById("somOutput")?.addEventListener("contextmenu", (e) => e.preventDefault())
    }
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

.canvasContainer {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    /* align-items: center; */
}
</style>