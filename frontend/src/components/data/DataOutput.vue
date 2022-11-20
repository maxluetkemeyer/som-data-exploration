<script lang="ts" setup>
import { store } from '@/logic/store';


</script>

<template>
  <div class="dataOutput">
    <p v-if="store.data.length == 0">No data available</p>
      <table v-else class="table table-sm table-hover table-striped table-bordered">
        <thead class="table-light">
          <tr>
            <th v-for="key of Object.keys(store.data[0])" scope="col">{{ key }}</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="item in store.data">
            <td v-for="val in item">{{ val }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {};
  },
};
</script>

<style scope>
.dataOutput {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
