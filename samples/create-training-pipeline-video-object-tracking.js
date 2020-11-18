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
  datasetId,
  modelDisplayName,
  trainingPipelineDisplayName,
  project,
  location = 'us-central1'
) {
  // [START aiplatform_create_training_pipeline_video_object_tracking]
  /**
   * TODO(developer): Uncomment these variables before running the sample.\
   * (Not necessary if passing values as arguments)
   */

  // const datasetId = 'YOUR_DATASET_ID';
  // const modelDisplayName = 'YOUR_MODEL_DISPLAY_NAME';
  // const trainingPipelineDisplayName = 'YOUR_TRAINING_PIPELINE_DISPLAY_NAME';
  // const project = 'YOUR_PROJECT_ID';
  // const location = 'YOUR_PROJECT_LOCATION';

  // Imports the Google Cloud Pipeline Service Client library
  const {PipelineServiceClient} = require('@google-cloud/aiplatform');

  // Specifies the location of the api endpoint
  const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  };

  // Instantiates a client
  const pipelineServiceClient = new PipelineServiceClient(clientOptions);

  async function createTrainingPipelineVideoObjectTracking() {
    // Configure the parent resource
    const parent = `projects/${project}/locations/${location}`;
    // Values should match the input expected by your model.
    // modelType(string)
    const trainingTaskInputs = {
      structValue: {
        fields: {
          modelType: {stringValue: 'CLOUD'},
        },
      },
    };
    const modelToUpload = {displayName: modelDisplayName};
    const inputDataConfig = {datasetId: datasetId};
    const trainingPipeline = {
      displayName: trainingPipelineDisplayName,
      trainingTaskDefinition:
        'gs://google-cloud-aiplatform/schema/trainingjob/definition/automl_video_object_tracking_1.0.0.yaml',
      trainingTaskInputs: trainingTaskInputs,
      inputDataConfig: inputDataConfig,
      modelToUpload: modelToUpload,
    };
    const request = {
      parent,
      trainingPipeline,
    };

    // Create training pipeline request
    const [response] = await pipelineServiceClient.createTrainingPipeline(
      request
    );

    console.log('Create training pipeline video object tracking response');
    console.log(`\tName : ${response.name}`);
    console.log(`\tDisplay name: ${response.displayName}`);
    console.log(
      `\tTraining task definition : ${response.trainingTaskDefinition}`
    );
    console.log(
      `\tTraining task inputs : \
        ${JSON.stringify(response.trainingTaskInputs)}`
    );
    console.log(`\tTraining task metadata : ${response.trainingTaskMetadata}`);
    console.log(`\tState : ${response.state}`);
    console.log(`\tCreate time : ${JSON.stringify(response.createTime)}`);
    console.log(`\tStart time : ${JSON.stringify(response.startTime)}`);
    console.log(`\tEnd time : ${JSON.stringify(response.endTime)}`);
    console.log(`\tUpdate time : ${JSON.stringify(response.updateTime)}`);
    console.log(`\tLabels : ${JSON.stringify(response.labels)}`);

    const inputDataConfiguration = response.inputDataConfig;
    console.log('\tInput data config');
    console.log(`\t\tDataset id : ${inputDataConfiguration.datasetId}`);
    console.log(
      `\t\tAnnotations filter : \
        ${inputDataConfiguration.annotationsFilter}`
    );

    const fractionSplit = inputDataConfiguration.fractionSplit;
    console.log('\t\tFraction split');
    if (fractionSplit === null) {
      console.log('\t\t\tTraining fraction : {}');
      console.log('\t\t\tValidation fraction : {}');
      console.log('\t\t\tTest fraction : {}');
    } else {
      console.log(
        `\t\t\tTraining fraction : ${fractionSplit.trainingFraction}`
      );
      console.log(
        `\t\t\tValidation fraction : ${fractionSplit.validationFraction}`
      );
      console.log(`\t\t\tTest fraction : ${fractionSplit.testFraction}`);
    }

    const filterSplit = inputDataConfiguration.filterSplit;
    console.log('\t\tFilter split ');
    if (filterSplit === null) {
      console.log('\t\t\tTraining filter : {}');
      console.log('\t\t\tValidation filter : {}');
      console.log('\t\t\tTest filter : {}');
    } else {
      console.log(`\t\t\tTraining filter : ${filterSplit.trainingFilter}`);
      console.log(`\t\t\tValidation filter : ${filterSplit.validationFilter}`);
      console.log(`\t\t\tTest filter : ${filterSplit.testFilter}`);
    }

    const predefinedSplit = inputDataConfiguration.predefinedSplit;
    console.log('\t\tPredefined split');
    if (predefinedSplit === null) {
      console.log('\t\t\tKey : {}');
    } else {
      console.log(`\t\t\tKey : ${predefinedSplit.key}`);
    }

    const timestampSplit = inputDataConfiguration.timestampSplit;
    console.log('\t\tTimestamp split');
    if (timestampSplit === null) {
      console.log('\t\t\tTraining fraction : {}');
      console.log('\t\t\tValidation fraction : {}');
      console.log('\t\t\tTest fraction : {}');
      console.log('\t\t\tKey : {}');
    } else {
      console.log(
        `\t\t\tTraining fraction : ${timestampSplit.trainingFraction}`
      );
      console.log(
        `\t\t\tValidation fraction : \
          ${timestampSplit.validationFraction}`
      );
      console.log(`\t\t\tTest fraction : ${timestampSplit.testFraction}`);
      console.log(`\t\t\tKey : ${timestampSplit.key}`);
    }

    const modelToBeUploaded = response.modelToUpload;
    console.log('\tModel to upload');
    console.log(`\t\tName : ${modelToBeUploaded.name}`);
    console.log(`\t\tDisplay name : ${modelToBeUploaded.displayName}`);
    console.log(`\t\tDescription : ${modelToBeUploaded.description}`);
    console.log(
      `\t\tMetadata schema uri : ${modelToBeUploaded.metadataSchemaUri}`
    );
    console.log(`\t\tMetadata : ${JSON.stringify(modelToBeUploaded.metadata)}`);
    console.log(
      `\t\tTraining pipeline : ${modelToBeUploaded.trainingPipeline}`
    );
    console.log(`\t\tArtifact uri : ${modelToBeUploaded.artifactUri}`);
    console.log(
      `\t\tSupported deployment resource types : \
        ${modelToBeUploaded.supportedDeploymentResourceTypes}`
    );
    console.log(
      `\t\tSupported input storage formats : \
        ${modelToBeUploaded.supportedInputStorageFormats}`
    );
    console.log(
      `\t\tSupported output storage formats : \
        ${modelToBeUploaded.supportedOutputStorageFormats}`
    );
    console.log(`\t\tCreate time : ${modelToBeUploaded.createTime}`);
    console.log(`\t\tUpdate time : ${modelToBeUploaded.updateTime}`);
    console.log(`\t\tLabels : ${modelToBeUploaded.labels}`);

    const error = response.error;
    console.log('\tError');
    if (error === null) {
      console.log('\t\tCode : {}');
      console.log('\t\tMessage : {}');
    } else {
      console.log(`\t\tCode : ${error.code}`);
      console.log(`\t\tMessage : ${error.message}`);
    }
  }
  await createTrainingPipelineVideoObjectTracking();
  // [END aiplatform_create_training_pipeline_video_object_tracking]
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err);
  process.exitCode = 1;
});
