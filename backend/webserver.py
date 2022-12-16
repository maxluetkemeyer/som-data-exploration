import http.server
import socketserver

DIRECTORY = "./frontend/dist/"


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)


def webserver(PORT):
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("Starting webserver on Port {}".format(PORT))
        httpd.serve_forever()
