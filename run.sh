docker build . -t my-app
docker run -d -p 8080:80 my-app --add-host=host.docker.internal:host-gateway