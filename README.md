# AWM - the Awesome Workout Manager

A personal workout tracking application - still verrrry rough.

## Overview

This project has seperate 'server' and 'client' folders so you have to do npm installs for both the server and client. However, once set up, you can run things from the top level directory.

## Building the client

Run `npm run build:watch` to build the client code and put in the 'public' folder. The app will automatically rebuild the code if you change any of the client files.

## Development server

Run `npm run start:watch` for a dev server. Navigate to `http://localhost:9000/`. The app will automatically reload if you change any of the server files.

## Sample Data

Sample data has been provided in the 'workouts' directory along with a script to import the JSON files into mongodb.

## Software
node: 10.5.0<br/>
mongodb: 3.6.5