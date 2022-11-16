<script lang="ts" setup>
import { format } from 'sql-formatter';
import { store } from '@/logic/store';
</script>

<template>
    <div class="boundariesOutput">

        <textarea id="boundariesOutputText" class="form-control">{{ format(store.boundaries, { language: "sql" }) }}</textarea>

        <div class="boundariesOutputMenu">
            <button class="btn btn-primary">Add to Query</button>

            <button @click="copyToClipboard()" class="btn btn-primary">Copy to Clipboard</button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    methods: {
        copyToClipboard() {
            // https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
            // Get the text field
            const copyText = document.getElementById("boundariesOutputText");

            // Select the text field
            const text = copyText?.innerText || ""

            // Copy the text inside the text field
            navigator.clipboard.writeText(text);
        }
    }
}
</script>

<style scoped>
.boundariesOutput {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

textarea {
    resize: none;
    flex-grow: 1;
}

.boundariesOutputMenu {
    display: flex;
    column-gap: 0.7rem;
    margin-top: 0.7rem;
}
</style>