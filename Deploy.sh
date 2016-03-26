#!/bin/bash

# Date    : 26th March 2016
# Author  : Justin Rickard
# Changes : Add script to set up web application on a fresh Ubuntu server

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
npm install -g requirejs gulp gulp-less gulp-tsc pm2 --save-dev
sudo ln -s /usr/bin/nodejs /usr/bin/node

# Copy source code to local machine
git clone $githubUrl

# Copy external source code
git clone https://github.com/jgallen23/routie.git
git clone https://github.com/DefinitelyTyped/DefinitelyTyped.git

# Build the output files with Gulp
cd $workingDirectory/CV
gulp

# Set up Node Process Manager
pm2 startup
# Run the recommended command, something like the below:
#   sudo su -c "env PATH=$PATH:/usr/bin pm2 startup linux -u ubuntu --hp /home/ubuntu"

# Add the app to the process list to ensure the application starts on reboot
pm2 start ServerApp.js
pm2 save

# Configure nginx manually
# Configure in /etc/nginx/sites-available
#server {
#    listen 80;
#    server_name justinr.co.uk;
#    location / {
#        proxy_set_header   X-Forwarded-For $remote_addr;
#        proxy_set_header   Host $http_host;
#        proxy_pass         http://127.0.0.1:3000;
#    }
#}

# Create symlink
ln -s /etc/nginx/sites-available/justinr.co.uk /etc/nginx/sites-enabled/justinr.co.uk

service nginx start
# To reload nginx after config change:  nginx -s reload
# To restart: service nginx restart
