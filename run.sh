docker stop my-app
docker rm my-app
docker build . -t my-app
docker run \
-d --name my-app \
-p 8080:80 \
--add-host host.docker.internal:host-gateway \
my-app