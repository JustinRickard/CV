#!/bin/bash

# Date    : 26th March 2016
# Author  : Justin Rickard
# Changes : Add script to deploy updates to the app

# Set up variables 
workingDirectory=~/websites/CV
githubUrl=https://github.com/JustinRickard/CV.git

cd $workingDirectory

# Check if source code up-to-date 
result=$(git fetch --dry-run 2>&1)
if [[ $result == *"master"* ]]
then
	echo "Changes detected. A redeployment will take place.";
else
  echo "No changes";
  exit;
fi

# Stop web application process
pm2 stop ServerApp

# Update the source code
git pull

# Build the output files
gulp

# Start web application process
pm2 start ServerApp.js