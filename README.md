# cs4920-project

## Running the app
Run the below command in same folder as Dockerfile. The command creates an image named "app" from the Dockerfile
```
docker build -t app .
```

Build a container from the image "app" to run the application. Map your port 4000 to the container's port 80
```
docker run -p 4000:80 app
```
