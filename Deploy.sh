#!/bin/bash

# Set up variables
workingDirectory=~/websites
mkdir -p $workingDirectory

# Update Ubuntu
apt-get update
apt-get upgrade
apt-get install nodejs npm gulp gulp-less gulp-tsc

# Copy source code to local machine
git clone https://github.com/JustinRickard/CV.git

# Build the output files with Gulp
cd $workingDirectory/CV
gulp

# Set up Node Process Manager

