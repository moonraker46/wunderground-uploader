# wunderground-uploader
An application written in Node.js which collects weather data from an external device (weather station) or any other device which supports to deliver the data via a REST. The collected data is pushed via cron job to the wunderground weather network.

## Description
My weather device is not an usual PWS but a KNX based GIRA Wetterstation Plus which is integrated into my local network using the openHAB smart home framework. That's why I am collect the data using openHAB's integrated REST interface.

## Docker
To run the application as Docker container use the included Dockerfile and change there your REST API Token and the Wunderground PWS password with your values. Then build the image with 
```shell
docker build --tag 'wunderground-uploader' .
```
and run it with
```shell
docker run --name wunderground-uploader wunderground-uploader:latest
```
## Standalone
The usage without Docker is possible as well therefore just run the application with "npm start"