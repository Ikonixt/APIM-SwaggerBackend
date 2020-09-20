FROM node:12.18.3-alpine3.9
WORKDIR /
EXPOSE 8080
COPY package.json /
RUN npm --registry http://nexus.10.100.60.228.nip.io/repository/npm-group/ install -f --silence
RUN chmod 777 /
COPY . .
CMD ["npm", "run", "start"]