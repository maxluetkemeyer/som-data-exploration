<script lang="ts" setup>
import { store } from '@/logic/store';
import { initHexagonSom } from './hexagon/som_hexagon';
import { initRectangularSom } from './rectangular/rectangular_som';
</script>

<template>
    <div class="somOutput">
        <div id="canvasContainer" class="canvasContainer"></div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            somSize: {
                width: store.som.result.distance_map[0].length,
                height: store.som.result.distance_map.length,
            }
        }
    },
    computed: {
        canvasSize() {
            const canvasContainer = document.getElementById("canvasContainer")
            return {
                width: canvasContainer!.clientWidth,
                height: canvasContainer!.clientHeight,
            }
        }
    },
    mounted() {
        if(store.som.settings.topology === "rectangular"){
            initRectangularSom(store.som.result, this.somSize, this.canvasSize);
        }else {
            initHexagonSom(store.som.result, this.somSize, this.canvasSize);
        }
        
    },
}
</script>

<style scoped>
.somOutput {
    height: 100%;
    width: 100%;
}

.canvasContainer {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>