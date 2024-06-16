import asyncio
import logging


from nobutt.server import NoButtServer


async def main():
    server = NoButtServer()
    async with server.serve():
        await asyncio.Future()  # run forever


if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)
    asyncio.run(main())
