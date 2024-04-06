const helper = require('./helper')

class WeatherData {

   action = 'updateraw'; 

    constructor() {
        this._data = {
            dateutc: null,
            tempf: null,
            dewptf: null,
            feelslikef: null,
            humidity: null,
            windgustmph: null,
            winddir: null,
            windspeedmph: null,
            baromin: null,
            rainin: null,
            dailyrainin: null,
            UV: null,
            solarradiation: null
        };
    }

    // Getters
    get dateutc() {
        return this._data.dateutc;
    }

    get tempf() {
        return this._data.tempf;
    }

    get feelslikef() {
        return this._data.feelslikef;
    }


    get dewptf() {
      return this._data.dewptf;  
    }

    get humidity() {
        return this._data.humidity;
    }

    get windgustmph() {
        return this._data.windgustmph;
    }

    get winddir() {
        return this._data.winddir;
    }

    get windspeedmph() {
        return this._data.windspeedmph;
    }

    get baromin() {
        return this._data.baromin;
    }

    get rainin() {
        return this._data.rainin;
    }

    get dailyrainin() {
      return this._data.dailyrainin;
  }

    get UV() {
        return this._data.UV;
    }

    get solarradiation() {
        return  this._data.solarradiation;
    }


    // Setters
    set dateutc(value) {
        this._data.dateutc = value;
    }

    set tempf(value) {
        this._data.tempf = value;
    }

    set feelslikef(value) {
        this._data.feelslikef = value;
    }

    set dewptf(value) {
      this._data.dewptf = value;
  }

    set humidity(value) {
        this._data.humidity = value;
    }

    set windgustmph(value) {
        this._data.windgustmph = value;
    }

    set winddir(value) {
        this._data.winddir = value;
    }

    set windspeedmph(value) {
        this._data.windspeedmph = value;
    }

    set baromin(value) {
        this._data.baromin = value;
    }

    set rainin(value) {
        this._data.rainin = value;
    }

    set dailyrainin(value) {
      this._data.dailyrainin = value;
  }

    set UV(value) {
        this._data.UV = value;
    }

    set solarradiation(value) {
        this._data.solarradiation = value;
    }

}

exports.WeatherData = WeatherData;