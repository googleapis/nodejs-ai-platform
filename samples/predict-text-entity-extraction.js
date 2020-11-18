/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

async function main(filename, endpointId, project, location = 'us-central1') {
  // [START aiplatform_predict_text_entity_extraction]
  /**
   * TODO(developer): Uncomment these variables before running the sample.\
   * (Not necessary if passing values as arguments)
   */

  // const filename = "YOUR_PREDICTION_FILE_NAME";
  // const endpointId = "YOUR_ENDPOINT_ID";
  // const project = 'YOUR_PROJECT_ID';
  // const location = 'YOUR_PROJECT_LOCATION';

  // Imports the Google Cloud Prediction Service Client library
  const {PredictionServiceClient} = require('@google-cloud/aiplatform');

  // Specifies the location of the api endpoint
  const clientOptions = {
    apiEndpoint: 'us-central1-prediction-aiplatform.googleapis.com',
  };

  // Instantiates a client
  const predictionServiceClient = new PredictionServiceClient(clientOptions);

  async function predictTextEntityExtraction() {
    // Configure the endpoint resource
    const endpoint = `projects/${project}/locations/${location}/endpoints/${endpointId}`;
    const parameters = {
      structValue: {
        fields: {
          confidenceThreshold: {numberValue: 0.5},
          maxPredictions: {numberValue: 5},
        },
      },
    };

    const fs = require('fs');
    const text = fs.readFileSync(filename, 'utf8');
    const instance = {
      structValue: {
        fields: {
          content: {
            stringValue: text,
          },
        },
      },
    };

    const instances = [instance];
    const request = {
      endpoint,
      instances,
      parameters,
    };

    // Predict request
    const [response] = await predictionServiceClient.predict(request);

    console.log('Predict text entity extraction response :');
    console.log(`\tDeployed model id : ${response.deployedModelId}`);
    const predictions = response.predictions;
    console.log('\tPredictions :');
    for (const prediction of predictions) {
      console.log(`\t\tPrediction : ${JSON.stringify(prediction)}`);
    }
  }
  await predictTextEntityExtraction();
  // [END aiplatform_predict_text_entity_extraction]
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err);
  process.exitCode = 1;
});
