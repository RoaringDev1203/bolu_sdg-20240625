require("dotenv").config();
const path = require('path')
const fs = require('fs')
const { default: axios } = require("axios");
const generateCurrentTypeValue = require("./generateCurrentTypeValue");
const { getCurrentTime } = require("./util");

const express = require("express"); // Import Express framework
const app = express(); // Create Express application
const PORT = process.env.PORT || 3000; // Set port number from environment variable or default to 3000

//const express = require('express'); // Import Express framework
const { error } = require('console');
//const app = express(); // Create Express application
//const PORT = process.env.PORT || 3000; // Set port number from environment variable or default to 3000
let currentValues = {}; // Initialize variable to store current values
let cacheData = {};
let currentMins; // Initialize variable to store current minutes
const logDirectory = path.join(__dirname, 'logs');

// Function to send data to server
async function sendData() {
    config = require('./config.json') // Load configuration from config.json file
    const currentDate = new Date();
    const logFileName = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}.log`

    currentValues = {} // Reset current values
    config.devices.forEach(item => {
        if(item.enabled) {
            let data = []
            item.measurement.forEach(obj => {
                if (obj.enabled) {
                    if (obj.min !== undefined && obj.max !== undefined) {
                        const { min, max, width } = obj;
                        data[obj.type] = { min, max, width };
                    } else {
                        data[obj.type] = {
                            min: config.meta[obj.type].min,
                            max: config.meta[obj.type].max,
                            width: config.meta[obj.type].width || 0
                        };
                    }
                }
            });

            // Store current values for each device
            currentValues[item.device_id] = { 
                initData: data, 
                asset_id: item.asset_id, 
                working_time: item.working_time 
            };
        }
      });

    currentMins = getCurrentTime(); // Get current time in minutes

    let data = [] // Initialize array to store final data to be sent
    // Iterate over each device and measurement type
    Object.keys(currentValues).forEach((deviceId) => {
        cacheData[deviceId] = cacheData[deviceId]||{}
        const {initData, asset_id, working_time} = currentValues[deviceId] // Get initial data, asset id, working time from current values for each device
        Object.keys(initData).forEach(type=>{
            const defaultValue = config.meta[type] || { min: 0, max: 0, width: 0 };
            const min = initData[type].min||defaultValue.min;
            const max = initData[type].max||defaultValue.max;
            const width = initData[type].width||defaultValue.width;

            let value = [] // Initialize variable to store current value

            // Check if device is within working time
            if (working_time) {
                let isInWorkingTime = working_time.find(([start, end])=>{
                    return currentMins >= start && currentMins <= end // Check if current time is within working time range
                });
                if(isInWorkingTime) {
                    value = generateCurrentTypeValue(type, currentMins, min, max, cacheData[deviceId][type], deviceId, width) // Generate current value
                    if(min !== undefined && value < min) value = min // Check if value is below minimum and set to minimum if yes
                    if(max !== undefined && value > max) value = max // Check if value is above maximum and set to maximum if yes
                } else {
                    value = min||0 // Set value to minimum or 0 if outside working time
                }
            }
            else {
                value = generateCurrentTypeValue(type, currentMins, min, max, cacheData[deviceId][type], deviceId, width) // Generate current value
                if(min !== undefined && value < min) value = min // Check if value is below minimum and set to minimum if yes
                if(max !== undefined && value > max) value = max // Check if value is above maximum and set to maximum if yes
            }

            cacheData[deviceId][type] = value
            
            // Push data to array
            data.push({
                meter: +deviceId, // Convert device ID to number
                measurement: type, // Measurement type
                value: value, // Current value
                unit: config.meta[type].unit, // Measurement unit
                asset: asset_id // Asset ID
            });
        })    
         
    });
    const dataCount = data.length;
    console.log("Generated data count: ", data.length, data); // Log number of generated data points

    // Check if data pushing is enabled
    if(process.env.ENABLE_PUSH === '1') {
        try {
            //send data to server
            const res = await axios.post(`${process.env.API_URL}/entes-reads`, {data}, {
                headers: {
                    'Authorization': `Bearer ${process.env.AUTH_TOKEN}` // Add authorization token to headers
                }
            })
    
            console.log('Pushed data count:', res.data?.data?.count)
        } catch(e) {
            console.error("ERROR:", e.message, JSON.stringify(e.response?.data)) // Log error if request fails
            writeErrorLog(e.message + ' ' + JSON.stringify(e.response?.data))
        }
    }

    if (process.env.ENABLE_LOGGING === '1') {
        try {
            writeFileLog(logFileName, JSON.stringify(data), dataCount)
        } catch (e) {
            console.error(e)
        }
    }
}

function writeFileLog(fileName, data, dataCount) {
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }

    const logFilePath = path.join(logDirectory, fileName);
    const currentTime = new Date().toISOString();
    let logDataWithTimestamp = `${currentTime}: ${data}\n`; // Start with timestamp and data
    logDataWithTimestamp += `${currentTime}: Generated data count: ${dataCount}\n`; // Append generated data count
    fs.appendFile(logFilePath, logDataWithTimestamp, (error) => {
        if (error) {
            console.error('Error creating log file:', error)
        } 
    });
}
function writeErrorLog(data) {
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
    }

    const logFilePath = path.join(logDirectory, "error.log");
    const currentTime = new Date().toISOString();
    let logDataWithTimestamp = `${currentTime}: ${data}\n`; // Start with timestamp and data
    fs.appendFile(logFilePath, logDataWithTimestamp, (error) => {
        if (error) {
            console.error('Error creating log file:', error)
        } 
    });
}

const interval = 60000; // Set interval for sending data in 1 min

sendData(); // Initial data sending
setInterval(sendData, interval); // Set interval for sending data periodically

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server start message
});
