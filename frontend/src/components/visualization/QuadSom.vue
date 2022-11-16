<script lang="ts" setup>
import { store } from "@/logic/store";
import { onUpdated } from "vue";
import { initQuadSom } from "./quad/som_quad";
</script>

<template>
    <div class="quadSom">
        <div id="canvasContainer" class="canvasContainer">

        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            somSize: {
                width: store.som.distance_map[0].length,
                height: store.som.distance_map.length,
            }
        }
    },
    computed: {
        canvasSize() {
            const canvasContainer = document.getElementById("canvasContainer")
            const size = canvasContainer!.clientWidth < canvasContainer!.clientHeight ? canvasContainer?.clientWidth : canvasContainer?.clientHeight

            return {
                width: size,
                height: size,
            }
        }
    },
    mounted() {
        console.log("mounted")
        initQuadSom(store.som, this.somSize, this.canvasSize);
    },
}
</script>

<style scoped>
.quadSom {
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