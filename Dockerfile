FROM node:alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
COPY . .
RUN npm install
EXPOSE 3000
# if you are in a development environment you can change the CMD to "npm run start:dev".