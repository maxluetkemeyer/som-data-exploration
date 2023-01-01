<script lang="ts" setup>
import p5 from 'p5';
import { drawDistanceMap } from './draw_distance_map';
import { RectSelection } from './draw_selection';
import { drawWinMap } from './draw_win_map';
import { calcDistanceMapPositions } from './positions_distance_map';
import { calcWinMapPositions } from './positions_win_map';
</script>

<template>
    <div class="rectSom">
        <div :id="containerId" class="canvasContainer"></div>
    </div>
</template>

<script lang="ts">
export default {
    props: ["somMap", "winMap", "containerId", "colorScale", "onSelectedCb"],
    data() {
        return {
            somSize: {
                width: this.somMap[0].length,
                height: this.somMap.length,
            },
            sketch: new p5(() => { }),
        }
    },
    computed: {
        canvasSize() {
            const canvasContainer = document.getElementById(this.containerId)
            return {
                width: canvasContainer!.clientWidth,
                height: canvasContainer!.clientHeight,
            }
        }
    },
    unmounted() {
        this.sketch.remove()
    },
    mounted() {
        this.sketch.remove() //remove placeholder p5

        const qsw = this.canvasSize.width / this.somSize.width;
        const qsh = this.canvasSize.height / this.somSize.height;

        const quadSize = Math.min(qsw, qsh)
        const circle_size = quadSize * 0.2;

        const distance_map_positions = calcDistanceMapPositions(this.somSize, quadSize);
        const win_map_positions = calcWinMapPositions(this.winMap, quadSize, circle_size);

        const sketch = (s: p5) => {
            let rectSel: RectSelection;
            let canvas;

            s.setup = () => {
                canvas = s.createCanvas(this.somSize.width * quadSize, this.somSize.height * quadSize)
                canvas.parent(this.containerId)
                rectSel = new RectSelection(s, distance_map_positions, canvas.size(), this.onSelectedCb)
            }

            s.draw = () => {
                drawDistanceMap(s, distance_map_positions, this.somMap, this.colorScale);
                drawWinMap(s, win_map_positions);
                rectSel.draw();
            }
        }

        this.sketch = new p5(sketch);
    },
}
</script>

<style scoped>
.rectSom {
    height: 100%;
    width: 100%;
}

.canvasContainer {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    /* align-items: center; */
}
</style>