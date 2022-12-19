<script lang="ts" setup>
import { store } from "@/logic/store"
</script>

<template>
    <div id="vizControlls" class="input-group input-group-sm">

        <span class="input-group-text" id="basic-addon1">Instances
            per Neuron</span>
        <input v-model="store.som.displayInstancesPerNeuron" type="number"
            class="form-control" placeholder="Instances per Neuron">
        <span class="sliderInline">
            <input v-model="store.som.displayInstancesPerNeuron" type="range"
                class="form-range" min="0" max="100" step="1">
        </span>
    </div>
</template>

<style>
.sliderInline {
    flex-grow: 1;
    padding: 0 10px;
    transform: translateY(5%);
}
</style>