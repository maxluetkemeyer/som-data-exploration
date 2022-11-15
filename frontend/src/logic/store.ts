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
  somDataAvailable: false,
  som: {
    distance_map: [[]],
    weights: [],
    win_map: [],
  },
  messages: msgArray,
  boundaries: ""
})

export const states = reactive({
  boundaries: ShowState.Settings,
})