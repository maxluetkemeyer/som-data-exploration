<script lang="ts" setup>
import { store } from '@/logic/store';
import chroma from 'chroma-js';
import HexSom from './hexagon/HexSom.vue';
import InfoBar from './InfoBar.vue';
import RectSom from './rectangular/RectSom.vue';
import Legend from "./Legend.vue"

</script>

<template>
    <div id="somWeightMaps" class="somWeightMaps">
        <div class="somWeightMapsVisualizations">
            <div class="weightMapsContainer">
                <div v-for="(item, index) in store.som.result.weights"
                    class="weight_map">
                    <p>{{ Object.keys(store.data[0])[index] }}</p>
                    <RectSom
                        v-if="store.som.settings.topology === 'rectangular'"
                        :somMap="item" :winMap="store.som.result.win_map"
                        :containerId="'weightMap' + index"
                        :colorScale="store.som.weightMapsColorScale"
                        :onSelectedCb="onSelectedCb"
                        :key="('weightMapRect' + index + keyCounter + store.som.displayInstancesPerNeuron)"
                        :style="sizeClass" />
                    <HexSom v-else :somMap="item"
                        :winMap="store.som.result.win_map"
                        :containerId="'weightMap' + index"
                        :colorScale="store.som.weightMapsColorScale"
                        :onSelectedCb="onSelectedCb"
                        :key="('weightMapHex' + index + keyCounter + store.som.displayInstancesPerNeuron)"
                        :style="sizeClass" />
                </div>
            </div>

            <Legend :minMaxColorScale="minMaxColorScale" vizType="weightMaps" />
        </div>

        <InfoBar />

    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            keyCounter: 0,
            minMaxColorScale: chroma.scale(["red", "blue"]).mode("lab")
        };
    },
    computed: {
        sizeClass() {
            const multiplier = 22;
            //TODO: Switches coordinates
            const x = store.som.settings.neurons.y;
            const y = store.som.settings.neurons.x;
            if (x > y) {
                return {
                    "width": multiplier + "rem",
                    "height": y / x * multiplier + "rem"
                };
            }
            else {
                return {
                    "width": x / y * multiplier + "rem",
                    "height": multiplier + "rem"
                };
            }
        },
    },
    methods: {
        onSelectedCb() {
            this.keyCounter++;
        },
    },
    mounted() {
        document.getElementById("somWeightMaps")?.addEventListener("contextmenu", (e) => e.preventDefault());
    },
    components: { InfoBar }
}
</script>

<style scoped>
.somWeightMaps {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

.somWeightMapsVisualizations {
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 1rem;
}


.weightMapsContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-around;
    overflow-y: auto;
}

.weight_map {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>