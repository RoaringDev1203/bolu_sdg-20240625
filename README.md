# Synthetic Data Generator for LAPIS

This is a data simulator script to generate real device data in LAPIS.

## Setup

To set up the script, follow these steps:

1. Configure the environment variables in the `.env` file:

   - `ENABLE_PUSH`: Set to `1` to enable pushing data to LAPIS API, or `0` to disable it.
   - `API_URL`: The URL of the LAPIS API.
   - `PORT`: The port number to run the server on.
   - `AUTH_TOKEN`: The authentication token required for accessing the LAPIS API.

2. Add a new device or update device configurations in the `config.json` file.

3. Install the required packages by running one of the following commands:

```bash
    npm install
```

or

```bash
    yarn install
```

## Run

```bash
    npm start
```

or

```bash
    yarn start
```

### Process

- If the script is run, it sends the current value for each measurement type to the server every 1 minute.

- If the configuration includes working time, the script generates the expected value in that time but in else that time generates only the minimum value.

- And because the generated value is random, it can be over the minimum and maximum value of the configuration.In that case, the script ignores the generated value and overwrites the minimum and maximum values there.

### Test Generation Function

You can also test the data generation function individually using the `test.js` script.

To do this, run the following command:

```bash
    node test.js <measurement> <min> <max>
```

- This script will generate csv file named test*result*[measurement].csv

Note: If the measurement name is not correct, the error message occurs and does not generate a CSV file.
So to test, write the correct name of the measurement list.
The range of 'min' and 'max' is between 0 and 1439.


.............................................................
This readme file provides detailed instructions on setting up and running the synthetic data generator for LAPIS.
