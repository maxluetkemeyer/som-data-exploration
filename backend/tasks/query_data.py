import pandas as pd
import json
import storage


async def query_data(websocket, query):
    print("query_data task")

    conn = storage.getEngine().connect()

    df = pd.read_sql(query, con=conn)

    conn.close()

    # https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_dict.html

    storage.data = df

    data = df.head(100).to_dict("records")
    #data = df.to_dict("records")

    response = {
        "type": "query_data",
        "data": data
    }

    # storage

    await websocket.send(json.dumps(response))
