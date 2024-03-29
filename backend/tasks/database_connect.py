import json
import pandas as pd
import storage


async def database_connect(websocket, credentials):
    # Print colored t#ask name
    storage.printTask("database_connect")

    # Store connection in global storage
    storage.db = credentials

    # Establish new connection
    conn = storage.getEngine().connect()

    # Query all available tables from the database
    df = pd.read_sql("SHOW TABLES", con=conn)

    # Close the connection
    conn.close()

    # All rows in first column ("Tables in *DB*") to a list
    tables = df.iloc[:, 0].to_list()

    # Response with tables attached
    response = {
        "task": "database_connect",
        "tables": tables
    }

    # Send response
    await websocket.send(json.dumps(response))
