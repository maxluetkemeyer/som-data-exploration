<script setup lang="ts">
import NavBar from "./NavBar.vue";
import SOM from "./visualization/SOM.vue"
import Boundaries from "./boundaries/Boundaries.vue"
import { states } from "@/logic/store";
import LoadingContainer from "./general/LoadingContainer.vue";
import { ShowState } from "@/logic/models";
import Data from "./data/Data.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <div class="grid-container">
    <div class="navContainer">
      <NavBar />
    </div>

    <div class="dataContainer">
      <LoadingContainer :isLoading="states.data == ShowState.Loading">
        <Data />
      </LoadingContainer>
    </div>

    <div class="somContainer">
      <LoadingContainer :isLoading="states.visualization == ShowState.Loading">
        <SOM />
      </LoadingContainer>
    </div>

    <div class="boundariesContainer">
      <LoadingContainer :isLoading="states.boundaries == ShowState.Loading">
        <Boundaries />
      </LoadingContainer>
    </div>

    <div class="footerContainer">
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  background-color: #497174;
  height: 100vh;
  display: grid;
  row-gap: 1vh;
  column-gap: 1vh;
  grid-template-columns: calc(50vw - 0.5vh) calc(50vw - 0.5vh);
  grid-template-rows: 8.5vh 42.5vh 42.5vh 3.5vh;
  grid-template-areas:
    "nav nav"
    "left right-top"
    "left right-bottom"
    "footer footer";
}

.navContainer {
  grid-area: nav;
  background-color: #D6E4E5;
}
.dataContainer {
  grid-area: left;
  background-color: #ffffff;
  padding: 0.7rem 0 0.7rem 0.7rem;
}
.somContainer {
  grid-area: right-top;
  background-color: #ffffff;
  padding: 0.7rem 0 0.7rem 0.7rem;
}
.boundariesContainer {
  grid-area: right-bottom;
  background-color: #ffffff;
  padding: 0.7rem 0 0.7rem 0.7rem;
}
.footerContainer {
  grid-area: footer;
}
</style>
