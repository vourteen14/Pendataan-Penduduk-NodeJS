FROM node:14.17.6
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm run dev
EXPOSE 6969
