<script lang="ts" setup>
import { store } from "@/logic/store"
import QuadSom from "./visualization/QuadSom.vue";
import { som_train_send } from "@/logic/websocket";
</script>

<template>
    <div v-if="!store.somDataAvailable">
        <p>No SOM available</p>
        <button @click="som_train_send()" class="btn btn-primary">Train SOM</button>
    </div>

    <QuadSom v-else />
</template>