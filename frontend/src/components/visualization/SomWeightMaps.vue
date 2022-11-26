<script lang="ts" setup>
import { store } from '@/logic/store';
import { initHexagonSom } from './hexagon/som_hexagon';
import { initRectangularSom } from './rectangular/rectangular_som';


</script>

<template>
    <div class="somWeightMaps">
            <div v-for="(item, index) in store.som.result.weights" class="weight_map">
                <p>{{ Object.keys(store.data[0])[index] }}</p>
                <div :id="'canvasContainer' + index" class="canvasContainer">

                </div>
            </div>
        
    </div>
</template>

<script lang="ts">
export default {
    methods: {
        canvasSize(id: string) {
            const canvasContainer = document.getElementById(id)
            return {
                width: canvasContainer!.clientWidth,
                height: canvasContainer!.clientHeight,
            }
        }
    },
    mounted() {
        const num_features = store.som.result.weights.length;

        for (let idx = 0; idx < num_features; idx++) {
            const map = store.som.result.weights[idx]
            const somSize = {
                width: map[0].length,
                height: map.length,
            }
            const canvasSize = this.canvasSize("canvasContainer"+idx)

            if (store.som.settings.topology === "rectangular") {
                initRectangularSom(store.som.result, map, somSize, canvasSize, "canvasContainer"+idx);
            }else {
                initHexagonSom(store.som.result, map, somSize, canvasSize, "canvasContainer"+idx);
            }
            
        }


        
    }
}
</script>

<style scoped>
.somWeightMaps {
    overflow: scroll;
    height: 100%;
    width: 100%;
    display: flex;
    gap: 1rem;
}

.weight_map {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.canvasContainer {
    width: 20rem;
    height: 20rem;
    display: flex;
    justify-content: center;
    border: 1px solid black;
    /* align-items: center; */
}
</style>