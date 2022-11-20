<script lang="ts" setup>
import SqlEditor from "./SqlEditor.vue";
import DataOutput from "./DataOutput.vue";

import SidebarButton from "../general/SidebarButton.vue";
import { ShowState, SidebarButtonState } from "@/logic/models";
import { states } from '@/logic/store';

</script>


<template>
    <div class="data">
        <div class="content">
            <SqlEditor v-if="states.data == ShowState.Settings" />
            <DataOutput v-else />
        </div>
        <div class="sidebar">
            <SidebarButton @click="setShowState(ShowState.Settings)" :state="determineState(ShowState.Settings)">
                <font-awesome-icon icon="fa-solid fa-database" />
            </SidebarButton>
            <SidebarButton @click="setShowState(ShowState.Output)" :state="determineState(ShowState.Output)">
                <font-awesome-icon icon="fa-solid fa-table-list" />
            </SidebarButton>
        </div>
    </div>
</template><font-awesome-icon icon="fa-solid fa-gear" />

<script lang="ts">
export default {
    methods: {
        setShowState(state: ShowState) {
            states.data = state;
        },
        determineState(state: ShowState) {
            if (states.data == state) return SidebarButtonState.Active;

            return SidebarButtonState.Enabled;
        }
    }
}
</script>

<style scoped>
.data {
    display: flex;
    height: 100%;
}
</style>