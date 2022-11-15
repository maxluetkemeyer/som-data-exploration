<script setup lang="ts">
import SqlView from "./sql_editor/SqlView.vue";
import NavBar from "./NavBar.vue";
import SOM from "./SOM.vue"
import MessageBox from "./MessageBox.vue"
import Output from "./output/Boundaries.vue"
import { store } from "@/logic/store";
</script>

<template>
  <div class="grid-container">
    <div class="nav">
      <NavBar />
    </div>

    <div class="editor">
      <SqlView />
    </div>

    <div class="viz">
      <SOM />
    </div>

    <div class="output">
      <Output />
    </div>

    <div class="footer">Footer</div>
  </div>

  <div class="messages">
    <MessageBox v-for="msg in store.messages" :body="msg.body" :title="msg.title"/>
  </div>
  
</template>

<style scoped>
.grid-container {
  background-color: lightblue;
  height: 100vh;
  display: grid;
  row-gap: 1vh;
  column-gap: 1vh;
  grid-template-columns: calc(50vw - 0.5vh) calc(50vw - 0.5vh);
  grid-template-rows: 8.5vh 40vh 40vh 8.5vh;
  grid-template-areas:
    "nav nav"
    "left right-top"
    "left right-bottom"
    "footer footer";
}
.grid-container > div {
  background-color: white;
}
.nav {
  grid-area: nav;
}
.editor {
  grid-area: left;
  padding: 0.7rem;
}
.viz {
  grid-area: right-top;
  padding: 0.7rem;
}
.output {
  grid-area: right-bottom;
  padding: 0.7rem 0 0.7rem 0.7rem;
}
.footer {
  grid-area: footer;
}
</style>
