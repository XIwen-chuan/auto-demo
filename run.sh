docker build . -t my-app
docker run \
-d --name my-app \
--network=host \
my-app