<script lang="ts" setup>
import { SidebarButtonState } from '@/logic/models';

</script>

<template>
    <div class="sidebarButton" :class="{ sidebarButtonActive: state == SidebarButtonState.Active }">
        {{ content }}
    </div>
</template>

<script lang="ts">

export default {
    props: ["content", "state"]
}
</script>

<style>
.sidebarButton {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    background-color: lightgray;
    color: black;
    border: 1px solid black;
    cursor: pointer;
}

.sidebarButton:hover {
    background-color: aqua;
}

.sidebarButtonActive {
    background-color: aqua;
}
</style>