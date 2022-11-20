<script lang="ts" setup>
import { som_train_send } from "@/logic/tasks/som_train";
import { store } from "@/logic/store"
</script>

<template>
    <div>
        <div class="input-group mb-3">
            <span class="input-group-text">X-Neurons</span>
            <input v-model="store.som.settings.neurons.x" type="number" class="form-control" placeholder="X-Neurons"
                aria-label="X-Neurons">
            <span class="input-group-text">Y-Neurons</span>
            <input v-model="store.som.settings.neurons.y" type="number" class="form-control" placeholder="Y-Neurons"
                aria-label="Y-Neurons">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Sigma</span>
            <input v-model="store.som.settings.sigma" type="number" class="form-control" placeholder="Sigma"
                aria-label="Sigma">
            <span class="input-group-text">Learning Rate</span>
            <input v-model="store.som.settings.learning_rate" type="number" class="form-control"
                placeholder="Learning Rate" aria-label="Learning Rate">
            <span class="input-group-text">Random Seed</span>
            <input v-model="store.som.settings.random_seed" type="text" class="form-control" placeholder="Random Seed"
                aria-label="Random Seed">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Neighborhood</span>
            <select v-model="store.som.settings.neighborhood" class="form-select form-select-sm">
                <option selected>gaussian</option>
                <option>Todo</option>
            </select>
            <span class="input-group-text">Topology</span>
            <select v-model="store.som.settings.topology" class="form-select form-select-sm">
                <option selected>rectangular</option>
                <option>Todo</option>
            </select>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Activation Distance</span>
            <select v-model="store.som.settings.activation_distance" class="form-select form-select-sm">
                <option selected>euclidean</option>
                <option>Todo</option>
            </select>
            <span class="input-group-text">Decay Function</span>
            <select v-model="store.som.settings.decay_function" class="form-select form-select-sm">
                <option selected>todo</option>
                <option>Todo</option>
            </select>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Num Iterations</span>
            <input v-model="store.som.settings.num_iterations" type="number" class="form-control"
                placeholder="Num Iterations" aria-label="Num Iterations">
        </div>


        <div class="form-check form-switch">
            <input v-model="store.som.settings.random_order" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">random_order</label>
        </div>

        <br />
        <button @click="som_train_send()" class="btn btn-primary">Train SOM</button>

    </div>

    <!--
        x, n neurons                    numbers
        signma                          number
        learning_rate                   number
        decay_function                  .
        neighborhood_function           select (gaussian)
        topology                        select (rectangular)
        activation_distance             select (euclidean)
        random_seed                     number with standard, empty for random


        train:
        num_iterations                  number
        random_order                    boolean button

    -->
</template>
