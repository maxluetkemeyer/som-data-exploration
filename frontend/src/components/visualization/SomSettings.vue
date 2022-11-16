<script lang="ts" setup>
import { som_train_send } from "@/logic/tasks/som_train";
import { store } from "@/logic/store"
</script>

<template>
    <div>

        <div class="input-group mb-3">
            <span class="input-group-text">X-Neurons</span>
            <input v-model="store.som.settings.neurons.x" type="text" id="input_hostname" class="form-control"
                placeholder="Hostname" aria-label="Hostname">
            <span class="input-group-text">Y-Neurons</span>
            <input v-model="store.som.settings.neurons.y" type="text" id="input_port" class="form-control" placeholder="Port"
                aria-label="Port">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Sigma</span>
            <input v-model="store.som.settings.sigma" type="text" id="input_hostname" class="form-control"
                placeholder="Hostname" aria-label="Hostname">
            <span class="input-group-text">Learning Rate</span>
            <input v-model="store.som.settings.learning_rate" type="text" id="input_port" class="form-control" placeholder="Port"
                aria-label="Port">
            <span class="input-group-text">Random Seed</span>
            <input v-model="store.som.settings.random_seed" type="text" id="input_port" class="form-control" placeholder="Port"
                aria-label="Port">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Neighborhood</span>
            <select v-model="store.som.settings.neighborhood" id="input_variant" class="form-select form-select-sm">
                <option selected>mysql+pymysql</option>
                <option>One</option>
            </select>
            <span class="input-group-text">Topology</span>
            <select v-model="store.som.settings.topology" id="input_variant" class="form-select form-select-sm">
                <option selected>mysql+pymysql</option>
                <option>One</option>
            </select>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Activation Distance</span>
            <select v-model="store.som.settings.activation_distance" id="input_variant" class="form-select form-select-sm">
                <option selected>mysql+pymysql</option>
                <option>One</option>
            </select>
            <span class="input-group-text">Decay Function</span>
            <select v-model="store.som.settings.decay_function" id="input_variant" class="form-select form-select-sm">
                <option selected>mysql+pymysql</option>
                <option>One</option>
            </select>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Num Iterations</span>
            <input v-model="store.som.settings.num_iterations" type="text" id="input_port" class="form-control" placeholder="Port"
                aria-label="Port">
        </div>

        
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
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
