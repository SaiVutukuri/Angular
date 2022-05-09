FROM node:12.14.0-alpine as build-stage
ENV LC_ALL C
ARG env=production
RUN apk update && apk upgrade && apk add --no-cache make git && rm -rf /var/cache/apk/* /tmp/*
ADD . /app-ui
WORKDIR /app-ui
COPY package.json package-lock.json /app-ui/
RUN npm install
COPY . /app-ui
ARG configuration=production
RUN cd /app-ui && npm run build -- --output-path=./dist/testing2 --configuration $configuration
FROM nginx:alpine
RUN apk update && apk upgrade && rm -rf /var/cache/apk/* /tmp/*
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app-ui/dist/testing2 /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]