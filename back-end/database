#!/bin/bash

# Name of the container.
declare -r CONTAINER="kaboom"

# Port of the host.
declare -r HOST_PORT=5432

# Identifiers.
declare -r USER_NAME="postgres"
declare -r PASSWORD="pass"

# Exit codes.
declare -r SUCCESS=0
declare -r ALREADY_EXIST=125

declare -r SUCCESS_MESSAGE="--> Success!"
declare -r ERROR_MESSAGE="--> Error! You should try to do this action manually."

# Util which handles simple errors.
function basic_error_handling() {
  if [[ $1 -eq 0 ]]; then
    echo $SUCCESS_MESSAGE
  else
    echo $ERROR_MESSAGE
  fi
}

# Creates the database.
build() {
  echo "Attempting to create the database..."
  $(docker run --name $CONTAINER -d -p $HOST_PORT:5432 -e POSTGRES_PASSWORD=$PASSWORD $USER_NAME &>/dev/null) 

  case $? in
    $SUCCESS)
      echo $SUCCESS_MESSAGE
    ;;
    $ALREADY_EXIST)
      echo "The database already exists. Launch \"rebuild\" if you want to clear it."
    ;;
    *)
      echo "Unknown error."
    ;;
  esac
}

# Rebuilds the database.
rebuild() {
  destroy
  build
}

# Destroys the database.
destroy() {
  echo "Attempting to destroy the database..."
  stop
  $(docker container rm $CONTAINER)

  basic_error_handling $?
}

# Starts the database.
start() {
  echo "Starting database..."
  $(docker container start $CONTAINER)

  basic_error_handling $?
}

# Stops the database.
stop() {
  echo "Stopping database..."
  err=$(docker container stop $CONTAINER)

  basic_error_handling $?
}

# Enters in the database.
visit() {
  # ! TODO: Fix
  # $(docker exec -it $CONTAINER psql -U $USER_NAME)
}

"$@"