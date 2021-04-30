FROM node:14-buster
RUN npm i -g npm@latest

RUN sed -i "s#deb http://deb.debian.org/debian buster main#deb http://deb.debian.org/debian buster main contrib non-free#g" /etc/apt/sources.list

RUN echo ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula \
    select true | debconf-set-selections

RUN apt-get update && \
  apt-get install -y libreoffice \
    ttf-mscorefonts-installer \
    fontconfig
RUN fc-cache -f

WORKDIR /var/app

COPY package*.json ./

RUN npm i

COPY . ./

RUN npm run build

CMD npm run start