<script setup lang="ts">
import Scaffold from "./components/Scaffold.vue";
import Connection from "./components/Connetion.vue"
import { createWebSocketConnection } from "./logic/websocket";
import { store } from "./logic/store";
import MessageBox from "./components/general/MessageBox.vue"
</script>

<template>
  <Scaffold v-if="store.connected" />
  <Connection v-else />

  <div class="messages">
    <MessageBox v-for="msg in store.messages" :id="msg.id" :myId="msg.id"
      :body="msg.body" :title="msg.title" />
  </div>
</template>

<script lang="ts">
export default {
  mounted() {
    createWebSocketConnection();
  },
};
</script>

<style>
.messages {
  position: absolute;
  right: 0;
  bottom: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column-reverse;
  row-gap: 1rem;
  z-index: 999;
}
</style>
