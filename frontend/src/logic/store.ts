// store.js
import type { MyPoint } from '@/components/visualization/models';
import chroma from 'chroma-js';
import { reactive } from 'vue'
import { Message, ShowState } from './models'

const msgArray: Message[] = [];

export const store = reactive({
  connected: false,
  database: {
    variant: "mysql+pymysql",
    host: "localhost",
    port: "3306",
    user: "root",
    pass: "password",
    schema: "som_test_db",
  },
  tables: [],
  query: "SELECT sepal_length, sepal_width, petal_length, petal_width FROM iris;",
  data: [],
  som: {
    settings: {
      neurons: {
        x: 20,
        y: 20,
      },
      sigma: 1.5,
      learning_rate: 0.5,
      random_seed: 0,
      neighborhood: "gaussian",
      topology: "rectangular",
      activation_distance: "euclidean",
      num_iterations: 10000,
      random_order: true,
    },
    result: {
      distance_map: [[]],
      weights: [[[]]],
      win_map: [],
      quantization_error: 0,
      topographic_error: 0,
    },
    selection: [],
    umatrixColorScale: chroma.scale(["#ffffff", "black"]).mode("lab"),
    displayInstancesPerNeuron: 100,
  },
  messages: msgArray,
  boundaries: "",
})

export const states = reactive({
  data: ShowState.Settings,
  visualization: ShowState.Settings,
  boundaries: ShowState.Output,
})