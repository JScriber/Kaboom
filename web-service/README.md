# Check dependencies
Run the following command at the root of the project.
```
npm install
```

# Setup databases
```
cd docker && docker-compose -p kaboom up
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

# Access tools
All the tools are accessible in [this page](docker/tools/helper.html).

| Tool | Link |
|---|---|
| Swagger | [port 8080](http://localhost:8080/swagger/) |

