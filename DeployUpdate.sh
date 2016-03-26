#!/bin/bash

# Date    : 26th March 2016
# Author  : Justin Rickard
# Changes : Add script to deploy updates to the app

# Set up variables
workingDirectory=~/websites
githubUrl=https://github.com/JustinRickard/CV.git

# Stop web application process
pm2 stop

# Update the source code
cd $workingDirectory/CV
git pull

# Build the output files
gulp

# Start web application process
pm2 start