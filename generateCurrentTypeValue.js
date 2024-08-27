// Import required functions from util.js
const {
  get_ActivePowerL123n,
  get_AphABC,
  get_ApparentPowerL123n,
  get_CosPhiL1,
  get_CosPhiL2,
  get_CosPhiL3Total,
  get_L1PhaseCurrentAngle,
  get_L23PhaseCurrentAngle,
  get_CurrentI123_InputStatus_OutputSttus_PowerFactorTotalExport_Import,
  get_Static_Value,
  get_HourMeter,
  getRandomValue,
  getRandomValueDivide8,
  get_NeutralCurrent,
  get_PowerFactorI1,
  get_PowerFactorI23,
  get_Quadrant1TotalReactivePower,
  get_Quadrant2TotalReactivePower,
  get_Quadrant3TotalReactivePower,
  get_Quadrant4TotalReactivePower,
  get_ReactivePowerL1,
  get_ReactivePowerL23,
  get_TotalActivePower_TotalApparentPower_TotalImportApparentPower,
  get_TotalExportActivePower,
  get_TotalExportApparentPower,
  get_TotalImportActivePower,
  get_TotalReactivePower,
  get_AllVoltage,
  get_Voltage_Unbalance,
  getCascadingValue,
  get_PulseMeter,
  get_Quadrant1ReactiveEnergyL2,
  getCascadingRandomValue,
  getDoubleCascadingRandomValue,
  getRandomWidthValue,
  get_Consumed_Active_Energy_l1,
  get_Consumed_Active_Energy_l2,
  get_Consumed_Active_Energy_l3,
  get_Total_Consumed_Active_Energy,
  get_Consumed_Apparent_Energy_l1,
  get_Consumed_Apparent_Energy_l2,
  get_Consumed_Apparent_Energy_l3,
  get_Total_Consumed_Apparent_Energy,
  get_Quadrant_4_Reactive_Energy_l1,
  get_Quadrant_4_Reactive_Energy_l2,
  get_Quadrant_4_Reactive_Energy_l3,
  get_Quadrant_4_Total_Reactive_Energy,
} = require("./util");

// Load configuration from config.json file
config = require("./config.json");

// Function to generate current value for each measurement type
function generateCurrentTypeValue(
  type,
  currentTime,
  min,
  max,
  oldValue,
  deviceId,
  width
) {
  switch (
    type //According to the measurement use different functions for generating value.
  ) {
    case "active_power_l1n":
      return (
        get_ActivePowerL123n(min, currentTime, oldValue) +
        Math.random() * 100 -
        50
      );
    case "active_power_l2n":
      return (
        get_ActivePowerL123n(min, currentTime, oldValue) +
        Math.random() * 100 -
        50
      );
    case "active_power_l3n":
      return (
        get_ActivePowerL123n(min, currentTime, oldValue) +
        Math.random() * 100 -
        50
      );
    case "AphA":
      return get_AphABC(min, currentTime, oldValue) + Math.random() * 20 - 10;
    case "AphB":
      return get_AphABC(min, currentTime, oldValue) + Math.random() * 20 - 10;
    case "AphC":
      return get_AphABC(min, currentTime, oldValue) + Math.random() * 20 - 10;
    case "apparent_power_l1n":
      return (
        get_ApparentPowerL123n(min, currentTime, oldValue) +
        Math.random() * 100 -
        50
      );
    case "apparent_power_l2n":
      return (
        get_ApparentPowerL123n(min, currentTime, oldValue) +
        Math.random() * 100 -
        50
      );
    case "apparent_power_l3n":
      return (
        get_ApparentPowerL123n(min, currentTime, oldValue) +
        Math.random() * 100 -
        50
      );
    case "cos_phi_l1":
      return get_CosPhiL1(
        max,
        min,
        currentTime,
        oldValue
      );
    case "cos_phi_l2":
      return get_CosPhiL2(
        max,
        min,
        currentTime,
        oldValue
      );
    case "cos_phi_l3":
      return get_CosPhiL3Total(
        max,
        min,
        currentTime,
        oldValue
      );
    case "cos_phi_total":
      return get_CosPhiL3Total(
        max,
        min,
        currentTime,
        oldValue
      );
    case "current_l1":
      return get_CurrentI123_InputStatus_OutputSttus_PowerFactorTotalExport_Import(
        max,
        min
      );
    case "current_l2":
      return get_CurrentI123_InputStatus_OutputSttus_PowerFactorTotalExport_Import(
        max,
        min
      );
    case "current_l3":
      return get_CurrentI123_InputStatus_OutputSttus_PowerFactorTotalExport_Import(
        max,
        min
      );
    case "current_unbalance":
      return get_CosPhiL3Total(
        max,
        min,
        currentTime,
        oldValue
      );
    case "hour_meter":
      return get_HourMeter(currentTime);
    case "input_status":
      return get_CurrentI123_InputStatus_OutputSttus_PowerFactorTotalExport_Import(
        max,
        min
      );
    case "internal_temp":
      return get_Static_Value(min);
    case "l1_phase_current_angle":
      return get_L1PhaseCurrentAngle(
        max,
        min,
        currentTime,
        oldValue
      );
    case "l1_phase_voltage_angle":
      return getRandomValue(max, min, oldValue, false, deviceId);
    case "l2_phase_current_angle":
      return get_L23PhaseCurrentAngle(
        max,
        min,
        currentTime,
        oldValue
      );
    case "l2_phase_voltage_angle":
      return getRandomValueDivide8(max, min, oldValue);
    case "l3_phase_current_angle":
      return get_CosPhiL2(
        max,
        min,
        currentTime,
        oldValue
      );
    case "l3_phase_voltage_angle":
      return getRandomValueDivide8(max, min, oldValue);
    case "measured_frequency":
      return getRandomValueDivide8(max, min, oldValue);
    case "neutral_current":
      return get_NeutralCurrent(min, currentTime, oldValue);
    case "output_sttus":
      return get_CurrentI123_InputStatus_OutputSttus_PowerFactorTotalExport_Import(
        max,
        min
      );
    case "PhVphA":
      return getRandomValue(max, min, oldValue, true, deviceId);
    case "PhVphB":
      return getRandomValue(max, min, oldValue, true, deviceId);
    case "PhVphC":
      return getRandomValue(max, min, oldValue, true, deviceId);
    case "power_factor_l1":
      return get_PowerFactorI1(max, min, currentTime, oldValue);
    case "power_factor_l2":
      return get_PowerFactorI23(max, min, currentTime, oldValue);
    case "power_factor_l3":
      return get_PowerFactorI23(max, min, currentTime, oldValue);
    case "power_factor_total":
      return get_PowerFactorI23(max, min, currentTime, oldValue);
    case "power_factor_total_export":
      return get_CurrentI123_InputStatus_OutputSttus_PowerFactorTotalExport_Import(
        max,
        min
      );
    case "power_factor_total_import":
      return get_CurrentI123_InputStatus_OutputSttus_PowerFactorTotalExport_Import(
        max,
        min
      );
    case "PPVphAB":
      return getRandomValue(max, min, oldValue, true, deviceId);
    case "PPVphBC":
      return getRandomValue(max, min, oldValue, true, deviceId);
    case "PPVphCA":
      return getRandomValue(max, min, oldValue, true, deviceId);
    case "quadrant_1_total_reactive_power":
      return get_Quadrant1TotalReactivePower(max, min, currentTime, oldValue);
    case "quadrant_2_total_reactive_power":
      return get_Quadrant2TotalReactivePower(max, min, currentTime, oldValue);
    case "quadrant_3_total_reactive_power":
      return get_Quadrant3TotalReactivePower(max, min, currentTime, oldValue);
    case "quadrant_4_total_reactive_power":
      return get_Quadrant4TotalReactivePower(max, currentTime);
    case "reactive_power_l1":
      return get_ReactivePowerL1(currentTime, oldValue);
    case "reactive_power_l2":
      return get_ReactivePowerL23(currentTime, oldValue);
    case "reactive_power_l3":
      return get_ReactivePowerL23(currentTime, oldValue);
    case "rotation_field":
      return get_Static_Value(min);
    case "total_active_power":
      return get_TotalActivePower_TotalApparentPower_TotalImportApparentPower(
        min,
        currentTime,
        oldValue
      );
    case "total_apparent_power":
      return get_TotalActivePower_TotalApparentPower_TotalImportApparentPower(
        min,
        currentTime,
        oldValue
      );
    case "total_export_active_power":
      return get_TotalExportActivePower(
        max,
        min,
        currentTime,
        oldValue
      );
    case "total_export_apparent_power":
      return get_TotalExportApparentPower(
        max,
        min,
        currentTime,
        oldValue
      );
    case "total_import_active_power":
      return get_TotalImportActivePower(min, currentTime);
    case "total_import_apparent_power":
      return get_TotalActivePower_TotalApparentPower_TotalImportApparentPower(
        min,
        currentTime,
        oldValue
      );
    case "total_reactive_power":
      return get_TotalReactivePower(currentTime);
    case "voltage_unbalance":
      return get_Voltage_Unbalance(deviceId);
    case "consumed_active_energy_l1":
      return get_Consumed_Active_Energy_l1(min, width, currentTime);
    case "consumed_active_energy_l2":
      return get_Consumed_Active_Energy_l2(min, width, currentTime);
    case "consumed_active_energy_l3":
      return get_Consumed_Active_Energy_l3(min, width, currentTime);
    case "total_consumed_active_energy":
      return get_Total_Consumed_Active_Energy(min, width, currentTime);
    case "delivered_active_energy_l1":
      return getCascadingValue(min, width, currentTime);
    case "delivered_active_energy_l2":
      return getCascadingValue(min, width, currentTime);
    case "delivered_active_energy_l3":
      return getCascadingValue(min, width, currentTime);
    case "total_delivered_energy":
      return getCascadingValue(min, width, currentTime);
    case "consumed_apparent_energy_l1":
      return get_Consumed_Apparent_Energy_l1(min, width, currentTime);
    case "consumed_apparent_energy_l2":
      return get_Consumed_Apparent_Energy_l2(min, width, currentTime);
    case "consumed_apparent_energy_l3":
      return get_Consumed_Apparent_Energy_l3(min, width, currentTime);
    case "total_consumed_apparent_energy":
      return get_Total_Consumed_Apparent_Energy(min, width, currentTime);
    case "delivered_apparent_energy_l1":
      return getCascadingValue(min, width, currentTime);
    case "delivered_apparent_energy_l2":
      return getCascadingValue(min, width, currentTime);
    case "delivered_apparent_energy_l3":
      return getCascadingValue(min, width, currentTime);
    case "total_delivered_apparent_energy":
      return getCascadingValue(min, width, currentTime);
    case "quadrant_1_reactive_energy_l1":
      return getCascadingRandomValue(min, width, currentTime);
    case "quadrant_1_reactive_energy_l2":
      return get_Quadrant1ReactiveEnergyL2(min, currentTime);
    case "quadrant_1_reactive_energy_l3":
      return getDoubleCascadingRandomValue(min, width, currentTime);
    case "quadrant_1_total_reactive_energy":
      return getCascadingRandomValue(min, width, currentTime);
    case "quadrant_2_reactive_energy_l1":
      return getRandomWidthValue(min, width, currentTime);
    case "quadrant_2_reactive_energy_l2":
      return get_PulseMeter(min);
    case "quadrant_2_reactive_energy_l3":
      return getRandomWidthValue(min, width, currentTime);
    case "quadrant_2_total_reactive_energy":
      return getRandomWidthValue(min, width, currentTime);
    case "quadrant_3_reactive_energy_l1":
      return getCascadingValue(min, width, currentTime);
    case "quadrant_3_reactive_energy_l2":
      return getCascadingValue(min, width, currentTime);
    case "quadrant_3_reactive_energy_l3":
      return getCascadingValue(min, width, currentTime);
    case "quadrant_3_total_reactive_energy":
      return getCascadingValue(min, width, currentTime);
    case "quadrant_4_reactive_energy_l1":
      return get_Quadrant_4_Reactive_Energy_l1(min, width, currentTime);
    case "quadrant_4_reactive_energy_l2":
      return get_Quadrant_4_Reactive_Energy_l2(min, width, currentTime);
    case "quadrant_4_reactive_energy_l3":
      return get_Quadrant_4_Reactive_Energy_l3(min, width, currentTime);
    case "quadrant_4_total_reactive_energy":
      return get_Quadrant_4_Total_Reactive_Energy(min, width, currentTime);
    case "pulse_meter":
      return get_PulseMeter(min);
    case "total_pulse_meter_input_1":
      return get_PulseMeter(min);
    case "total_pulse_meter_input_2":
      return get_PulseMeter(min);
  }

  // If no matched type is found, skip.
  return 0;
}

// Export the generateCurrentTypeValue function
module.exports = generateCurrentTypeValue;
