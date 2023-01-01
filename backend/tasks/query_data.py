import pandas as pd
import json
import storage


async def query_data(websocket, query):
    # Print colored Task name
    storage.printTask("query_data")

    # Establish new connection
    conn = storage.getEngine().connect()

    # Query the data
    df = pd.read_sql(query, con=conn)

    # Close the connection
    conn.close()

    # Store data as DataFrame in global storage
    storage.data = df

    # Transform DataFrame into a Dictonary
    # https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_dict.html
    # [{'col1': 1, 'col2': 0.5}, {'col1': 2, 'col2': 0.75}]
    dataDict = df.head(300).to_dict("records")
    # dataDict = df.to_dict("records")

    # Response with data Dictornary attached
    response = {
        "task": "query_data",
        "data": dataDict
    }

    # Send Response
    await websocket.send(json.dumps(response))
