const PWS = require('wunderground-pws');
const helper = require('./helper')
const wt = require('@tsmx/weather-tools');
const weatherdata = require('./data')
const collector = require('./restCollector')
require('dotenv').config()

const wd = new weatherdata.WeatherData();
let pws = new PWS('IFRTH205', process.env.PWS_PASS);

const runPwsUpload = () => {
  collector.getMultipleItemStates()
    .then((res) => {
      wd.tempf = wt.celsiusToFahrenheit(res.OU_Dachterasse_Wetterstation_Temperatur).toFixed(5)
      wd.dewptf = wt.celsiusToFahrenheit(wt.dewPoint(Number(res.OU_Dachterasse_Wetterstation_Temperatur), Number(res.OU_Dachterasse_Wetterstation_Relative_Luftfeuchte_Proxy)))
      wd.humidity = Number(res.OU_Dachterasse_Wetterstation_Relative_Luftfeuchte_Proxy).toFixed(5)
      wd.winddir = Number(res.OU_Dachterasse_Wetterstation_Windrichtung).toFixed(5);
      wd.windspeedmph = helper.wind_ms_to_mph(res.OU_Dachterasse_Wetterstation_Windgeschwindigkeit).toFixed(5);
      wd.baromin = helper.hpa_to_inches_ofm(res.OU_Dachterasse_Wetterstation_Luftdruck_Proxy).toFixed(5);
      wd.rainin = wt.millimeterToInch(helper.extractNumberFromString(res.ECO_OU_Dachterrasse_Regenmesser_Rain_Rate)).toFixed(5);
      wd.dailyrainin = wt.millimeterToInch(helper.extractNumberFromString(res.ECO_OU_Dachterrasse_Regenmesser_Rain_Day)).toFixed(5);
      wd.UV = Number(res.localCurrentUvindex).toFixed(1);
      wd.solarradiation = Number(res.OU_Dachterasse_Wetterstation_Globahlstrahlung).toFixed(1);
    })
    .then(async () => {
      wd.dateutc = await helper.getUtcTime();
    })
    .then(() => {
      collector.getItemPersistence('OU_Dachterasse_Wetterstation_Windgeschwindigkeit')
        .then((res => { wd.windgustmph = wt.kmhToMph(helper.getMaxState(res.OU_Dachterasse_Wetterstation_Windgeschwindigkeit)).toFixed(5) }))
        .then(() => {
          pws.setObservations({
            action: wd.action,
            dateutc: wd.dateutc,
            tempf: wd.tempf,
            dewptf: wd.dewptf,
            humidity: wd.humidity,
            windgustmph: wd.windgustmph,
            winddir: wd.winddir,
            windspeedmph: wd.windspeedmph,
            baromin: wd.baromin,
            rainin: wd.rainin,
            dailyrainin: wd.dailyrainin,
            UV: wd.UV,
            solarradiation: wd.solarradiation,
          })
        })
        .then(() => {
          pws.sendObservations(function (err, success) {
            if (err) {
              console.error(err)
            }
            else {
              console.log(success)
            }
          })
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}

exports.runPwsUpload = runPwsUpload;
