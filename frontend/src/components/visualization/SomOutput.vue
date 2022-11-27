<script lang="ts" setup>
import { store } from '@/logic/store';
import HexSom from './hexagon/HexSom.vue';
import RectSom from './rectangular/RectSom.vue';
</script>

<template>
    <div class="somOutput">
        <RectSom v-if="store.som.settings.topology === 'rectangular'"
            :somMap="store.som.result.distance_map"
            :winMap="store.som.result.win_map" :showWinMap="true"
            containerId="canvasContainer" />
        <HexSom v-else :somMap="store.som.result.distance_map"
            :winMap="store.som.result.win_map" :showWinMap="true"
            containerId="canvasContainer" />
    </div>
</template>

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
    /* align-items: center; */
}
</style>