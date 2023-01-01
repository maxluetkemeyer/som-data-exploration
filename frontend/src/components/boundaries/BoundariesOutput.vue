<script lang="ts" setup>
import { format } from 'sql-formatter';
import { store } from '@/logic/store';
import { boundaries_train_send } from '@/logic/tasks/boundaries_train';
import { createMessage } from '@/logic/tasks/message';
</script>

<template>
    <div class="boundariesOutput">
        <textarea id="boundariesOutputText"
            class="form-control">{{ format(store.boundaries, { language: "sql" }) }}</textarea>

        <div class="boundariesOutputMenu">
            <button @click="boundaries_train_send();"
                class="btn btn-primary">Calculate boundaries</button>

            <button @click="copyToClipboard()" class="btn btn-primary">Copy to
                Clipboard</button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    methods: {
        copyToClipboard() {
            // https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
            // Get the text field
            const copyText = document.getElementById("boundariesOutputText")! as HTMLInputElement;

            // Select the text field
            copyText!.select();

            // Copy the text inside the text field
            navigator.clipboard.writeText(copyText.value);

            if (window.getSelection) {
                if (window.getSelection()?.empty) {  // Chrome
                    window.getSelection()?.empty();
                } else if (window.getSelection()?.removeAllRanges) {  // Firefox
                    window.getSelection()?.removeAllRanges();
                }
            }

            createMessage("Boundaries", "Copied to Clipboard")
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