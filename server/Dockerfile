FROM node:16-buster

LABEL authors="daechanjo"

WORKDIR /app

COPY package*.json ./
COPY . .

RUN yarn install

EXPOSE 5000

CMD ["yarn", "start"]