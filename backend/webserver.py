import http.server
import socketserver
import storage

DIRECTORY = "./frontend/dist/"


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)


def webserver(PORT):
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        storage.printSucces("Starting Webserver on port {}".format(PORT))
        httpd.serve_forever()
