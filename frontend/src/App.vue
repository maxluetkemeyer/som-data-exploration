<script setup lang="ts">
import Scaffold from "./components/Scaffold.vue";
import Connection from "./components/Connetion.vue"
import { createConnection } from "./logic/websocket";
import { store } from "./logic/store";
import MessageBox from "./components/general/MessageBox.vue"
</script>

<template>

  <Scaffold v-if="store.connected"/>
  <Connection v-else />

  <div class="messages">
    <MessageBox v-for="msg in store.messages" :body="msg.body" :title="msg.title"/>
  </div>
</template>

<script lang="ts">
export default {
  mounted() {
    console.log("mounted")
    createConnection();
  },
};
</script>
