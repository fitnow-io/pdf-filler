FROM node:14-alpine
RUN npm i -g npm@latest

WORKDIR /var/app

COPY package*.json ./

RUN npm i

COPY . ./

RUN npm run build

CMD npm run start