const { elements } = require('chart.js');

config = require('./config.json');

// Function to get current time in minutes
const getCurrentTime = () => {
  const currentTime = new Date(); // Get the current date and time
  const hours = currentTime.getHours(); // Get the current hour
  const minutes = currentTime.getMinutes(); // Get the current minute
  return hours * 60 + minutes; // Return the current time as the total time in minutes
};

// Function to get random values for 'active_power_l1n', 'active_power_l2n', 'active_power_l3n'
const get_ActivePowerL123n = (min, currentTime, oldValue) => {
  // Check if the current time is within the low value range (between 2:55 AM and 1:10 PM)
  if (currentTime > 295 && currentTime < 930) {
    const minValue = min;
    const maxValue = 1.1 * min;
    if (!oldValue) {
      oldValue = minValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue; // Return a random low value within a minimum value range
  } else {
    // If the current time is main hours, calculate active power based on a polynomial function
    if (currentTime >= 930)
      currentTime = currentTime - 930; // Normalize time if it's after 1:10 PM
    else if (currentTime <= 295) currentTime = currentTime + 510; // Normalize time if it's before 2:55 AM

    // Calculate active power using a polynomial equation
    return (
      3.0223 * Math.pow(10, -19) * Math.pow(currentTime, 9) -
      1.13552 * Math.pow(10, -15) * Math.pow(currentTime, 8) +
      1.7714 * Math.pow(10, -12) * Math.pow(currentTime, 7) -
      1.4712 * Math.pow(10, -9) * Math.pow(currentTime, 6) +
      6.9036 * Math.pow(10, -7) * Math.pow(currentTime, 5) -
      0.00017616 * Math.pow(currentTime, 4) +
      0.01964 * Math.pow(currentTime, 3) -
      0.1059 * Math.pow(currentTime, 2) +
      89.9 * currentTime -
      1674
    );
  }
};

// Function to get random values for 'AphA', 'AphB', 'AphC'
const get_AphABC = (min, currentTime, oldValue) => {
  if (currentTime > 270 && currentTime < 950) {
    const minValue = min;
    const maxValue = 1.05 * min;
    if (!oldValue) {
      oldValue = minValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  } else {
    if (currentTime >= 950) currentTime = currentTime - 950;
    else if (currentTime <= 270) currentTime = currentTime + 490;
    return (
      5.1285 * Math.pow(10, -21) * Math.pow(currentTime, 9) -
      1.9351 * Math.pow(10, -17) * Math.pow(currentTime, 8) +
      3.0486 * Math.pow(10, -14) * Math.pow(currentTime, 7) -
      2.5845 * Math.pow(10, -11) * Math.pow(currentTime, 6) +
      1.2661 * Math.pow(10, -8) * Math.pow(currentTime, 5) -
      3.5682 * Math.pow(10, -6) * Math.pow(currentTime, 4) +
      0.0005369 * Math.pow(currentTime, 3) -
      0.03767 * Math.pow(currentTime, 2) +
      2.4876 * currentTime -
      11.7124
    );
  }
};

// Function to get random values for 'apparent_power_l1n', 'apparent_power_l2n', 'apparent_power_l3n'
const get_ApparentPowerL123n = (min, currentTime, oldValue) => {
  if (currentTime > 280 && currentTime < 950) {
    const minValue = min;
    const maxValue = 1.1 * min;
    if (!oldValue) {
      oldValue = minValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  } else {
    if (currentTime >= 950) currentTime = currentTime - 950;
    else if (currentTime <= 280) currentTime = currentTime + 490;
    return (
      6.425 * Math.pow(10, -19) * Math.pow(currentTime, 9) -
      2.423 * Math.pow(10, -15) * Math.pow(currentTime, 8) +
      3.818 * Math.pow(10, -12) * Math.pow(currentTime, 7) -
      3.238 * Math.pow(10, -9) * Math.pow(currentTime, 6) +
      1.587 * Math.pow(10, -6) * Math.pow(currentTime, 5) -
      0.0004476 * Math.pow(currentTime, 4) +
      0.067382 * Math.pow(currentTime, 3) -
      4.714 * Math.pow(currentTime, 2) +
      308.1254 * currentTime -
      1199.88
    );
  }
};

// Function to get random values for 'cos_phi_l1'
const get_CosPhiL1 = (
  max,
  min,
  currentTime,
  oldValue
) => {
  if ((currentTime >= 1415 && currentTime <= 1439) || (currentTime >= 0 && currentTime < 180)) {
    const minValue = min;
    const maxValue = 1;
    if (!oldValue) {
      oldValue = maxValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  } else if (currentTime >= 180 && currentTime < 800) {
    const minValue = max - 1;
    const maxValue = max;
    if (!oldValue) {
      oldValue = minValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  } else {
    if (Math.random() < 0.99) {
      const minValue = max - 1;
      const maxValue = max;
      if (!oldValue) {
        oldValue = minValue;
      }
      oldValue = randomValueGenerator(minValue, maxValue, oldValue);
      return oldValue;
    } else {return min}
  }
};

// Function to get random values for 'cos_phi_l2', 'l3_phase_current_angle'
const get_CosPhiL2 = (
  max,
  min,
  currentTime,
  oldValue
) => {
  if ((currentTime >= 800 && currentTime <1440) || (currentTime >= 0 && currentTime < 180)) {
    const minValue = min;
    const maxValue = 1;
    if (!oldValue) {
      oldValue = maxValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  } else {
    const minValue = max - 1;
    const maxValue = max;
    if (!oldValue) {
      oldValue = minValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  }
}

// Function to get random values for 'cos_phi_l3', 'cos_phi_total', 'current_unbalance'
const get_CosPhiL3Total = (
  max,
  min,
  currentTime,
  oldValue
) => {
  if ((currentTime >= 810 && currentTime < 1440) || (currentTime >= 0 && currentTime < 60)) {
    const minValue = max - 1;
    const maxValue = max;
    if (!oldValue) {
      oldValue = minValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  } else if ((currentTime >= 60 && currentTime < 190) || (currentTime >= 660 && currentTime < 810)) {
    if (Math.random() < 0.05) {
      const minValue = max - 1;
      const maxValue = max;
      if (!oldValue) {
        oldValue = minValue;
      }
      oldValue = randomValueGenerator(minValue, maxValue, oldValue);
      return oldValue;
    } else {
      const minValue = min;
      const maxValue = 1;
      if (!oldValue) {
        oldValue = maxValue;
      }
      oldValue = randomValueGenerator(minValue, maxValue, oldValue);
      return oldValue;
    }
  } else {
    const minValue = min;
    const maxValue = 1;
    if (!oldValue) {
      oldValue = maxValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  }
}

// Function to get random values for 'l1_phase_current_angle'
const get_L1PhaseCurrentAngle = (
  max,
  min,
  currentTime,
  oldValue
) => {
  if (currentTime >= 840 && currentTime < 1245) {
    if (Math.random() < 0.95) {
      const minValue = min;
      const maxValue = 175.5;
      if (!oldValue) {
        oldValue = maxValue;
      }
      oldValue = randomValueGenerator(minValue, maxValue, oldValue);
      return oldValue;
    } else {
      const minValue = max - 2;
      const maxValue = max;
      if (!oldValue) {
        oldValue = minValue;
      }
      oldValue = randomValueGenerator(minValue, maxValue, oldValue);
      return oldValue;
    }
  } else if (currentTime >= 1245 && currentTime < 1405) {
    if (Math.random() < 0.9) {
      const minValue = min;
      const maxValue = 175.5;
      if (!oldValue) {
        oldValue = maxValue;
      }
      oldValue = randomValueGenerator(minValue, maxValue, oldValue);
      return oldValue;
    } else {
      const minValue = max - 2;
      const maxValue = max;
      if (!oldValue) {
        oldValue = minValue;
      }
      oldValue = randomValueGenerator(minValue, maxValue, oldValue);
      return oldValue;
    }
  } else if ((currentTime >= 1405 && currentTime < 1440) || (currentTime >= 0 && currentTime < 205)) {
    const minValue = max - 2;
    const maxValue = max;
    if (!oldValue) {
      oldValue = minValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  } else {
    const minValue = min;
    const maxValue = 175.5;
    if (!oldValue) {
      oldValue = maxValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  }
}

// Function to get random values for 'l2_phase_current_angle'
const get_L23PhaseCurrentAngle = (
  max,
  min,
  currentTime,
  oldValue
) => {
  if (currentTime >= 270 && currentTime < 950) {
    const minValue = max - 1;
    const maxValue = max;
    if (!oldValue) {
      oldValue = maxValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue; // Return a random high value within a maximum value range
  } else {
    const minValue = min;
    const maxValue = min * 1.1;
    if (!oldValue) {
      oldValue = minValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  }
}

// Function to get random values for 'current_l1', 'current_l2', 'current_l3', 'input_status', 'output_sttus', 'power_factor_total_export', 'power_factor_total_import'
const get_CurrentI123_InputStatus_OutputSttus_PowerFactorTotalExport_Import = (
  max,
  min
) => {
  return max - min;
};

// Function to return specific value
const get_Static_Value = (val) => {
  return val;
};

// Function to get random values for 'hour_meter'
const get_HourMeter = (currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  return (
    1095 + ((month - 1) * 43200 + (day - 1) * 1440 + currentTime - 169920) / 60
  );
};

// Function to get random values for 'l1_phase_voltage_angle', 'PhVphA', 'PhVphB', 'PhVphC', 'PPVphAB', 'PPVphBC',  'PPVphCA'
let PPV_Cache = Array.from({ length: config.devices.length }, () => [0, 0, 0]);

const getRandomValue = (
  max,
  min,
  oldValue,
  is_required_for_voltage_unbalance,
  deviceId
) => {
  if (!oldValue) {
    oldValue = min;
  }

  oldValue = randomValueGenerator(min, max, oldValue);

  // Update the cache
  // Voltage Unbalance should only be calculated for PPV values of unit 'V'.
  if (
    is_required_for_voltage_unbalance &&
    is_required_for_voltage_unbalance == true
  ) {
    PPV_Cache[deviceId - 1] = [...PPV_Cache[deviceId - 1].slice(1), oldValue];
  }

  return oldValue;
};

const get_Voltage_Unbalance = (deviceId) => {
  const V_Avg = PPV_Cache[deviceId - 1].reduce((a, b) => a + b) / PPV_Cache[deviceId - 1].length;
  const V_Max = V_Avg - Math.min(...PPV_Cache[deviceId - 1]);
  if (V_Avg == 0) return V_Avg;
  return (V_Max / V_Avg) * 100;
};

// Function to get random values for 'l2_phase_voltage_angle', 'l3_phase_voltage_angle', 'measured_frequency'
const getRandomValueDivide8 = (
  max,
  min,
  oldValue,
) => {
  if (!oldValue) {
    oldValue = min;
  }

  oldValue = randomValueGeneratorDivide8(min, max, oldValue);
  return oldValue;
}

// Function to get random values for 'neutral_current'
const get_NeutralCurrent = (min, currentTime, oldValue) => {
  if (currentTime > 240 && currentTime < 1020) {
    oldValue = min + Math.random() * 2;
    return oldValue;
  } else {
    if (currentTime >= 1020) currentTime = currentTime - 1020;
    else if (currentTime <= 240) currentTime = currentTime + 420;
    return (
      7.0258 * Math.pow(10, -22) * Math.pow(currentTime, 9) -
      2.208 * Math.pow(10, -18) * Math.pow(currentTime, 8) +
      2.8768 * Math.pow(10, -15) * Math.pow(currentTime, 7) -
      2.0055 * Math.pow(10, -12) * Math.pow(currentTime, 6) +
      8.047 * Math.pow(10, -10) * Math.pow(currentTime, 5) -
      1.8571 * Math.pow(10, -7) * Math.pow(currentTime, 4) +
      2.313 * Math.pow(10, -5) * Math.pow(currentTime, 3) -
      0.00137 * Math.pow(currentTime, 2) +
      0.06079 * currentTime +
      2.3388 -
      2
    );
  }
};

// Function to get random values for 'power_factor_l1'
const get_PowerFactorI1 = (max, min, currentTime, oldValue) => {
  if ((currentTime >= 1405 && currentTime < 1440) || (currentTime >= 0 && currentTime < 205)) {
    const minValue = min;
    const maxValue = 1;
    if (!oldValue) {
      oldValue = minValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  } else if (currentTime >= 205 && currentTime < 830) {
    const minValue = max - 1;
    const maxValue = max;
    if (!oldValue) {
      oldValue = maxValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  } else if (currentTime >= 830 && currentTime < 1250) {
    if (Math.random() < 0.98) {
      const minValue = max - 1;
      const maxValue = max;
      if (!oldValue) {
        oldValue = minValue;
      }
      oldValue = randomValueGenerator(minValue, maxValue, oldValue);
      return oldValue;
    } else {
      const minValue = min;
      const maxValue = 1;
      if (!oldValue) {
        oldValue = minValue;
      }
      oldValue = randomValueGenerator(minValue, maxValue, oldValue);
      return oldValue;
    }
  } else {
    if (Math.random() < 0.9) {
      const minValue = max - 1;
      const maxValue = max;
      if (!oldValue) {
        oldValue = minValue;
      }
      oldValue = randomValueGenerator(minValue, maxValue, oldValue);
      return oldValue;
    } else {
      const minValue = min;
      const maxValue = 1;
      if (!oldValue) {
        oldValue = minValue;
      }
      oldValue = randomValueGenerator(minValue, maxValue, oldValue);
      return oldValue;
    }
  }
}

// Function to get random values for 'power_factor_l2', 'power_factor_l3', 'power_factor_total'
const get_PowerFactorI23 = (max, min, currentTime, oldValue) => {
  if (currentTime >= 165 && currentTime < 360) {
    if (Math.random() < 0.95) {
      const minValue = min;
      const maxValue = 1;
      if (!oldValue) {
        oldValue = minValue;
      }
      oldValue = randomValueGenerator(minValue, maxValue, oldValue);
      return oldValue;
    } else {return max}
    
  } else {
    const minValue = max - 1;
    const maxValue = max;
    if (!oldValue) {
      oldValue = maxValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  }
};

// Function to get random values for 'quadrant_1_total_reactive_power'
const get_Quadrant1TotalReactivePower = (max, min, currentTime, oldValue) => {
  if (currentTime >= 295 && currentTime < 1390) {
    if (Math.random() < 0.99) {
      return min;
    } else {
      const minValue = min;
      const maxValue = min + 500;
      if (!oldValue) {
        oldValue = minValue;
      }
      oldValue = randomValueGenerator(minValue, maxValue, oldValue);
      return oldValue;
    }
  }
  else if (currentTime >= 1390) {
    return min + (max - min)*(currentTime - 1390)/100 + Math.random() * 500;
  } else {
    return (max - min) * (currentTime + 50) / 600 + Math.random() * 750;
  }
};

// Function to get random values for 'quadrant_2_total_reactive_power'
const get_Quadrant2TotalReactivePower = (max, min, currentTime, oldValue) => {
  if (currentTime >= 280 && currentTime <325) {
    const minValue = max * 0.25;
    const maxValue = max;
    oldValue = minValue + Math.random() * (maxValue - minValue);
    return oldValue;
  } else return min;
}

// Function to get random values for 'quadrant_3_total_reactive_power'
const get_Quadrant3TotalReactivePower = (max, min, currentTime, oldValue) => {
  if (currentTime >= 270 && currentTime < 950) {
    const minValue = min;
    const maxValue = 0.8 * min;
    if (!oldValue) {
      oldValue = minValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  } else {
    return max;
  }
};

// Function to get random values for 'quadrant_4_total_reactive_power'
const get_Quadrant4TotalReactivePower = (max, currentTime) => {
  if (currentTime > 300 && currentTime < 920) {
    return max;
  } else {
    if (currentTime >= 920) currentTime = currentTime - 920;
    else if (currentTime <= 300) currentTime = currentTime + 520;
    return (
      2.042 * Math.pow(10, -15) * Math.pow(currentTime, 7) -
      4.316 * Math.pow(10, -12) * Math.pow(currentTime, 6) +
      2.612 * Math.pow(10, -9) * Math.pow(currentTime, 5) +
      2.479 * Math.pow(10, -8) * Math.pow(currentTime, 4) -
      0.0004089 * Math.pow(currentTime, 3) +
      0.09118 * Math.pow(currentTime, 2) -
      14.35 * currentTime -
      763.9 +
      Math.random() * 1000 -
      500
    );
  }
}

// Function to get random values for 'reactive_power_l1'
const get_ReactivePowerL1 = (currentTime, oldValue) => {
  if (currentTime > 285 && currentTime < 980) {
    const minValue = -142;
    const maxValue = -30;
    if (!oldValue) {
      oldValue = minValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  } else {
    if (currentTime >= 980) currentTime = currentTime - 980;
    else if (currentTime <= 285) currentTime = currentTime + 460;
    return (
      -1.7976 * Math.pow(10, -19) * Math.pow(currentTime, 9) +
      6.1373 * Math.pow(10, -16) * Math.pow(currentTime, 8) -
      8.752 * Math.pow(10, -13) * Math.pow(currentTime, 7) +
      6.7544 * Math.pow(10, -10) * Math.pow(currentTime, 6) -
      3.0555 * Math.pow(10, -7) * Math.pow(currentTime, 5) +
      8.1935 * Math.pow(10, -5) * Math.pow(currentTime, 4) -
      0.012503 * Math.pow(currentTime, 3) +
      0.9797 * Math.pow(currentTime, 2) -
      35.5359 * currentTime +
      437.7 +
      Math.random() *
      500
    );
  }
};

// Function to get random values for 'reactive_power_l2', 'reactive_power_l3'
const get_ReactivePowerL23 = (currentTime, oldValue) => {
  if (currentTime > 285 && currentTime < 945) {
    const minValue = -650;
    const maxValue = -550;
    if (!oldValue) {
      oldValue = minValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  } else {
    if (currentTime >= 945) currentTime = currentTime - 945;
    else if (currentTime <= 285) currentTime = currentTime + 495;
    return (
      -6.4607 * Math.pow(10, -20) * Math.pow(currentTime, 9) +
      2.3664 * Math.pow(10, -16) * Math.pow(currentTime, 8) -
      3.5806 * Math.pow(10, -13) * Math.pow(currentTime, 7) +
      2.8853 * Math.pow(10, -10) * Math.pow(currentTime, 6) -
      1.3301 * Math.pow(10, -7) * Math.pow(currentTime, 5) +
      3.494 * Math.pow(10, -5) * Math.pow(currentTime, 4) -
      0.004849 * Math.pow(currentTime, 3) +
      0.2941 * Math.pow(currentTime, 2) -
      10.0178 * currentTime -
      540.9 +
      Math.random() *
      400
    );
  }
};

// Function to get random values for 'total_active_power', 'total_apparent_power', 'total_import_apparent_power'
const get_TotalActivePower_TotalApparentPower_TotalImportApparentPower = (
  min,
  currentTime,
  oldValue
) => {
  if (currentTime > 300 && currentTime < 930) {
    const minValue1 = min;
    const maxValue1 = 1.1 * min;
    if (!oldValue) {
      oldValue = minValue1;
    }
    oldValue = randomValueGenerator(minValue1, maxValue1, oldValue);
    return oldValue;
  } else {
    if (currentTime >= 930) currentTime = currentTime - 930;
    else if (currentTime <= 300) currentTime = currentTime + 510;
    return (
      7.136 * Math.pow(10, -19) * Math.pow(currentTime, 9) -
      3.01 * Math.pow(10, -15) * Math.pow(currentTime, 8) +
      5.251 * Math.pow(10, -12) * Math.pow(currentTime, 7) -
      4.873 * Math.pow(10, -9) * Math.pow(currentTime, 6) +
      2.573 * Math.pow(10, -6) * Math.pow(currentTime, 5) -
      0.000761244 * Math.pow(currentTime, 4) +
      0.1125 * Math.pow(currentTime, 3) -
      6.078 * Math.pow(currentTime, 2) +
      508.5 * currentTime -
      6970 +
      Math.random() * 1000 -
      500
    );
  }
};

// Function to get random values for 'total_export_active_power'
const get_TotalExportActivePower = (
  max,
  min,
  currentTime,
  oldValue
) => {
  if (currentTime >= 290 && currentTime < 330) {
    return max - (max - min)/40 * (currentTime - 290) - Math.random() * 100
  } else if (currentTime >= 330 && currentTime < 895) {
    const minValue = -3400;
    const maxValue = minValue * 0.9;
    if (!oldValue) {
      oldValue = minValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  } else if (currentTime >= 895 && currentTime < 930) {
    return - 3100 + (3100 - max)/35 * (currentTime - 895) - Math.random() * 100;
  } else return max;
};

// Function to get random values for 'total_export_apparent_power'
const get_TotalExportApparentPower = (
  max,
  min,
  currentTime,
  oldValue
) => {
  if (currentTime >= 280 && currentTime < 930) {
    const minValue = max * 0.9;
    const maxValue = max;
    if (!oldValue) {
      oldValue = minValue;
    }
    oldValue = randomValueGenerator(minValue, maxValue, oldValue);
    return oldValue;
  } else return min;
}

// Function to get random values for 'total_import_active_power'
const get_TotalImportActivePower = (min, currentTime) => {
  if (currentTime > 270 && currentTime < 945) {
    return min;
  } else {
    if (currentTime >= 945) currentTime = currentTime - 945;
    else if (currentTime <= 270) currentTime = currentTime + 495;
    return (
      1.4857 * Math.pow(10, -21) * Math.pow(currentTime, 9) -
      5.767 * Math.pow(10, -18) * Math.pow(currentTime, 8) +
      9.3349 * Math.pow(10, -15) * Math.pow(currentTime, 7) -
      8.1186 * Math.pow(10, -12) * Math.pow(currentTime, 6) +
      4.0717 * Math.pow(10, -9) * Math.pow(currentTime, 5) -
      1.1707 * Math.pow(10, -6) * Math.pow(currentTime, 4) +
      0.0001782 * Math.pow(currentTime, 3) -
      0.01237 * Math.pow(currentTime, 2) +
      0.8673 * currentTime -
      6.495 +
      Math.random() * 5
    );
  }
};

// Function to get random values for 'total_reactive_power'
const get_TotalReactivePower = (currentTime) => {
  if (currentTime > 175 && currentTime < 575) {
    return -1000 + Math.random() * 100;
  } else {
    if (currentTime >= 575) currentTime = currentTime - 575;
    else if (currentTime <= 175) currentTime = currentTime + 865;
    return (
      -1.5945 * Math.pow(10, -20) * Math.pow(currentTime, 9) +
      7.67458 * Math.pow(10, -17) * Math.pow(currentTime, 8) -
      1.5417 * Math.pow(10, -13) * Math.pow(currentTime, 7) +
      1.6735 * Math.pow(10, -10) * Math.pow(currentTime, 6) -
      1.0615 * Math.pow(10, -7) * Math.pow(currentTime, 5) +
      3.9627 * Math.pow(10, -5) * Math.pow(currentTime, 4) -
      0.008243 * Math.pow(currentTime, 3) +
      0.823 * Math.pow(currentTime, 2) -
      36.8574 * currentTime -
      591.5 +
      Math.random() *
      1500
    );
  }
};

const randomValueGenerator = (minValue, maxValue, preValue) => {
  // Calculate the random value
  const randomValue = (Math.random() * (maxValue - minValue)) / 20;
  // Randomly decide to add or subtract the random value
  let sign;

  // Adjust sign if val is out of bounds
  if (preValue >= maxValue) sign = -1;
  else if (preValue <= minValue) sign = 1;
  else sign = Math.random() < 0.5 ? -1 : 1;

  // Update val with the calculated value
  preValue += sign * randomValue;

  // Ensure val stays within bounds
  if (preValue >= maxValue) preValue = maxValue;
  else if (preValue <= minValue) preValue = minValue;

  return preValue;
};

const randomValueGeneratorDivide8 = (minValue, maxValue, preValue) => {
  // Calculate the random value
  const randomValue = (maxValue - minValue) / 8;
  // Randomly decide to add or subtract the random value
  let sign1;

  // Adjust sign if val is out of bounds
  if (preValue >= maxValue) sign1 = -1;
  else if (preValue <= minValue) sign1 = 1;
  else sign1 = Math.random() < 0.5 ? -1 : 1;

  // Update val with the calculated value
  preValue += sign1 * randomValue;

  // Ensure val stays within bounds
  if (preValue >= maxValue) preValue = maxValue;
  else if (preValue <= minValue) preValue = minValue;

  return preValue;
};

// Function to get random values for 'delivered_active_energy_l1', 'delivered_active_energy_l2', 'delivered_active_energy_l3', 'total_delivered_energy', 'delivered_apparent_energy_l1', 
//                                   'delivered_apparent_energy_l2', 'delivered_apparent_energy_l3', 'total_delivered_apparent_energy', 'quadrant_3_reactive_energy_l1', 
//                                   'quadrant_3_reactive_energy_l2', 'quadrant_3_reactive_energy_l3', 'quadrant_3_total_reactive_energy'
const getCascadingValue = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 168) * width;

  if (currentTime >= 0 && currentTime < 645) {
    return zeroDateAverageValue + (currentTime + 10) * (width / 655)
  } else if ( currentTime >= 1430 && currentTime < 1440) {
    return zeroDateAverageValue + (currentTime - 1430) * (width / 655) + width
  }
  else return zeroDateAverageValue + width;
}

// Function to get static values for 'pulse', 'total_pulse_meter_input_1', 'total_pulse_meter_input_2', 'quadrant_2_reactive_energy_l2'
const get_PulseMeter = (min) => {
  return min
}

// Function to get random values for 'quadrant_1_reactive_energy_l2'
const get_Quadrant1ReactiveEnergyL2 = (min, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  if (currentTime >= 95 && currentTime < 1440) {
    return min + ((month - 6) * 30 + (day -19)) * 1
  } else {
    return min + ((month - 6) * 30 + (day -20)) * 1
  }
}

// Function to get random values for 'quadrant_1_reactive_energy_l1', 'quadrant_1_total_reactive_energy'
const getCascadingRandomValue = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 168) * width;

  if (currentTime >= 0 && currentTime < 170) {
    return zeroDateAverageValue + (currentTime + 30) * (width / 200) + Math.random() * 100
  } else if ( currentTime >= 1410 && currentTime < 1440) {
    return zeroDateAverageValue + (currentTime - 1410) * (width / 200) + Math.random() * 100 + width
  }
  else return zeroDateAverageValue + width;
}

// Function to get random values for 'quadrant_1_reactive_energy_l3'
const getDoubleCascadingRandomValue = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 168) * width;

  if (currentTime >= 1320 && currentTime < 1430) {
    return zeroDateAverageValue + (width * 0.3) + Math.random() * 3
  } else if (currentTime >= 1430 && currentTime < 1440) {
    return zeroDateAverageValue + width
  } else return zeroDateAverageValue
}

// Function to get random values for 'quadrant_2_reactive_energy_l1', 'quadrant_2_reactive_energy_l3', 'quadrant_2_total_reactive_energy'
const getRandomWidthValue = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 168) * width;

  if (currentTime >= 0 && currentTime < 1430) {
    return zeroDateAverageValue
  } else return zeroDateAverageValue + width
}

// Function to get random values for 'consumed_active_energy_l1'
const get_Consumed_Active_Energy_l1 = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 169) * width;

  if (currentTime >= 590 && currentTime < 1380) {
    currentTime = currentTime - 590;
    return -0.001741 * Math.pow(currentTime, 3) +
    2.159 * Math.pow(currentTime, 2) -
    211.7 * currentTime +
    2.553 * Math.pow(10, 7) - 
    min + zeroDateAverageValue
  } else if (currentTime >= 1380 && currentTime < 1440) {
    return zeroDateAverageValue + width
  } else return zeroDateAverageValue
}

// Function to get random values for 'consumed_active_energy_l2'
const get_Consumed_Active_Energy_l2 = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 169) * width;

  if (currentTime >= 590 && currentTime < 1380) {
    currentTime = currentTime - 590;
    return -0.0019 * Math.pow(currentTime, 3) +
    2.289 * Math.pow(currentTime, 2) -
    205.9203 * currentTime +
    2.6147 * Math.pow(10, 7) - 
    min + zeroDateAverageValue
  } else if (currentTime >= 1380 && currentTime < 1440) {
    return zeroDateAverageValue + width
  } else return zeroDateAverageValue
}

// Function to get random values for 'consumed_active_energy_l3'
const get_Consumed_Active_Energy_l3 = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 169) * width;

  if (currentTime >= 590 && currentTime < 1380) {
    currentTime = currentTime - 590;
    return -0.0017 * Math.pow(currentTime, 3) +
    2.0525 * Math.pow(currentTime, 2) -
    151.2005 * currentTime +
    2.546 * Math.pow(10, 7) - 
    min + zeroDateAverageValue
  } else if (currentTime >= 1380 && currentTime < 1440) {
    return zeroDateAverageValue + width
  } else return zeroDateAverageValue
}

// Function to get random values for 'total_consumed_active_energy'
const get_Total_Consumed_Active_Energy = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 169) * width;

  if (currentTime >= 590 && currentTime < 1380) {
    currentTime = currentTime - 590;
    return -0.0057 * Math.pow(currentTime, 3) +
    6.8646 * Math.pow(currentTime, 2) -
    652.4642 * currentTime +
    7.7140 * Math.pow(10, 7) - 
    min + zeroDateAverageValue
  } else if (currentTime >= 1380 && currentTime < 1440) {
    return zeroDateAverageValue + width
  } else return zeroDateAverageValue
}

// Function to get random values for 'consumed_apparent_energy_l1'
const get_Consumed_Apparent_Energy_l1 = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 169) * width;

  if (currentTime >= 590 && currentTime < 1380) {
    currentTime = currentTime - 590;
    return -0.0019 * Math.pow(currentTime, 3) +
    2.2751 * Math.pow(currentTime, 2) -
    209.2141 * currentTime +
    2.5608 * Math.pow(10, 7) - 
    min + zeroDateAverageValue
  } else if (currentTime >= 1380 && currentTime < 1440) {
    return zeroDateAverageValue + width
  } else return zeroDateAverageValue
}

// Function to get random values for 'consumed_apparent_energy_l2'
const get_Consumed_Apparent_Energy_l2 = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 169) * width;

  if (currentTime >= 590 && currentTime < 1380) {
    currentTime = currentTime - 590;
    return -0.0019 * Math.pow(currentTime, 3) +
    2.3006 * Math.pow(currentTime, 2) -
    218.2534 * currentTime +
    2.6272 * Math.pow(10, 7) - 
    min + zeroDateAverageValue
  } else if (currentTime >= 1380 && currentTime < 1440) {
    return zeroDateAverageValue + width
  } else return zeroDateAverageValue
}

// Function to get random values for 'consumed_apparent_energy_l3'
const get_Consumed_Apparent_Energy_l3 = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 169) * width;

  if (currentTime >= 590 && currentTime < 1380) {
    currentTime = currentTime - 590;
    return -0.00172 * Math.pow(currentTime, 3) +
    2.0824 * Math.pow(currentTime, 2) -
    159.6135 * currentTime +
    2.5572 * Math.pow(10, 7) - 
    min + zeroDateAverageValue
  } else if (currentTime >= 1380 && currentTime < 1440) {
    return zeroDateAverageValue + width
  } else return zeroDateAverageValue
}

// Function to get random values for 'total_consumed_apparent_energy'
const get_Total_Consumed_Apparent_Energy = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 169) * width;

  if (currentTime >= 590 && currentTime < 1380) {
    currentTime = currentTime - 590;
    return -0.0056 * Math.pow(currentTime, 3) +
    6.8533 * Math.pow(currentTime, 2) -
    680.9487 * currentTime +
    7.7455 * Math.pow(10, 7) - 
    min + zeroDateAverageValue
  } else if (currentTime >= 1380 && currentTime < 1440) {
    return zeroDateAverageValue + width
  } else return zeroDateAverageValue
}

// Function to get random values for 'quadrant_4_reactive_energy_l1'
const get_Quadrant_4_Reactive_Energy_l1 = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 169) * width;

  if (currentTime >= 825 && currentTime < 1440) {
    currentTime = currentTime - 825;
    return 0.0001 * Math.pow(currentTime, 3) -
    0.0098 * Math.pow(currentTime, 2) -
    1.0922 * currentTime +
    2.6111 * Math.pow(10, 5) - 
    min + zeroDateAverageValue
  } else return zeroDateAverageValue
}

// Function to get random values for 'quadrant_4_reactive_energy_l2'
const get_Quadrant_4_Reactive_Energy_l2 = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 169) * width;

  if (currentTime >= 590 && currentTime < 1380) {
    currentTime = currentTime - 590;
    return -7.1989 * Math.pow(10, -5) * Math.pow(currentTime, 3) +
    0.0796 * Math.pow(currentTime, 2) +
    0.9108 * currentTime +
    1.2319 * Math.pow(10, 6) - 
    min + zeroDateAverageValue
  } else if (currentTime >= 1380 && currentTime < 1440) {
    return zeroDateAverageValue + width
  } else return zeroDateAverageValue
}

// Function to get random values for 'quadrant_4_reactive_energy_l3'
const get_Quadrant_4_Reactive_Energy_l3 = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 169) * width;

  if (currentTime >= 590 && currentTime < 1380) {
    currentTime = currentTime - 590;
    return -6.5612 * Math.pow(10, -5) * Math.pow(currentTime, 3) +
    0.0852 * Math.pow(currentTime, 2) -
    10.2877 * currentTime +
    1.0651 * Math.pow(10, 6) - 
    min + zeroDateAverageValue
  } else if (currentTime >= 1380 && currentTime < 1440) {
    return zeroDateAverageValue + width
  } else return zeroDateAverageValue
}

// Function to get random values for 'quadrant_4_total_reactive_energy'
const get_Quadrant_4_Total_Reactive_Energy = (min, width, currentTime) => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const zeroDateAverageValue = min + ((month - 1) * 30 + day - 1 - 169) * width;

  if (currentTime >= 590 && currentTime < 1380) {
    currentTime = currentTime - 590;
    return -1.8351 * Math.pow(10, -4) * Math.pow(currentTime, 3) +
    0.2154 * Math.pow(currentTime, 2) -
    16.5498 * currentTime +
    2.5584 * Math.pow(10, 6) - 
    min + zeroDateAverageValue
  } else if (currentTime >= 1380 && currentTime < 1440) {
    return zeroDateAverageValue + width
  } else return zeroDateAverageValue
}

module.exports = {
  getCurrentTime,
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
};
