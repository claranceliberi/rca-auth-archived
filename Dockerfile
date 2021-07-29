FROM node:16

WORKDIR /app

COPY package.json /app/package.json

RUN yarn install

COPY . /app

CMD [ "yarn","dev"]