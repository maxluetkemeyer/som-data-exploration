<script lang="ts" setup>
import { store } from "@/logic/store";
import Slider from "@vueform/slider"
import chroma from "chroma-js";
</script>

<template>
    <div class="legend">
        <div class="colorLegend" :style="grad"></div>
        <div class="legendMarkers">
            <p>1.0</p>
            <Slider v-model="range" :tooltips="false" orientation="vertical"
                :min="0" :max="1" :step="-1" direction="rtl"
                class="colorLegendSlider" @change="updateColorScale"/>
            <p>0.0</p>
        </div>
    </div>

</template>

<script lang="ts">
export default {
    props: ["minMaxColorScale", "vizType"],
    data() {
        return {
            //TODO: Bug, browser emitts a ReferenceError. The plugin may cause this issue.
            range: [0, 0.5],
        }
    },
    created() {
        this.updateColorScale(this.range);
    },
    computed: {
        grad() {
            const color0 = this.minMaxColorScale(this.range[0]).hex();
            const color1 = this.minMaxColorScale(this.range[1]).hex();

            return {
                "background-image": `linear-gradient(${color1}, ${color0})`
            }
        }
    },
    methods: {
        updateColorScale(range: any) {
            console.log(range)
            const color0 = this.minMaxColorScale(range[0]).hex();
            const color1 = this.minMaxColorScale(range[1]).hex();

            if (this.vizType === "umatrix") {
                store.som.umatrixColorScale = chroma.scale([color0, color1]).mode("lab")
            }
            if (this.vizType === "weightMaps") {
                store.som.weightMapsColorScale = chroma.scale([color0, color1]).mode("lab")
            }


        }
    }
}
</script>

<style src="@vueform/slider/themes/default.css">

</style>

<style>
.legend {
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
}

.legendMarkers {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.legendMarkers p {
    margin: 0;
}

.legendMarkers p:nth-child(1) {
    transform: translateY(-50%);
}

.legendMarkers p:nth-child(3) {
    transform: translateY(50%);
}

.colorLegend {
    width: 1rem;
    height: 100%;
}

.colorLegendSlider {
    height: 100%;
    --slider-connect-bg: var(--primary);
}
</style>