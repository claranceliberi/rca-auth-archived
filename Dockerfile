FROM node:12

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

ENV PORT=3000
ENV TOKEN_SECRETE=ca83718c4b9831452328f627eee014d9aa978c8b85cb9e8cd4f0bb973b25d3fc6364bc63304434eb582645063b183b17caddf671701be8f28b9d046954596603
ENV DATABASE_URL=postgresql://liberi:liberI@111@localhost:5432/rca-auth?schema=public
ENV NODE_ENV=development

EXPOSE 3000

CMD [ "yarn","start"]