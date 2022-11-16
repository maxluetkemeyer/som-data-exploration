// store.js
import { reactive } from 'vue'
import { Message, ShowState } from './models'

const msgArray: Message[] = [
  new Message("Titel Nachricht", "Body Nachricht")
];

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
      sigma: 1,
      learning_rate: 1,
      random_seed: 1,
      neighborhood: "s",
      topology: "k",
      activation_distance: "s",
      decay_function: "d",
      num_iterations: 1,
      random_order: false,
    },
    distance_map: [[]],
    weights: [],
    win_map: [],
  },
  messages: msgArray,
  boundaries: "",
})

export const states = reactive({
  visualization: ShowState.Settings,
  boundaries: ShowState.Settings,
})