#! /usr/local/bin/bash

mongo awm --eval "db.dropDatabase()"
mongoimport --db awm --collection legend --file legend.json --jsonArray
mongoimport --db awm --collection workouts --file workouts.json --jsonArray