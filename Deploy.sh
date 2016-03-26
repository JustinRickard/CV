#!/bin/bash

# Set up variables
workingDirectory=~/websites
githubUrl=https://github.com/JustinRickard/CV.git

# Set up working directory
mkdir -p $workingDirectory; cd $workingDirectory;

# Update Ubuntu  (use sudo if doing manually. scripts should be run as sudo)
apt-get update
apt-get upgrade
# A system reboot should be done here via EC2 menu.

# (use sudo if doing manually)
apt-get install git nodejs npm nginx
npm install -g requirejs gulp gulp-less gulp-tsc --save-dev
sudo ln -s /usr/bin/nodejs /usr/bin/node

# Copy source code to local machine
git clone $githubUrl

# Build the output files with Gulp
cd $workingDirectory/CV
gulp

# Set up Node Process Manager

