<script lang="ts" setup>
import { decision_tree_train_send } from '@/logic/websocket';

</script>

<template>
    <div>
        <button @click="decision_tree_train_send();" class="btn btn-primary">Decision Tree</button>
    </div>
</template>