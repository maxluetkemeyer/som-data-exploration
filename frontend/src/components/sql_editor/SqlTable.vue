<script lang="ts" setup>
import { store } from '@/logic/store';


</script>

<template>
  <div class="wrapper-sqltable">
    <p v-if="store.data.length == 0">No data available</p>
    <div v-else class="table-responsive"> <!--funktioniert das?-->
      <table class="table table-hover">
        <!--table-bordered-->
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
.wrapper-sqltable {
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: auto;
}
</style>
