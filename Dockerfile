FROM node:17.5

WORKDIR /app

COPY index.js index.js
COPY package.json package.json
COPY .babelrc .babelrc
COPY .env.example .env

RUN npm install

CMD ["npm", "run", "dev"]