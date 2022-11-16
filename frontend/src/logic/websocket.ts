import { ShowState } from "./models";
import { states, store } from "./store"
import { database_connect } from "./tasks/database_connect";
import { decision_tree_train } from "./tasks/decision_tree_train";
import { query_data } from "./tasks/query_data";
import { som_train } from "./tasks/som_train";

export let connection: WebSocket;

export const createConnection = () => {
    connection = new WebSocket("ws://localhost:8001")

    connection.onopen = (event) => {
        console.log(event)
        console.log("Successfully connected to Websocket Server")
    }

    connection.onmessage = (event) => {
        const json = JSON.parse(event.data)
        const task = json["type"]

        switch (task){
            case "database_connect":
                database_connect(json["tables"])
                return;
            case "query_data":
                query_data(json["data"])
                return;
            case "som_train":
                som_train(json["som"])
                return;
            case "decision_tree_train":
                decision_tree_train(json["output"])
                return;
        }
    }
}