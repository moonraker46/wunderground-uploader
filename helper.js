const ntpClient = require('ntp-client');

const extractNumberFromString = (inputString) => {
  // Regular expression to match any digits or decimal point
  const regex = /(\d+(\.\d+)?)/;

  // Extract the matched number from the input string
  const match = String(inputString).match(regex);

  // If a match is found, return the number as a floating-point number
  if (match && match[0]) {
    return parseFloat(match[0]);
  } else {
    // Return null if no number is found in the string
    return null;
  }
}


const getUtcTime = async () => {
  try {
    // Fetch NTP time
    const ntpTime = await new Promise((resolve, reject) => {
      ntpClient.getNetworkTime("pool.ntp.org", 123, (err, date) => {
        if (err) {
          reject(err);
        } else {
          resolve(date);
        }
      });
    });

    // Format NTP time
    const year = ntpTime.getFullYear();
    const month = String(ntpTime.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(ntpTime.getDate()).padStart(2, '0');
    const hours = String(ntpTime.getHours()).padStart(2, '0');
    const minutes = String(ntpTime.getMinutes()).padStart(2, '0');
    const seconds = String(ntpTime.getSeconds()).padStart(2, '0');
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedTime;
  } catch (error) {
    console.error("Error fetching or formatting NTP time:", error);
    return null;
  }
}


const getMaxState = (jsdata) => {
  // Initialize maxState with negative infinity
  let maxState = -Infinity;

  let jsObject = JSON.parse(JSON.stringify(jsdata));

  for (let [key, value] of Object.entries(jsObject)) {
    const stateNumber = parseFloat(value);
    if (stateNumber > maxState) {
      maxState = stateNumber;
    }
  }
  return maxState
}


const hpa_to_inches_ofm = (pressure_in_hpa) => pressure_in_hpa * 0.02953
const wind_ms_to_mph = (windms) => (windms * 0.2777778) * 0.621371

exports.hpa_to_inches_ofm = hpa_to_inches_ofm;
exports.wind_ms_to_mph = wind_ms_to_mph;
exports.getUtcTime = getUtcTime;
exports.getMaxState = getMaxState;
exports.extractNumberFromString = extractNumberFromString;