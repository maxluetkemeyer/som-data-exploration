<script lang="ts" setup>
import { store } from '@/logic/store';
import HexSom from './hexagon/HexSom.vue';
import RectSom from './rectangular/RectSom.vue';


</script>

<template>
    <div class="somWeightMaps">
        <div v-for="(item, index) in store.som.result.weights"
            class="weight_map">
            <p>{{ Object.keys(store.data[0])[index] }}</p>
            <RectSom v-if="store.som.settings.topology === 'rectangular'"
                :somMap="item" :winMap="store.som.result.win_map"
                :showWinMap="false" :containerId="'weightMap' + index"
                class="canvasContainer" />
            <HexSom v-else :somMap="item" :winMap="store.som.result.win_map"
                :showWinMap="false" :containerId="'weightMap' + index"
                class="canvasContainer" />
        </div>

    </div>
</template>

<style scoped>
.somWeightMaps {
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    gap: 1rem;
}

.weight_map {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.canvasContainer {
    width: 30rem;
    height: 30rem;
    display: flex;
    justify-content: center;
    border: 1px solid black;
    /* align-items: center; */
}
</style>