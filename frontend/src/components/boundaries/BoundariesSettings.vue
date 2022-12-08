<script lang="ts" setup>
import { store } from '@/logic/store';
import { decision_tree_train_send } from '@/logic/tasks/decision_tree_train';

</script>

<template>
    <div>
        <button @click="decision_tree_train_send();"
            class="btn btn-primary">Calculate boundaries</button>
    </div>
</template>