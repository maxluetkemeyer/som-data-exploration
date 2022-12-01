import http.server
import socketserver
import asyncio
import websockets
from aiohttp import web

from backend import handler


PORT = 8000
PORT_WS = PORT+1
DIRECTORY = "../frontend/dist/"

async def websocket():
    print("hallo")
    async with websockets.serve(handler, "", PORT_WS):
        print("Websocket Server: ", PORT_WS)
        await asyncio.Future()  # run forever

##########

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

async def webserver():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("HTTP Server: ", PORT)
        httpd.serve_forever()


############
async def hello(request):
    return web.Response(text="Hello, world")

app = web.Application()
app.add_routes([web.get('/', hello)])
        

async def main():
    asyncio.gather(websocket())
    web.run_app(app)
    

    

if __name__ == "__main__":
    asyncio.run(main())
