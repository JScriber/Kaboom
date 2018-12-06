# Check dependencies
Run the following command at the root of the project.
```
npm install
```

# Prepare database
This example uses Postgrès as database.
Run a Postgrès container with the following command : 
```docker
docker run --name userbook -d -p 5432:5432 -e POSTGRES_PASSWORD=pass postgres
```
(Note: It may take some time if you don't already have a Postgrès image on your disk.)

### Check container
Check if the container is up and running with : 
```docker
docker container ls | grep userbook
```

### Add database
Enter the container by running :
```docker 
docker exec -it userbook psql -U postgres
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
If the server is running, you should be able to access Swagger by visiting : http://localhost:3000/api/.

Swagger allows you to see all the entrypoints of the application and to send request.