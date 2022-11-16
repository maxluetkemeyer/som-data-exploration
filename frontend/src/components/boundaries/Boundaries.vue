<script lang="ts" setup>
import BoundariesOutput from './BoundariesOutput.vue';
import BoundariesSettings from "./BoundariesSettings.vue"
import SidebarButton from "../general/SidebarButton.vue";
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
            <SidebarButton @click="setShowState(ShowState.Settings)"
                :state="determineState(ShowState.Settings)"
                content="S" />
            <SidebarButton @click="setShowState(ShowState.Output)"
                :state="determineState(ShowState.Output)"
                content="O" />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    methods: {
        setShowState(state: ShowState) {
            states.boundaries = state;
        },
        determineState(state: ShowState){
            if(states.boundaries == state) return SidebarButtonState.Active;

            return SidebarButtonState.Enabled;
        }
    }
}
</script>

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