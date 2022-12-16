FROM node:19.3

RUN apt-get update || : && apt-get install python -y

WORKDIR /app
COPY . /app

# TODO DOCKERIGNORE, COMMAND CHECK
RUN ./install.sh

CMD ["./start.sh"]