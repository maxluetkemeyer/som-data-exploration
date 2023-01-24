<script lang="ts" setup>
import { createMessage } from "@/logic/tasks/message";
import { store } from "../logic/store"
</script>

<template>
  <div class="nav">
    <div class="logo">
      Interactive Data Exploration <br />
      with self-organizing maps
    </div>
    <div class="tables">
      <div class="tableScrollContainer">
        <div v-for="table in store.tables" class="tableItem"
          @click="copyToClipboard(table)">{{ table }}</div>

      </div>
    </div>
    <div class="currentConnection" @click="store.connected = false">
      {{ store.database.user }}@{{
        store.database.host
      }}:{{ store.database.port }} <br />
      {{ store.database.schema }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    copyToClipboard(content: string) {
      // https://www.w3schools.com/howto/howto_js_copy_clipboard.asp

      // Copy the text inside the text field
      navigator.clipboard.writeText(content);

      if (window.getSelection) {
        if (window.getSelection()?.empty) {  // Chrome
          window.getSelection()?.empty();
        } else if (window.getSelection()?.removeAllRanges) {  // Firefox
          window.getSelection()?.removeAllRanges();
        }
      }

      createMessage(content, "Copied to Clipboard")
    }
  }
}
</script>

<style scoped>
.nav {
  position: relative;
  height: 100%;
}

.logo {
  position: absolute;
  height: 100%;
  width: 15vw;
  border-right: 1vh solid #497174;
  background-color: white;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}

.currentConnection {
  position: absolute;
  right: 0;
  height: 100%;
  width: 22vw;
  border-left: 1vh solid #497174;
  background-color: white;
  cursor: pointer;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.tables {
  position: absolute;
  left: 15vw;
  height: 100%;
  width: 63vw;
}

.tableScrollContainer {
  height: 100%;

  display: flex;
  flex-direction: row;
  overflow-x: auto;
}

.tableItem {
  height: 100%;
  position: relative;
  border-right: 1px solid black;
  width: fit-content;
  white-space: nowrap;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.tableItem:hover {
  background-color: var(--primary);
  color: white;
  transition: 300ms;
}
</style>
