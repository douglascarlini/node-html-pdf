FROM node:22-alpine
WORKDIR /usr/src/app

ENV CHROME_BIN="/usr/bin/chromium-browser" PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true" NODE_ENV="production"
RUN set -x && apk update && apk upgrade && apk add --no-cache udev ttf-freefont chromium

COPY . .
RUN npm install --silent

CMD ["npm", "run", "start"]