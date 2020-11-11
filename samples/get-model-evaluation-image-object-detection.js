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

async function main(modelId, evaluationId, project, location = 'us-central1') {
  // [START aiplatform_get_model_evaluation_image_object_detection]
  /**
   * TODO(developer): Uncomment these variables before running the sample.\
   * (Not necessary if passing values as arguments)
   */

  // const modelId = 'YOUR_MODEL_ID';
  // const evaluationId = 'YOUR_EVALUATION_ID';
  // const project = 'YOUR_PROJECT_ID';
  // const location = 'YOUR_PROJECT_LOCATION';

  // Imports the Google Cloud Model Service Client library
  const {ModelServiceClient} = require('@google-cloud/aiplatform');

  // Specifies the location of the api endpoint
  const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  };

  // Instantiates a client
  const modelServiceClient = new ModelServiceClient(clientOptions);

  async function getModelEvaluationImageObjectDetection() {
    // Configure the name resources
    const name = `projects/${project}/locations/${location}/models/${modelId}/evaluations/${evaluationId}`;
    const request = {
      name,
    };

    // Create get model evaluation request
    const [response] = await modelServiceClient.getModelEvaluation(request);

    console.log(`Get model evaluation image object detection response`);
    console.log(`\tName : ${response.name}`);
    console.log(`\tMetrics schema uri : ${response.metricsSchemaUri}`);
    console.log(`\tCreate time : ${JSON.stringify(response.createTime)}`);
    console.log(`\tSlice dimensions : ${response.sliceDimensions}`);

    const modelExplanation = response.modelExplanation;
    console.log(`\tModel explanation`);
    if (modelExplanation == null) {
      console.log(`\t\t{}`);
    } else {
      const meanAttributions = modelExplanation.meanAttributions;
      if (meanAttributions == null) {
        console.log(`\t\t\t []`);
      } else {
        for (meanAttribution of meanAttributions) {
          console.log(`\t\tMean attribution`);
          console.log(
              `\t\t\tBaseline output value : \
              ${meanAttribution.baselineOutputValue}`,
          );
          console.log(
              `\t\t\tInstance output value : \
              ${meanAttribution.instanceOutputValue}`,
          );
          console.log(
              `\t\t\tFeature attributions : \
              ${meanAttribution.featureAttributions}`,
          );
          console.log(`\t\t\tOutput index : ${meanAttribution.outputIndex}`);
          console.log(
              `\t\t\tOutput display name : \
              ${meanAttribution.outputDisplayName}`,
          );
          console.log(
              `\t\t\tApproximation error : \
              ${meanAttribution.approximationError}`,
          );
        }
      }
    }
  }
  // [END aiplatform_get_model_evaluation_image_object_detection]
  await getModelEvaluationImageObjectDetection();
}

main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});