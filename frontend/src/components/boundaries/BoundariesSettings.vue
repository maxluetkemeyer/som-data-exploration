<script lang="ts" setup>
import { decision_tree_train_send } from '@/logic/tasks/decision_tree_train';

</script>

<template>
    <div>
        <button @click="decision_tree_train_send();" class="btn btn-primary">Decision Tree</button>
    </div>
</template>