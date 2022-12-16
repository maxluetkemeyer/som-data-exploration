#!/bin/bash
npm i --prefix ./frontend/
(cd ./frontend/ && npm run build && cd -)

python3 -m venv ./backend/venv/
source ./backend/venv/bin/activate
python3 -m pip install -r backend/requirements.txt