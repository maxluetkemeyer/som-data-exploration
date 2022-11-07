import json
import pandas as pd
import storage


async def database_connect(websocket, options):
    print("database_connect task")

    storage.db = options

    conn = storage.getEngine().connect()

    df = pd.read_sql("SHOW TABLES", con=conn)

    conn.close()

    tables = df.iloc[:, 0].to_list()

    response = {
        "type": "database_connect",
        "tables": tables
    }

    await websocket.send(json.dumps(response))
