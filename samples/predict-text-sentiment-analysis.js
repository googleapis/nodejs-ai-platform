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

async function main(text, endpointId, project, location = 'us-central1') {
  // [START aiplatform_predict_text_entity_extraction]
  /**
   * TODO(developer): Uncomment these variables before running the sample.\
   * (Not necessary if passing values as arguments)
   */

  // const text = "YOUR_PREDICTION_TEXT";
  // const endpointId = "YOUR_ENDPOINT_ID";
  // const project = 'YOUR_PROJECT_ID';
  // const location = 'YOUR_PROJECT_LOCATION';
  const aiplatform = require('@google-cloud/aiplatform');
  const {
    instance,
    prediction,
  } = aiplatform.protos.google.cloud.aiplatform.v1beta1.schema.predict;

  // Imports the Google Cloud Model Service Client library
  const {PredictionServiceClient} = aiplatform;

  // Specifies the location of the api endpoint
  const clientOptions = {
    apiEndpoint: 'us-central1-prediction-aiplatform.googleapis.com',
  };

  // Instantiates a client
  const predictionServiceClient = new PredictionServiceClient(clientOptions);

  async function predictTextEntityExtraction() {
    // Configure the endpoint resource
    const endpoint = `projects/${project}/locations/${location}/endpoints/${endpointId}`;

    const instanceObj = new instance.TextSentimentPredictionInstance({
      content: text,
    });
    const instanceVal = instanceObj.toValue();

    const instances = [instanceVal];
    const request = {
      endpoint,
      instances,
    };

    // Predict request
    const [response] = await predictionServiceClient.predict(request);

    console.log(`Predict text entity extraction response :`);
    console.log(`\tDeployed model id : ${response.deployedModelId}`);

    console.log(`\nPredictions :`);
    for (const predictionResultValue of response.predictions) {
      let predictionResult = prediction.TextSentimentPredictionResult.fromValue(
        predictionResultValue
      );
      console.log(`\tSentiment measure: ${predictionResult.sentiment}`);
    }
  }
  // [END aiplatform_predict_text_entity_extraction]
  await predictTextEntityExtraction();
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err);
  process.exitCode = 1;
});
