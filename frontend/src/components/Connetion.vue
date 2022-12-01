<script setup lang="ts">
import { store } from "@/logic/store.js"
import { database_connect_send } from "@/logic/tasks/database_connect"
</script>

<template>
    <div class="container-fluid">
        <div class="row p-5">
            <div class="col"></div>
            <div class="col text-center">
                <h1>SOM DATA VIZ</h1>
            </div>
            <div class="col"></div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col-5">
                <select v-model="store.database.variant" id="input_variant" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                    <option selected>mysql+pymysql</option>
                    <option>One</option>
                </select>

                <label for="input_hostname" class="form-label">Host</label>
                <div class="input-group mb-3">
                    <input v-model="store.database.host" type="text" id="input_hostname" class="form-control" placeholder="Hostname" aria-label="Hostname">
                    <span class="input-group-text">:</span>
                    <input v-model="store.database.port" type="text" id="input_port" class="form-control" placeholder="Port" aria-label="Port">
                </div>

                <label for="input_user" class="form-label">User</label>
                <div class="input-group mb-3">
                    <input v-model="store.database.user" type="text" id="input_user" class="form-control" placeholder="User" aria-label="User">
                    <input v-model="store.database.pass" type="password" id="input_password" class="form-control" placeholder="Password" aria-label="Password">
                </div>

                <div class="mb-3">
                    <label for="input_schema" class="form-label">Schema</label>
                    <input v-model="store.database.schema" type="email" id="input_schema" class="form-control" placeholder="Schema">
                </div>

                <div class="d-grid gap-2">
                    <button @click="database_connect_send()" class="btn btn-primary" type="button">Connect to Database</button>
                </div>

            </div>
            <div class="col"></div>
        </div>
    </div>
</template>