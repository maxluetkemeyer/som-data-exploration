<script lang="ts" setup>
import { states } from "@/logic/store"
import SomOutput from "./SomOutput.vue";
import SomSettings from "./SomSettings.vue";
import { SidebarButtonState, ShowState } from "@/logic/models";
import SidebarButton from "../general/SidebarButton.vue";
import SomFullScreen from "../general/FullScreen.vue";
import SomWeightMaps from "./SomWeightMaps.vue"
</script>

<template>
    <div class="som">
        <SomFullScreen v-if="states.fullscreen == ShowState.Output">
            <SomOutput v-if="fullScreenContent === 'som'"/>
            <SomWeightMaps v-else />
        </SomFullScreen>

        <div class="content">
            <SomSettings v-if="states.visualization == ShowState.Settings" />
            <SomOutput v-else />
        </div>
        <div class="sidebar">
            <SidebarButton @click="setShowState(ShowState.Settings)" :state="determineState(ShowState.Settings)">
                <font-awesome-icon icon="fa-solid fa-gear" />
            </SidebarButton>
            <SidebarButton @click="setShowState(ShowState.Output)" :state="determineState(ShowState.Output)">
                <font-awesome-icon icon="fa-solid fa-table-cells" />
            </SidebarButton>
            <SidebarButton @click="openFullScreen('som')" :state="SidebarButtonState.Enabled">
                <font-awesome-icon icon="fa-solid fa-up-right-and-down-left-from-center" />
            </SidebarButton>
            <SidebarButton @click="openFullScreen('weight_maps')" :state="SidebarButtonState.Enabled">
                <font-awesome-icon icon="fa-solid fa-layer-group" />
            </SidebarButton>

        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            fullScreenContent: "som", //weight_maps
        }
    },
    methods: {
        setShowState(state: ShowState) {
            states.visualization = state;
        },
        determineState(state: ShowState) {
            if (states.visualization == state)
                return SidebarButtonState.Active;
            return SidebarButtonState.Enabled;
        },
        openFullScreen(content: string){
            this.fullScreenContent = content;
            states.fullscreen = ShowState.Output
        }
    },
    components: { SomFullScreen }
}
</script>

<style scoped>
.som {
    display: flex;
    height: 100%;
}
</style>