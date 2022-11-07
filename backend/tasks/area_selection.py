import json


async def area_selection(websocket, options):
    print("area_selection task")

    response = {
        "type": "area_selection",
    }

    await websocket.send(json.dumps(response))
