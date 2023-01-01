<script setup lang="ts">
import { store } from "@/logic/store.js"
import { database_connect_send } from "@/logic/tasks/database_connect"
</script>

<template>
    <div class="con-background"></div>
    <div class="container-fluid con-content">
        <div class="row pt-3">
            <div class="col"></div>
            <div class="col text-center">
                <h3>University of Münster</h3>
                <h3>Department of Information Systems</h3>
            </div>
            <div class="col"></div>
        </div>
        <div class="row p-3">
            <div class="col"></div>
            <div class="col-8 text-center">
                <h1>Interactive data visualization and exploration<br />with self-organizing maps</h1>
            </div>
            <div class="col"></div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col-5">
                <select v-model="store.database.variant" id="input_variant" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                    <option>postgresql</option>
                    <option>postgresql+psycopg2</option>
                    <option>postgresql+pg8000</option>
                    <option>mysql</option>
                    <option>mysql+mysqldb</option>
                    <option selected>mysql+pymysql</option>
                    <option>oracle</option>
                    <option>oracle+cx_oracle</option>
                    <option>mssql+pyodbc</option>
                    <option>mssql+pymssql</option>
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

<style scoped>
.con-content {
    background-color: rgba(255, 255, 255, 0.95);
    height: 100vh;
}
.con-background {
    top: 0;
    left: 0;
    height: 200vh;
    width: 200vw;
    position: fixed;
    z-index: -1;
    background-image: url("@/assets/som_umatrix.png");
    background-repeat: repeat;
    background-size: contain;
    transform: rotate3d(10, 10, -5, 50deg) translate(-20%, -30%);
    animation: animatedBackground 50s linear infinite alternate-reverse;
}
@keyframes animatedBackground {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10% -200px;
  }
}
</style>