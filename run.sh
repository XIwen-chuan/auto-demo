docker stop my-app
docker rm my-app
docker build . -t my-app
docker run \
-d --name my-app \
--add-host host.docker.internal:host-gateway \
--network=host \
my-app