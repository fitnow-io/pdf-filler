FROM node:12-alpine

WORKDIR /var/app

COPY package*.json ./

RUN npm i

COPY . ./

RUN npm run build

CMD npm run start