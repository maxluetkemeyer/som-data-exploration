<script setup lang="ts">
import Scaffold from "./components/Scaffold.vue";
import Connection from "./components/Connetion.vue"
import { createConnection } from "./logic/websocket";
import { store } from "./logic/store";
</script>

<template>

  <Scaffold v-if="store.connected"/>
  <Connection v-else />
</template>

<script lang="ts">
export default {
  mounted() {
    console.log("mounted")
    createConnection();
  },
};
</script>
