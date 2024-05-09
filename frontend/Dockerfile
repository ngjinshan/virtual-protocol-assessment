FROM node:16.20.0-alpine
WORKDIR /frontend
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm i

ENV VITE_BASE_URL="http://localhost/api"

EXPOSE 5173
CMD ["npm", "run", "dev"]