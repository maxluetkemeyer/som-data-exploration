<script lang="ts" setup>
import { states } from "@/logic/store"
import SomOutput from "./SomOutput.vue";
import SomSettings from "./SomSettings.vue";
import { SidebarButtonState, ShowState } from "@/logic/models";
import SidebarButton from "../general/SidebarButton.vue";
</script>

<template>
    <div class="som">
        <div class="content">
            <SomSettings v-if="states.visualization == ShowState.Settings" />
            <SomOutput v-else/>
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
            states.visualization = state;
        },
        determineState(state: ShowState){
            if(states.visualization == state) return SidebarButtonState.Active;

            return SidebarButtonState.Enabled;
        }
    }
}
</script>

<style scoped>
.som {
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