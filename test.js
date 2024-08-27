const fs = require("fs");

// Import the generateCurrentTypeValue function from the './generateCurrentTypeValue' module
const generateCurrentTypeValue = require("./generateCurrentTypeValue");

// Function to generate random values for the given measurement type within the specified range
function generateSelectedFactorValues(measurement, start, end) {
  // Define an array of valid measurement types
  const validMeasurements = [
    // List of valid measurement types
    "active_power_l1n",
    "active_power_l2n",
    "active_power_l3n",
    "AphA",
    "AphB",
    "AphC",
    "apparent_power_l1n",
    "apparent_power_l2n",
    "apparent_power_l3n",
    "cos_phi_l1",
    "cos_phi_l2",
    "cos_phi_l3",
    "cos_phi_total",
    "current_l1",
    "current_l2",
    "current_l3",
    "current_unbalance",
    "hour_meter",
    "input_status",
    "internal_temp",
    "l1_phase_current_angle",
    "l1_phase_voltage_angle",
    "l2_phase_current_angle",
    "l2_phase_voltage_angle",
    "l3_phase_current_angle",
    "l3_phase_voltage_angle",
    "measured_frequency",
    "neutral_current",
    "output_sttus",
    "PhVphA",
    "PhVphB",
    "PhVphC",
    "power_factor_l1",
    "power_factor_l2",
    "power_factor_l3",
    "power_factor_total",
    "power_factor_total_export",
    "power_factor_total_import",
    "PPVphAB",
    "PPVphBC",
    "PPVphCA",
    "quadrant_1_total_reactive_power",
    "quadrant_2_total_reactive_power",
    "quadrant_3_total_reactive_power",
    "quadrant_4_total_reactive_power",
    "reactive_power_l1",
    "reactive_power_l2",
    "reactive_power_l3",
    "rotation_field",
    "total_active_power",
    "total_apparent_power",
    "total_export_active_power",
    "total_export_apparent_power",
    "total_import_active_power",
    "total_import_apparent_power",
    "total_reactive_power",
    "voltage_l1l2",
    "voltage_l1n",
    "voltage_l2l3",
    "voltage_l2n",
    "voltage_l3l1",
    "voltage_l3n",
    "voltage_unbalance",
    "consumed_active_energy_l1",
    "consumed_active_energy_l2",
    "consumed_active_energy_l3",
    "total_consumed_active_energy",
    "delivered_active_energy_l1",
    "delivered_active_energy_l2",
    "delivered_active_energy_l3",
    "total_delivered_energy",
    "consumed_apparent_energy_l1",
    "consumed_apparent_energy_l2",
    "consumed_apparent_energy_l3",
    "total_consumed_apparent_energy",
    "delivered_apparent_energy_l1",
    "delivered_apparent_energy_l2",
    "delivered_apparent_energy_l3",
    "total_delivered_apparent_energy",
    "quadrant_1_reactive_energy_l1",
    "quadrant_1_reactive_energy_l2",
    "quadrant_1_reactive_energy_l3",
    "quadrant_1_total_reactive_energy",
    "quadrant_2_reactive_energy_l1",
    "quadrant_2_reactive_energy_l2",
    "quadrant_2_reactive_energy_l3",
    "quadrant_2_total_reactive_energy",
    "quadrant_3_reactive_energy_l1",
    "quadrant_3_reactive_energy_l2",
    "quadrant_3_reactive_energy_l3",
    "quadrant_3_total_reactive_energy",
    "quadrant_4_reactive_energy_l1",
    "quadrant_4_reactive_energy_l2",
    "quadrant_4_reactive_energy_l3",
    "quadrant_4_total_reactive_energy",
    "pulse_meter",
    "total_pulse_meter_input_1",
    "total_pulse_meter_input_2",
    // Add other valid measurement types here
  ];

  // Check if the provided measurement type is valid
  if (!validMeasurements.includes(measurement)) {
    throw new Error(`Invalid measurement type: ${measurement}`);
  }
  const config = require('./config.json')
  
  const mint = config.meta[measurement].min
  const maxt = config.meta[measurement].max
  const widtht = config.meta[measurement].width || 0

  // Initialize an array to store generated values
  const values = Array(end - start + 1);

  const deviceId = 0

  // Generate values for each time step within the specified range
  for (let i = start; i <= end; i++) {
    // Call the generateCurrentTypeValue function to generate a value for the current time step
    values[i - start] = generateCurrentTypeValue(
      measurement,
      i,
      mint,
      maxt,
      values[i - start - 1],
      deviceId,
      widtht
    )
  }

  // Transform the array of values into an array of objects with time and value properties
  const result = values.map((value, index) => ({ time: index + start, value }))
  
  // Define the filename for the CSV file
  const filename = `test_result_${measurement}.csv`;

  // Write the generated data to a CSV file
  writeToCSV(filename, result);
}
// Function to write data to a CSV file
function writeToCSV(filename, data) {
  let csvString = "time,value\n"; // Header row

  // Check if the data is in the expected format (an array)
  if (!data) {
    console.error("Invalid data format. Expected an array.");
    return;
  }

  // Iterate over the data and append rows to the CSV string
  data.forEach((item) => {
    csvString += `${item.time},${item.value}\n`; // Data row
  });

  // Write the CSV string to a file
  fs.writeFileSync(filename, csvString);
  console.log(`CSV file "${filename}" created successfully.`);
}

// Main function
function main() {
  // Get command line arguments
  const args = process.argv.slice(2);
  const measurement = args[0];
  const min = parseInt(args[1]);
  const max = parseInt(args[2]);
  const filename = `test_result_${measurement}.csv`;

  // Generate random values based on measurement and time range
  const values = generateSelectedFactorValues(measurement, min, max);
}

// Call the main function
main();
