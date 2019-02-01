#!/bin/sh
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' psytrain_mongo_1
