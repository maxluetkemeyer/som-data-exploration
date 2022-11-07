<script lang="ts" setup>
import SqlEditor from "./SqlEditor.vue";
import SqlTable from "./SqlTable.vue";
</script>

<template>
  <div class="wrapper-sqlview">
    <div class="sql-editor">
      <SqlEditor />
    </div>

    <div class="sql-divider"></div>

    <div class="sql-table">
      <SqlTable />
    </div>
  </div>
</template>

<style scoped>
.wrapper-sqlview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sql-editor {
  height: 50%;
}

.sql-table {
  height: 50%;
}

.sql-divider {
  height: 1rem;
}
</style>
