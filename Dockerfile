FROM node:16
COPY ./ /app
WORKDIR /app
RUN npm config set -g registry https://registry.npm.taobao.org
RUN npm install && npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf