<script lang="ts" setup>
import BoundariesOutput from './BoundariesOutput.vue';
import SidebarButton from "../general/SidebarButton.vue";
import { ShowState, SidebarButtonState } from "@/logic/models";
import { states } from '@/logic/store';
import BoundariesTree from './BoundariesTree.vue';

</script>


<template>
    <div class="boundaries">
        <div class="content">
            <BoundariesOutput v-if="states.boundaries == ShowState.Output" />
            <BoundariesTree v-else />
        </div>
        <div class="sidebar">
            <SidebarButton @click="setShowState(ShowState.Output)"
                :state="determineState(ShowState.Output)">
                <font-awesome-icon icon="fa-solid fa-square-poll-horizontal" />
            </SidebarButton>
            <SidebarButton @click="setShowState(ShowState.Settings)"
                :state="determineState(ShowState.Settings)">
                <font-awesome-icon icon="fa-solid fa-tree" />
            </SidebarButton>
        </div>
    </div>
</template><font-awesome-icon icon="fa-solid fa-gear" />

<script lang="ts">
export default {
    methods: {
        setShowState(state: ShowState) {
            states.boundaries = state;
        },
        determineState(state: ShowState) {
            if (states.boundaries == state)
                return SidebarButtonState.Active;
            return SidebarButtonState.Enabled;
        }
    },
    components: { BoundariesTree }
}
</script>

<style scoped>
.boundaries {
    display: flex;
    height: 100%;
}
</style>