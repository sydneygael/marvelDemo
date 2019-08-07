FROM node:10 as builder
COPY package.json ./
RUN yarn install && mkdir /myangularapp && mv ./node_modules ./myangularapp
WORKDIR /myangularapp
COPY . .
RUN yarn run build --prod --build-optimizer
## install ngnix
FROM nginx:1.13.12-alpine                                 
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /myangularapp/dist /usr/share/nginx/html
RUN apk update && apk add bash
COPY ./entrypoint.sh /usr/share/nginx/entrypoint.sh
RUN chmod +x /usr/share/nginx/entrypoint.sh
RUN chmod 777 /etc/nginx/nginx.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'