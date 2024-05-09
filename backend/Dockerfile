FROM node:16.20.0-alpine

WORKDIR /backend
COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

ENV BASE_URL="http://localhost/api"
ENV JWT_SECRET="myjwtsecret"
ENV MYSQL_HOST="mysql-db"
ENV MYSQL_PORT=3306
ENV MYSQL_USER="root"
ENV MYSQL_PASSWORD="root"
ENV MYSQL_DATABASE="testdb"

EXPOSE 3000

CMD ["node", "dist/server.js"]