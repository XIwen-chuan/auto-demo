docker build . -t my-app
docker run \
-d --name auto \
-p 8080:80 \
--network=host \
curl localhost:8080