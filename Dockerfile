FROM node:12.19.0

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN ["yarn","dev"]