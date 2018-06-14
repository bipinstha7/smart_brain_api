FROM node:alpine

WORKDIR /usr/src/smart_brain_api

COPY ./ ./

RUN npm install

CMD ["/bin/sh"]