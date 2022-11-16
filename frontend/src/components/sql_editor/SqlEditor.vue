<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { sql } from "@codemirror/lang-sql";
import { store } from "../../logic/store"
import { query_data_send } from "@/logic/tasks/query_data";
</script>

<template>
  <div class="wrapper-sqleditor">
    <div class="sqleditor-code">
      <codemirror v-model="store.query" :extensions="extensions" placeholder="Type SQL here" :style="{ height: '100%' }" />
    </div>

    <div class="sqleditor-menu">
      <button @click="query_data_send();" class="btn btn-primary">Query</button>
      <button class="btn btn-secondary">Button 2</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "SqlEditor",
  data() {
    return {
      extensions: [sql()],
    };
  },
  mounted() { },
};
</script>

<style scoped>
.wrapper-sqleditor {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.sqleditor-code {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(230,230,230)
}
.sqleditor-menu {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}
</style>
