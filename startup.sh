#!/bin/bash
set -e

_kill_procs() {
  echo 'Cleaning Up Process Now'
  # Kill actual node process
  echo 'Stopping server'
  kill -TERM $nodemainprocess
}

# Relay quit commands to processes
trap _kill_procs SIGTERM SIGINT

dumb-init -- node ./dist/main.js $@ &
nodemainprocess=$!

#sleep infinity

echo 'Starting node process now'

wait $nodemainprocess

