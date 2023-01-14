import concurrent.futures
import asyncio

from websocket import websocket
from webserver import webserver
from env import WEBSERVER_PORT, WEBSOCKET_PORT


async def non_blocking():
    """https://stackoverflow.com/questions/41063331/how-to-use-asyncio-with-existing-blocking-library/53719009#53719009

    Run blocking tasks concurrently. asyncio.wait will
    automatically wrap these in Tasks.
    """
    executor = concurrent.futures.ThreadPoolExecutor(max_workers=5)
    loop = asyncio.get_running_loop()
    await asyncio.wait(
        fs={
            loop.run_in_executor(executor, webserver, WEBSERVER_PORT),
        },
        return_when=asyncio.ALL_COMPLETED
    )


async def main():
    await asyncio.gather(websocket(WEBSOCKET_PORT), non_blocking())
    # await asyncio.gather(websocket(PORT_WS))


asyncio.run(main())
