<script lang="ts" setup>
import { store } from '@/logic/store';
</script>

<template>
    <div class="input-group">
        <span class="input-group-text">Quantization Error</span>
        <span class="input-group-text">{{
                store.som.result.quantization_error.toFixed(8)
        }}</span>
        <span class="input-group-text">Topographic Error</span>
        <span class="input-group-text">{{
                store.som.result.topographic_error.toFixed(8)
        }}</span>
        <span class="input-group-text sliderInline">
            <input v-model="store.som.displayInstancesPerNeuron" type="range"
                class="form-range" min="0" max="100" step="1">
        </span>
        <span class="input-group-text">{{ store.som.displayInstancesPerNeuron }}
            Pts./Neuron</span>

    </div>
</template>

<style scoped>
.sliderInline {
    flex-grow: 1;
    padding: 0 10px;
    transform: translateY(0);
}
</style>