#! /usr/local/bin/bash

mongo awm --eval "db.dropDatabase()"
mongoimport --db awm --collection cycles --file cycles.json --jsonArray
mongoimport --db awm --collection exercises --file exercises.json --jsonArray
mongoimport --db awm --collection workouts --file workouts.json --jsonArray