/*
 * Copyright 2021 Google LLC
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

async function main(instance, endpointId, project, location = 'us-central1') {
  // [START aiplatform_explain_tabular_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.\
   * (Not necessary if passing values as arguments)
   */

  // const instance = "YOUR_PREDICTION_INSTANCE";
  // const endpointId = 'YOUR_ENDPOINT_ID';
  // const project = 'YOUR_PROJECT_ID';
  // const location = 'YOUR_PROJECT_LOCATION';

  // Imports the Google Cloud Endpoint Service Client library
  const {PredictionServiceClient, helpers} =
    require('@google-cloud/aiplatform').v1beta1;
  // Specifies the location of the api endpoint:
  const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  };

  // Instantiates a client
  const predictionServiceClient = new PredictionServiceClient(clientOptions);

  // Format the endpoint as a resource name
  const endpoint = predictionServiceClient.endpointPath(
    project,
    location,
    endpointId
  );

  async function explainTabular() {
    // The format of each instance should conform to the deployed model's
    // prediction input schema.
    const instances = [helpers.toValue(instance)];

    // Tabular models do not have additional parameters
    const parameters = helpers.toValue({});

    const [response] = predictionServiceClient.explain({
      endpoint,
      instances,
      parameters,
    });
    // Wait for operation to complete
    await response.promise();
    const {explanations, predictions} = response;

    console.log('Explain tabular response');
    console.log(`Deployed model: ${response.deployedModelId}`);

    for (const explanation of explanations) {
      console.log('\tExplanation:');
      const {attributions} = explanation;
      for (const attribution of attributions) {
        console.log('\t\tAttribution:');
        console.log(
          `\t\tBaseline output value: ${attribution.baselineOutputValue}`
        );
        console.log(
          `\t\tInstance output value: ${attribution.instanceOutputValue}`
        );
        console.log(
          `\t\tOutput display name: ${attribution.outputDisplayName}`
        );
        console.log(
          `\t\tApproximation error: ${attribution.approximationError}`
        );
        console.log(`\t\tOutput name: ${attribution.outputName}`);
      }
    }

    console.log('\n\n');
    for (const prediction of predictions) {
      console.log(`\tPrediction: ${prediction}`);
    }
  }
  explainTabular();
  // [END aiplatform_explain_tabular_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main(...process.argv.slice(2));
