<script lang="ts" setup>
import { store } from "@/logic/store";
import { onUpdated } from "vue";
import { initQuadSom } from "./som_quad";
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
        initQuadSom(store.som.result, this.somSize, this.canvasSize);
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