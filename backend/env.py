import os

# Query Data
MAX_ROWS_TO_CLIENT = 300
WEBSERVER_PORT = int(os.environ.get("WEBSERVERPORT")) if os.environ.get("WEBSERVERPORT") is not None else 8000
WEBSOCKET_PORT = os.environ.get("WEBSOCKETPORT") if os.environ.get("WEBSOCKETPORT") is not None else 8001

print(WEBSERVER_PORT)
