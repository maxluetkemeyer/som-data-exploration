<script lang="ts" setup>
import { ShowState } from '@/logic/models';
import { states } from '@/logic/store';

</script>

<template>
    <div id="fullScreen" class="somFullScreen">
        <div class="fullScreenContent">
            <slot></slot>

            <div class="closeFullScreen" @click="close()">
                <font-awesome-icon icon="fa-solid fa-down-left-and-up-right-to-center" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    methods: {
        close(){
            states.fullscreen = ShowState.Settings;
        }
    }
}
</script>

<style scoped>
.somFullScreen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
}
.fullScreenContent {
    background-color: white;
    height: 94vh;
    width: calc(100vw - 6vh);
    z-index: 1000;
    border-radius: 1rem;

    position: absolute;
    left: 3vh;
    top: 3vh;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}
.closeFullScreen {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(30%, -30%);

    background-color: black;
    width: 4vh;
    height: 4vh;
    border-radius: 100%;
    border: 1px solid white;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.closeFullScreen:hover {
    border: 2px solid #EB6440;
    color: #EB6440;
}
</style>