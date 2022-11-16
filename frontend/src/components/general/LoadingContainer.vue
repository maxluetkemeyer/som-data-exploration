<template>
    <div class="loadingContainer">
        <div v-if="isLoading" class="loading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <slot v-else></slot>
    </div>
</template>

<script lang="ts">
export default {
    props: ["isLoading"]
}
</script>

<style scoped>
.loadingContainer {
    width: 100%;
    height: 100%;
}
.loading {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>