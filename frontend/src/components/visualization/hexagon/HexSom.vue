<script lang="ts" setup>
import p5 from 'p5';
import { drawDistanceMap } from './draw_distance_map';
import { drawWinMap } from './draw_win_map';
import { calcDistanceMapPositions } from './positions_distance_map';
import { calcWinMapPositions } from './positions_win_map';
</script>

<template>
    <div class="hexSom">
        <div :id="containerId" class="canvasContainer"></div>
    </div>
</template>

<script lang="ts">
export default {
    props: ["somMap", "winMap", "showWinMap", "containerId"],
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

        const a = 2 * Math.PI / 6;
        const r_width = this.canvasSize.width / (1 + this.somSize.width + this.somSize.width * Math.cos(a) - Math.cos(a))
        const r_height = this.canvasSize.height / (Math.sin(a) * (1 + this.somSize.height * 2))
        const r = Math.min(r_width, r_height);

        const circle_size = r * 0.3;

        const distance_map_positions = calcDistanceMapPositions(this.somSize, this.somMap, a, r);
        const win_map_positions = calcWinMapPositions(this.winMap, a, r, circle_size)

        const sketch = (s: p5) => {
            let canvas;

            s.setup = () => {
                canvas = s.createCanvas(this.canvasSize.width, this.canvasSize.height)
                canvas.parent(this.containerId)
            }

            s.draw = () => {
                drawDistanceMap(s, distance_map_positions, a, r);
                if(this.showWinMap) drawWinMap(s, win_map_positions, circle_size);
            }
        }

        this.sketch = new p5(sketch);
    },
}
</script>

<style scoped>
.hexSom {
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