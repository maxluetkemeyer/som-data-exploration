#!/bin/bash

export WEBSERVERPORT=8000
export WEBSOCKETPORT=8001


source backend/venv/bin/activate
python backend/app.py
