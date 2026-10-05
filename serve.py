"""Kavita Ka Ghar — development server (no cache).
Usage:  python serve.py [port]
"""
import sys, os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5501


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def end_headers(self):
        # browser ko stale file kabhi na mile
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass


if __name__ == "__main__":
    print(f"Kavita Ka Ghar chal raha hai ->  http://localhost:{PORT}/")
    print("Band karne ke liye: Ctrl+C")
    ThreadingHTTPServer(("localhost", PORT), Handler).serve_forever()