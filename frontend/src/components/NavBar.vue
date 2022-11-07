<script lang="ts" setup>
import { store } from "../logic/store"
</script>

<template>
  <div class="wrapper-navbar">
    <div class="logo">
      Interactive Data Exploration <br />
      with self-organizing maps
    </div>
    <div class="tables">
      <div v-for="table in store.tables" class="table-overview">{{table}}</div>
    </div>
    <div class="current-connection">Connected to <br />cris.uni-muenster.de</div>
  </div>
</template>

<style scoped>
.wrapper-navbar {
  color: black;
  width: 100%;
  height: 100%;
  display: flex;
}
.logo {
  padding: 1rem;
  display: flex;
  align-items: center;
  min-width: 15vw;
}
.tables {
  flex-shrink: 1;
  height: 100%;
  border-right: 1px solid black;
  border-left: 1px solid black;
  display: flex;
  overflow-x: auto;
}
.current-connection {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  min-width: 15vw;
  overflow: auto;
}

.table-overview {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0.5rem;
  border-right: 1px solid black;
  background-color: rgb(230, 230, 235);
}

</style>
