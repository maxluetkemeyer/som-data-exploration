<script lang="ts" setup>
import { store } from '@/logic/store';
import chroma from 'chroma-js';
import HexSom from './hexagon/HexSom.vue';
import RectSom from './rectangular/RectSom.vue';


</script>

<template>
    <div id="somWeightMaps" class="somWeightMaps">
        <input v-model="store.som.colorManipulator" type="range"
            class="form-range" min="-1" max="1" step="0.001">

        <div class="weightMapsContainer">
            <div v-for="(item, index) in store.som.result.weights"
                class="weight_map">
                <p>{{ Object.keys(store.data[0])[index] }}</p>
                <RectSom v-if="store.som.settings.topology === 'rectangular'"
                    :somMap="item" :winMap="store.som.result.win_map"
                    :showWinMap="false" :containerId="'weightMap' + index"
                    :colorScale="colorScale" :onSelectedCb="onSelectedCb"
                    :key="('weightMapRect' + index + keyCounter)"
                    class="canvasContainer" :style="sizeClass" />
                <HexSom v-else :somMap="item" :winMap="store.som.result.win_map"
                    :showWinMap="false" :containerId="'weightMap' + index"
                    :colorScale="colorScale" :onSelectedCb="onSelectedCb"
                    :key="('weightMapHex' + index + keyCounter)"
                    class="canvasContainer" :style="sizeClass" />
            </div>
        </div>



    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            keyCounter: 0,
            colorScale: chroma.scale(["red", "blue"]).mode("lab")
        }
    },
    computed: {
        sizeClass() {
            const multiplier = 22;
            const x = store.som.settings.neurons.x;
            const y = store.som.settings.neurons.y;

            if (x > y) {
                return {
                    "width": multiplier + "rem",
                    "height": y / x * multiplier + "rem"
                }
            } else {
                return {
                    "width": x / y * multiplier + "rem",
                    "height": multiplier + "rem"
                }
            }
        },
    },
    methods: {
        onSelectedCb() {
            this.keyCounter++;
        },
    },
    mounted() {
        document.getElementById("somWeightMaps")?.addEventListener("contextmenu", (e) => e.preventDefault())
    }
}
</script>

<style scoped>
.somWeightMaps {
    height: 100%;
    width: 100%;
    overflow-y: auto;
}

.weightMapsContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-around;
}

.weight_map {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.canvasContainer {
    /*width: 20rem;
    height: 20rem;*/
    display: flex;
    justify-content: center;
    border: 1px solid black;
    /* align-items: center; */
}
</style>