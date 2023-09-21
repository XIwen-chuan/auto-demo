docker build . -t my-app
docker run \
-d --name auto \
-p 80:80 \
--network=host \