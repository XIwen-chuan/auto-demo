docker stop auto-demo
docker rm auto-demo
docker build . -t auto-demo
docker run \
-d --name auto-demo \
--add-host host.docker.internal:host-gateway \
--network=host \
auto-demo