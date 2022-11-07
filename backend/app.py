# https://websockets.readthedocs.io/en/stable/intro/tutorial1.html#solution

import asyncio
import websockets
import json
from tasks.area_selection import area_selection

from tasks.database_connect import database_connect
from tasks.query_data import query_data
from tasks.som_mapsize import som_mapsize
from tasks.som_train import som_train


async def handler(websocket):
    async for message in websocket:
        event = json.loads(message)

        task = event["type"]

        if task == "database_connect":
            await database_connect(websocket, event["options"])
        if task == "query_data":
            await query_data(websocket, event["query"])
        if task == "som_mapsize":
            await som_mapsize(websocket, event["lattice"])
        if task == "som_train":
            await som_train(websocket, event["options"])
        if task == "area_selection":
            await area_selection(websocket, event["options"])


async def main():
    async with websockets.serve(handler, "", 8001):
        print("Starting websocket server on Port 8001")
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())
