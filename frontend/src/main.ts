import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faSquarePollHorizontal, faTableCells, faDatabase, faTableList, faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faGear, faSquarePollHorizontal, faTableCells, faDatabase, faTableList, faCircleXmark)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount("#app");