const openHabBaseUrl = 'http://openhab.home:8080/rest';
require('dotenv').config()

// List of items you want to retrieve states for
const items = [
    'OU_Dachterasse_Wetterstation_Temperatur',
    'OU_Dachterasse_Wetterstation_Gefuehlte_Temperatur',
    'OU_Dachterasse_Wetterstation_Relative_Luftfeuchte_Proxy',
    'OU_Dachterasse_Wetterstation_Windgeschwindigkeit',
    'OU_Dachterasse_Wetterstation_Windrichtung',
    'OU_Dachterasse_Wetterstation_Windgeschwindigkeit',
    'OU_Dachterasse_Wetterstation_Luftdruck_Proxy',
    'ECO_OU_Dachterrasse_Regenmesser_Rain_Rate',
    'ECO_OU_Dachterrasse_Regenmesser_Rain_Day',
    'localCurrentUvindex',
    'OU_Dachterasse_Wetterstation_Globahlstrahlung',
]

const getItemPersistence = async (itemName) => {
    const url = `${openHabBaseUrl}/persistence/items/${itemName}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch state for ${itemName}: ${response.statusText}`);
    }
    const state = await response.text();
    return { [itemName]: state };
}

const getItemState = async (itemName) => {
    const url = `${openHabBaseUrl}/items/${itemName}/state`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch state for ${itemName}: ${response.statusText}`);
    }
    const state = await response.text();
    return { [itemName]: state };
}

const getMultipleItemStates = async () => {
    try {
        const itemStatePromises = items.map(itemName => getItemState(itemName));
        const itemStates = await Promise.all(itemStatePromises);
        return Object.assign({}, ...itemStates);
    } catch (error) {
        console.error('Error fetching item states:', error);
        throw error;
    }
}

exports.getItemPersistence = getItemPersistence;
exports.getMultipleItemStates = getMultipleItemStates;