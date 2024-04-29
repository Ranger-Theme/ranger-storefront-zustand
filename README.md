# Make sure to run this from the root of the project
docker-compose -f docker/docker-compose.yaml up -d 

# Make sure to rebuild the image if you change the Dockerfile
docker-compose -f docker/docker-compose.yaml up -d --build

# Make a shared nexwork between the containers
docker network create my-network
