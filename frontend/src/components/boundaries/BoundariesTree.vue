<template>
    <div id="boundariesTree"></div>
</template>

<script lang="ts">
export default {
    mounted() {
        // Only works in production version, because the backend places the picture in the dist folder
        const img = new Image()
        const url = "assets/tree.svg?" + Date.now().toString() // anti-cache pattern
        const container = document.getElementById("boundariesTree");

        img.src = url;
        img.classList.add("bounadriesTreeImg")
        container!.appendChild(img);
    }
}
</script>

<style>
.bounadriesTreeImg {
    width: 100%;
}
</style>