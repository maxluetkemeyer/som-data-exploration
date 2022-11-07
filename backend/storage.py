import pandas as pd
import sqlalchemy

global data
data = pd.DataFrame()

global db
db = {}


def getEngine():
    return sqlalchemy.create_engine(f"{db['variant']}://{db['user']}:{db['pass']}@{db['host']}:{db['port']}/{db['schema']}?charset=utf8mb4")
