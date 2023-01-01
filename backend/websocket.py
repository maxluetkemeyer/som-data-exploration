# https://websockets.readthedocs.io/en/stable/intro/tutorial1.html#solution

import json
import asyncio
import websockets

import storage
from tasks.database_connect import database_connect
from tasks.boundaries_train import boundaries_train
from tasks.query_data import query_data
from tasks.som_mapsize import som_mapsize
from tasks.som_train import som_train


async def handler(websocket):
    async for message in websocket:
        event = json.loads(message)

        task = event["task"]

        try:
            if task == "database_connect":
                await database_connect(websocket, event["credentials"])
            if task == "query_data":
                await query_data(websocket, event["query"])
            if task == "som_mapsize":
                await som_mapsize(websocket, event["lattice"])
            if task == "som_train":
                await som_train(websocket, event["options"])
            if task == "boundaries_train":
                await boundaries_train(websocket, event["selection"])

        except Exception as e:
            storage.printWarning(task)
            storage.printWarning(str(e))
            await send_message(websocket, task, str(e))


async def send_message(websocket, title, body):
    storage.printTask("message")

    response = {
        "task": "message",
        "options": {
            "title": title,
            "body": body,
        }
    }

    await websocket.send(json.dumps(response))


async def websocket(PORT):
    async with websockets.serve(handler, "", PORT):
        storage.printSucces("Starting WebSocket on port {}".format(PORT))
        await asyncio.Future()  # run forever
