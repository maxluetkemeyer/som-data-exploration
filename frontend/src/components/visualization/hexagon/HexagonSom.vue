<script lang="ts" setup>
import { store } from "@/logic/store";
import { onUpdated } from "vue";
import { initHexagonSom } from "./som_hexagon";
</script>

<template>
    <div class="hexagonSom">
        <div id="canvasContainer" class="canvasContainer"> </div>
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
        console.log("mounted")
        initHexagonSom(store.som.result, this.somSize, this.canvasSize);
    },
}
</script>

<style scoped>
.hexagonSom {
    width: 100%;
    height: 100%;
}

.canvasContainer {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>