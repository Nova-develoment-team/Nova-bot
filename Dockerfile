FROM node:latest



# Create the bot's directory

RUN mkdir -p /usr/src/bot

WORKDIR /usr/src/bot



COPY package.json /usr/src/bot

RUN npm install

RUN apt update
RUN npm i pm2 -g

COPY . /usr/src/bot



# Start the bot.

CMD ["node", "index.js"]