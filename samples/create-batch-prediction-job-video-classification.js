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

async function main(
  batchPredictionDisplayName,
  modelId,
  gcsSourceUri,
  gcsDestinationOutputUriPrefix,
  project,
  location = 'us-central1'
) {
  // [START aiplatform_create_batch_prediction_job_video_classification]
  /**
   * TODO(developer): Uncomment these variables before running the sample.\
   * (Not necessary if passing values as arguments)
   */

  // const batchPredictionDisplayName = 'YOUR_BATCH_PREDICTION_DISPLAY_NAME';
  // const modelId = 'YOUR_MODEL_ID';
  // const gcsSourceUri = 'YOUR_GCS_SOURCE_URI';
  // const gcsDestinationOutputUriPrefix = 'YOUR_GCS_DEST_OUTPUT_URI_PREFIX';
  //    eg. "gs://<your-gcs-bucket>/destination_path"
  // const project = 'YOUR_PROJECT_ID';
  // const location = 'YOUR_PROJECT_LOCATION';
  const aiplatform = require('@google-cloud/aiplatform');
  const {
    params,
  } = aiplatform.protos.google.cloud.aiplatform.v1beta1.schema.predict;

  // Imports the Google Cloud Job Service Client library
  const {JobServiceClient} = require('@google-cloud/aiplatform');

  // Specifies the location of the api endpoint
  const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  };

  // Instantiates a client
  const jobServiceClient = new JobServiceClient(clientOptions);

  async function createBatchPredictionJobVideoClassification() {
    // Configure the parent resource
    const parent = `projects/${project}/locations/${location}`;
    const modelName = `projects/${project}/locations/${location}/models/${modelId}`;
    // Values should match the input expected by your model.
    // confidenceThreshold(float), maxPredictions(number), \
    // segmentClassification(boolean), shotClassification(boolean) \
    // oneSecIntervalClassification(boolean)

    let modelParamsObj = new params.VideoClassificationPredictionParams({
      confidenceThreshold: 0.5,
      maxPredictions: 1000,
      segmentClassification: true,
      shotClassification: true,
      oneSecIntervalClassification: true,
    });

    const modelParameters = modelParamsObj.toValue();

    const inputConfig = {
      instancesFormat: 'jsonl',
      gcsSource: {uris: [gcsSourceUri]},
    };
    const outputConfig = {
      predictionsFormat: 'jsonl',
      gcsDestination: {outputUriPrefix: gcsDestinationOutputUriPrefix},
    };
    const batchPredictionJob = {
      displayName: batchPredictionDisplayName,
      model: modelName,
      modelParameters,
      inputConfig,
      outputConfig,
    };
    const request = {
      parent,
      batchPredictionJob,
    };

    // Create batch prediction job request
    const [response] = await jobServiceClient.createBatchPredictionJob(request);

    console.log(`Create batch prediction job video classification response`);
    console.log(`\tName : ${response.name}`);
    console.log(`\tDisplay name: ${response.displayName}`);
    console.log(`\tModel : ${response.model}`);
    console.log(`\tModel parameters : ${response.modelParameters}`);
    console.log(`\tGenerate explanation : ${response.generateExplanation}`);
    console.log(`\tState : ${response.state}`);
    console.log(`\tCreate time : ${JSON.stringify(response.createTime)}`);
    console.log(`\tStart time : ${JSON.stringify(response.startTime)}`);
    console.log(`\tEnd time : ${JSON.stringify(response.endTime)}`);
    console.log(`\tUpdate time : ${JSON.stringify(response.updateTime)}`);
    console.log(`\tLabels : ${JSON.stringify(response.labels)}`);

    const inputConfiguration = response.inputConfig;
    console.log(`\tInput config`);
    console.log(`\t\tInstances format : ${inputConfiguration.instancesFormat}`);

    const gcsSource = inputConfiguration.gcsSource;
    console.log(`\t\tGcs source`);
    console.log(`\t\t\tUris : ${gcsSource.uris}`);

    const bigquerySource = inputConfiguration.bigquerySource;
    console.log(`\t\tBigQuery source`);
    if (bigquerySource == null) {
      console.log(`\t\t\tInput uri : {}`);
    } else {
      console.log(`\t\t\tInput uri : ${bigquerySource.inputUri}`);
    }

    const outputConfiguration = response.outputConfig;
    console.log(`\t\tOutput config`);
    console.log(
      `\t\tPredictions format : ${outputConfiguration.predictionsFormat}`
    );

    const gcsDestination = outputConfiguration.gcsDestination;
    console.log(`\t\tGcs destination`);
    console.log(`\t\t\tOutput uri prefix : ${gcsDestination.outputUriPrefix}`);

    const bigqueryDestination = outputConfiguration.bigqueryDestination;
    if (bigqueryDestination == null) {
      console.log(`\t\tBigquery destination`);
      console.log(`\t\t\tOutput uri : {}`);
    } else {
      console.log(`\t\tBigquery destination`);
      console.log(`\t\t\tOutput uri : ${bigqueryDestination.outputUri}`);
    }

    const dedicatedResource = response.dedicatedResource;
    console.log(`\tDedicated resources`);
    if (dedicatedResource == null) {
      console.log(`\t\tStarting replica count : {}`);
      console.log(`\t\tMax replica count : {}`);
    } else {
      console.log(
        `\ttStarting replica count : \
          ${dedicatedResource.startingReplicaCount}`
      );
      console.log(
        `\ttMax replica count : ${dedicatedResource.maxReplicaCount}`
      );

      const machineSpec = dedicatedResource.machineSpec;
      console.log(`\t\tMachine spec`);
      if (machineSpec == null) {
        console.log(`\t\t\tMachine type : {}`);
        console.log(`\t\t\tAccelerator type : {}`);
        console.log(`\t\t\tAccelerator count : {}`);
      } else {
        console.log(`\t\t\tMachine type : ${machineSpec.machineType}`);
        console.log(`\t\t\tAccelerator type : ${machineSpec.acceleratorType}`);
        console.log(
          `\t\t\tAccelerator count : ${machineSpec.acceleratorCount}`
        );
      }
    }

    const manualBatchTuningParameters = response.manualBatchTuningParameters;
    console.log(`\tManual batch tuning parameters`);
    if (manualBatchTuningParameters == null) {
      console.log(`\t\tBatch size : {}`);
    } else {
      console.log(`\t\tBatch size : ${manualBatchTuningParameters.batchSize}`);
    }

    const outputInfo = response.outputInfo;
    if (outputInfo == null) {
      console.log(`\tOutput info`);
      console.log(`\t\tGcs output directory : {}`);
      console.log(`\t\tBigquery output dataset : {}`);
    } else {
      console.log(`\tOutput info`);
      console.log(
        `\t\tGcs output directory : ${outputInfo.gcsOutputDirectory}`
      );
      console.log(`\t\tBigquery output dataset : 
            ${outputInfo.bigqueryOutputDataset}`);
    }

    const error = response.error;
    if (error == null) {
      console.log(`\tError`);
      console.log(`\t\tCode : {}`);
      console.log(`\t\tMessage : {}`);
    } else {
      console.log(`\tError`);
      console.log(`\t\tCode : ${error.code}`);
      console.log(`\t\tMessage : ${error.message}`);

      const details = error.details;
      if (details == null) {
        console.log(`\t\tDetails : {}`);
      } else {
        console.log(`\t\tDetails : ${details}`);
      }
    }

    const partialFailures = response.partialFailures;
    if (partialFailures == null) {
      console.log(`\tPartial failure`);
    } else {
      for (partialFailure of partialFailures) {
        console.log(`\tPartial failure`);
        console.log(`\t\tCode : ${partialFailure.code}`);
        console.log(`\t\tMessage : ${partialFailure.message}`);
      }
    }

    const resourcesConsumed = response.resourcesConsumed;
    console.log(`\tResource consumed`);
    if (resourcesConsumed == null) {
      console.log(`\t\tReplica hours: {}`);
    } else {
      console.log(`\t\tReplica hours: ${resourcesConsumed.replicaHours}`);
    }

    const completionStats = response.completionStats;
    console.log(`\tCompletion status`);
    if (completionStats == null) {
      console.log(`\t\tSuccessful count: {}`);
      console.log(`\t\tFailed count: {}`);
      console.log(`\t\tIncomplete count: {}`);
    } else {
      console.log(`\t\tSuccessful count: ${completionStats.successfulCount}`);
      console.log(`\t\tFailed count: ${completionStats.failedCount}`);
      console.log(`\t\tIncomplete count: ${completionStats.incompleteCount}`);
    }
  }
  // [END aiplatform_create_batch_prediction_job_video_classification]
  await createBatchPredictionJobVideoClassification();
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err);
  process.exitCode = 1;
});
