FROM node:16.4.2

WORKDIR /bot

ADD package.json /bot/package.json

ADD . /bot
RUN npm i --only=prod

RUN npm run build-ts

ENTRYPOINT ["node", "dist"]