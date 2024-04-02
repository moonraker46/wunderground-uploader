FROM node:21-alpine
RUN apk update && apk add git vim
RUN git config --global http.sslVerify false

WORKDIR /app
RUN cd /app
RUN git clone https://github.com/moonraker46/wunderground-uploader.git

#Set working directory
WORKDIR /app/wunderground-uploader
RUN cd /app/wunderground-uploader

RUN touch ./.env
RUN echo 'API_TOKEN="YourAPItokenGetsHere"' >> .env
RUN echo 'PWS_PASS="YourPWSpasswordGetsHere' >> .env

RUN apk --no-cache add --virtual .builds-deps build-base python3
RUN npm install

RUN awk 'NR==43{print "    '\''UV'\'',"}1' ./node_modules/wunderground-pws/lib/wunderground-pws.js  > awk_out
RUN rm -rf ./node_modules/wunderground-pws/lib/wunderground-pws.js
RUN cp ./awk_out ./node_modules/wunderground-pws/lib/wunderground-pws.js
RUN rm -rf ./awk_out

CMD ["node", "/app/wunderground-uploader/main.js"] 