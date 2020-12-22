FROM mhart/alpine-node:12
WORKDIR /app
COPY package.json yarn.lock ./

RUN npm install -g yarn
RUN yarn install

COPY . .

RUN yarn build:server

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "dist/src/index.js"]
