<script lang="ts" setup>
import BoundariesOutput from './BoundariesOutput.vue';
import BoundariesSettings from "./BoundariesSettings.vue"
import SidebarButton from "./SidebarButton.vue";
import { ShowState, SidebarButtonState } from "@/logic/models";
import { states } from '@/logic/store';

</script>


<template>
    <div class="boundaries">
        <div class="content">
            <BoundariesSettings v-if="states.boundaries == ShowState.Settings" />
            <BoundariesOutput v-else />
        </div>
        <div class="sidebar">
            <SidebarButton @click="states.boundaries = ShowState.Settings" :state="states.boundaries == ShowState.Settings ? SidebarButtonState.Active : SidebarButtonState.Enabled"
                content="S" />
            <SidebarButton @click="states.boundaries = ShowState.Output" :state="states.boundaries == ShowState.Output ? SidebarButtonState.Active : SidebarButtonState.Enabled" content="O" />
        </div>
    </div>
</template>

<style scoped>
.boundaries {
    display: flex;
    height: 100%;
}

.content {
    width: 100%;
}

.sidebar {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    row-gap: 0.1rem;
}
</style>