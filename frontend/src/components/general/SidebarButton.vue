<script lang="ts" setup>
import { SidebarButtonState } from '@/logic/models';

</script>

<template>
    <div class="sidebarButton" :class="{ sidebarButtonActive: state == SidebarButtonState.Active }">
        <slot></slot>
    </div>
</template>

<script lang="ts">

export default {
    props: ["state"]
}
</script>

<style>
.sidebarButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    background-color: #D6E4E5;
    color: #393E46;
    border-radius: 40% 0 0 40%;
    cursor: pointer;
}

.sidebarButton:hover {
    background-color: #D6E4E5;
    color: #EB6440;
}

.sidebarButtonActive {
    background-color: #EB6440;
    color: #D6E4E5
}
</style>