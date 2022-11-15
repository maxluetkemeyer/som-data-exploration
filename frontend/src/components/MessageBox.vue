<template>
    <div class="messageBox">
        <h4>{{ title }}</h4>
        <p>{{ body }}</p>
    </div>
</template>

<script lang="ts">
export default {
    props: ["title", "body"],
    async mounted(){
        await new Promise(resolve => setTimeout(resolve, 5000));

        
    }
}
</script>

<style scoped>
h4 {
    margin: 0;
}
.messageBox {
    background-color: lightgreen;
    color: black;
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    z-index: 100;

    padding: 1rem;
    border-radius: 10px;
}
</style>