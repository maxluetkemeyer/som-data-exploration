<script lang="ts" setup>
import { store } from '@/logic/store';
import HexagonSom from './hexagon/HexagonSom.vue';
import QuadSom from './quad/QuadSom.vue';
</script>

<template>
    <div class="somOutput">
        <QuadSom v-if="store.som.settings.topology === 'rectangular'"/>
        <HexagonSom v-else/>
    </div>
</template>

<style scoped>
.somOutput {
    height: 100%;
}
</style>