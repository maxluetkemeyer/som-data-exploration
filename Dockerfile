FROM node:19.3-alpine3.16 AS frontend

WORKDIR /app
COPY . /app
RUN npm i --prefix ./frontend/
RUN (cd ./frontend/ && npm run build && cd -)

###########################################

FROM python:3.10

WORKDIR /app
COPY . /app
#RUN python3 -m venv ./backend/venv/
#RUN source ./backend/venv/bin/activate
RUN pip install -r backend/requirements.txt

COPY --from=frontend /app/frontend/dist /app/frontend/dist

EXPOSE 8000
EXPOSE 8001

CMD ["python", "backend/app.py"]

# docker build --tag som .    
# docker run --network=host som
# docker run -p 8000:8000 -p 8001:8001 --add-host host.docker.internal:host-gateway som


