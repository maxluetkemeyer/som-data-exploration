import { database_connect } from "./tasks/database_connect";
import { boundaries_train } from "./tasks/boundaries_train";
import { createMessage, message } from "./tasks/message";
import { query_data } from "./tasks/query_data";
import { som_mapsize } from "./tasks/som_mapsize";
import { som_train } from "./tasks/som_train";

export let connection: WebSocket;

export const createWebSocketConnection = () => {
    connection = new WebSocket("ws://localhost:8001")

    connection.onopen = (event) => {
        console.log(event)
        console.log("Successfully connected to Websocket Server")
    }

    connection.onclose = (event) => {
        console.log(event)
        createMessage("Websocket Close", connection.url)
        createMessage("Websocket Close", "Start Websocket and reload page")
    }

    connection.onerror = (event) => {
        console.log(event)
    }
    
    connection.onmessage = (event) => {
        const json = JSON.parse(event.data)
        const task = json["task"]

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
            case "boundaries_train":
                boundaries_train(json["output"])
                return;
            case "som_mapsize":
                som_mapsize(json["map_size"])
            default:
                message(json["options"]);
        }
    }
}