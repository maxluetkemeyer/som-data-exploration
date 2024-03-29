import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";

// FontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faSquarePollHorizontal, faTableCells, faDatabase, faTableList, faCircleXmark, faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter, faLayerGroup, faTree } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faGear, faSquarePollHorizontal, faTableCells, faDatabase, faTableList, faCircleXmark, faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter, faLayerGroup, faTree)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount("#app");