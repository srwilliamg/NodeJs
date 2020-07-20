FROM node:latest
COPY . .
WORKDIR /
RUN npm install --production && npm install -g sequelize-cli
EXPOSE 5000
# RUN sequelize db:create && sequelize db:migrate
CMD npm start