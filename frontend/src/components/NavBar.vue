<script lang="ts" setup>
import { store } from "../logic/store"
</script>

<template>
  <div class="nav">
    <div class="logo">
      Interactive Data Exploration <br />
      with self-organizing maps
    </div>
    <div class="tables">
      <div v-for="table in store.tables" class="tableItem">{{ table }}</div>
    </div>
    <div class="currentConnection">
      {{ store.database.user }}@{{ store.database.host }}:{{store.database.port}} <br />
      {{ store.database.schema }}
    </div>
  </div>
</template>

<style scoped>
.nav {
  width: 100%;
  max-width: 100%;
  height: 100%;
  display: flex;
}

.logo {
  display: flex;
  align-items: center;
  padding: 0 1rem 0 1rem;
  border-right: 1px solid black;
}

.tables {
  flex-grow: 1;
  display: flex;
  border-right: 1px solid black;
  overflow-x: auto;
}

.currentConnection {
  display: flex;
  align-items: center;
  padding: 0 1rem 0 1rem;
  cursor: pointer;
}

.tableItem {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0.5rem;
  border-right: 1px solid black;
  background-color: #EFF5F5;
}
</style>
