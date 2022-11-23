<template>
    <div class="messageBox">
        <div class="messageContent">
            <h4>{{ title }}</h4>
            <p>{{ body }}</p>
        </div>
        <div class="messageClose" @click="close()">
            <font-awesome-icon icon="fa-solid fa-circle-xmark"/>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: ["myId", "title", "body"],
    async mounted() {
        await new Promise(resolve => setTimeout(resolve, 5000));
    },
    methods: {
        close(){
            document.getElementById(this.myId)?.remove()
        }
    }
}
</script>

<style scoped>
h4 {
    margin: 0;
}

.messageBox {
    background-color: #D6E4E5;
    color: black;
    max-width: 60vw;
    border-radius: 10px 0 0 10px;
    display: flex;
}

.messageContent {
    padding: 1rem;
}
.messageClose {
    padding-right: 0.5rem;
    font-size: 1.8rem;
    opacity: 0.8;
    cursor: pointer;
}
.messageClose:hover {
    opacity: 1;
}
</style>