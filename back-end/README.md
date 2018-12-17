# Check dependencies
Run the following command at the root of the project.
```
npm install
```

# Prepare database
This example uses Postgrès as database.
Run a Postgrès container with the following command : 
```docker
docker run --name kaboom -d -p 5432:5432 -e POSTGRES_PASSWORD=pass postgres
```
(Note: It may take some time if you don't already have a Postgrès image on your disk.)

### Check container
Check if the container is up and running with : 
```docker
docker container ls | grep kaboom
```

### Directly access database
Enter the container by running :
```docker 
docker exec -it kaboom psql -U postgres
```
# Run the database
If it's not the first time you use the database, you may simply need to start it. To do so just run:
```
docker container start kaboom
```

# Run MongoDB
```
docker run -p 27017:27017 --name kaboomango -d mongo
```

# Run the project
The project can be run under different modes.

## Take a glance
In case you just want to launch the back-end without intentions to modify its code.
```cli
npm run start
```
(This script won't auto-refresh nor look for file changes. Thus it's deprecated for development.)

## As a developper
If you want to add or modify some code in the back-end, you must run the following command:
```cli
npm run start:dev
```
Behind it will run the project with `nodemon` which handles auto-refresh when file changes are detected.

## As a tester
If you want to launch the unit tests, you should execute :
```
npm run test:watch
```

# Swagger
The API is documented with Swagger.
If the server is up and running, you should be able to access it by visiting : http://localhost:3000/api/.
