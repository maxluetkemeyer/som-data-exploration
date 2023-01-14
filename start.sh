#!/bin/bash
source backend/venv/bin/activate

export WEBSERVERPORT=8000
export WEBSOCKETPORT=8001

python backend/app.py
