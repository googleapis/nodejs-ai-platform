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
  // [START aiplatform_create_training_pipeline_text_entity_extraction]
  /**
   * TODO(developer): Uncomment these variables before running the sample.\
   * (Not necessary if passing values as arguments)
   */

  // const datasetId = 'YOUR_DATASET_ID';
  // const modelDisplayName = 'YOUR_MODEL_DISPLAY_NAME';
  // const trainingPipelineDisplayName = 'YOUR_TRAINING_PIPELINE_DISPLAY_NAME';
  // const project = 'YOUR_PROJECT_ID';
  // const location = 'YOUR_PROJECT_LOCATION';
  const aiplatform = require('@google-cloud/aiplatform');
  const {
    definition,
  } = aiplatform.protos.google.cloud.aiplatform.v1beta1.schema.trainingjob;

  // Imports the Google Cloud Pipeline Service Client library
  const {PipelineServiceClient} = aiplatform;

  // Specifies the location of the api endpoint
  const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  };

  // Instantiates a client
  const pipelineServiceClient = new PipelineServiceClient(clientOptions);

  async function createTrainingPipelineTextEntityExtraction() {
    // Configure the parent resource
    const parent = `projects/${project}/locations/${location}`;

    const trainingTaskInputObj = new definition.AutoMlTextExtractionInputs({});
    const trainingTaskInputs = trainingTaskInputObj.toValue();

    const modelToUpload = {displayName: modelDisplayName};
    const inputDataConfig = {datasetId: datasetId};
    const trainingPipeline = {
      displayName: trainingPipelineDisplayName,
      trainingTaskDefinition:
        'gs://google-cloud-aiplatform/schema/trainingjob/definition/automl_text_extraction_1.0.0.yaml',
      trainingTaskInputs,
      inputDataConfig,
      modelToUpload,
    };
    const request = {
      parent,
      trainingPipeline,
    };

    // Create training pipeline request
    const [response] = await pipelineServiceClient.createTrainingPipeline(
      request
    );

    console.log(`Create training pipeline text entity extraction response :`);
    console.log(`\tName : ${response.name}`);
    console.log(`\tDisplay Name : ${response.displayName}`);
    console.log(
      `\tTraining task definition : ${response.trainingTaskDefinition}`
    );
    console.log(
      `\tTraining task inputs : \
        ${JSON.stringify(response.trainingTaskInputs)}`
    );
    console.log(
      `\tTraining task metadata : \
        ${JSON.stringify(response.trainingTaskMetadata)}`
    );
    console.log(`\tState ; ${response.state}`);
    console.log(`\tCreate time : ${JSON.stringify(response.createTime)}`);
    console.log(`\tStart time : ${JSON.stringify(response.startTime)}`);
    console.log(`\tEnd time : ${JSON.stringify(response.endTime)}`);
    console.log(`\tUpdate time : ${JSON.stringify(response.updateTime)}`);
    console.log(`\tLabels : ${JSON.stringify(response.labels)}`);

    const inputDataConfiguration = response.inputDataConfig;
    console.log(`\tInput data config`);
    console.log(`\t\tDataset id : ${inputDataConfiguration.datasetId}`);
    console.log(
      `\t\tAnnotations filter : \
        ${inputDataConfiguration.annotationsFilter}`
    );

    const fractionSplit = inputDataConfiguration.fractionSplit;
    console.log(`\t\tFraction split`);
    if (!fractionSplit) {
      console.log(`\t\t\tTraining fraction : {}`);
      console.log(`\t\t\tValidation fraction : {}`);
      console.log(`\t\t\tTest fraction : {}`);
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
    console.log(`\t\tFilter split `);
    if (!filterSplit) {
      console.log(`\t\t\tTraining filter : {}`);
      console.log(`\t\t\tValidation filter : {}`);
      console.log(`\t\t\tTest filter : {}`);
    } else {
      console.log(`\t\t\tTraining filter : ${filterSplit.trainingFilter}`);
      console.log(`\t\t\tValidation filter : ${filterSplit.validationFilter}`);
      console.log(`\t\t\tTest filter : ${filterSplit.testFilter}`);
    }

    const predefinedSplit = inputDataConfiguration.predefinedSplit;
    console.log(`\t\tPredefined split`);
    if (!predefinedSplit) {
      console.log(`\t\t\tkey : {}`);
    } else {
      console.log(`\t\t\tkey : ${predefinedSplit.key}`);
    }

    const timestampSplit = inputDataConfiguration.timestampSplit;
    console.log(`\t\tTimestamp split`);
    if (!timestampSplit) {
      console.log(`\t\t\tTraining fraction : {}`);
      console.log(`\t\t\tValidation fraction : {}`);
      console.log(`\t\t\tTest fraction : {}`);
      console.log(`\t\t\tKey : {}`);
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
    console.log(`\tModel to upload`);
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
        ${modelToBeUploaded.supportedOutputStoragFormats}`
    );
    console.log(`\t\tCreate time : ${modelToBeUploaded.createTime}`);
    console.log(`\t\tUpdate time : ${modelToBeUploaded.updateTime}`);
    console.log(`\t\tLabels : ${modelToBeUploaded.labels}`);

    const predictSchemata = modelToBeUploaded.predictSchemata;
    if (!predictSchemata) {
      console.log(`\t\tPredict schemata`);
      console.log(`\t\t\tInstance schema uri : {}`);
      console.log(`\t\t\tParameters schema uri : {}`);
      console.log(`\t\t\tPrediction schema uri : {}`);
    } else {
      console.log(`\t\tPredict schemata`);
      console.log(
        `\t\t\tInstance schema uri : \
          ${predictSchemata.instanceSchemaUri}`
      );
      console.log(
        `\t\t\tParameters schema uri : \
          ${predictSchemata.prametersSchemaUri}`
      );
      console.log(
        `\t\t\tPrediction schema uri : \
          ${predictSchemata.predictionSchemaUri}`
      );
    }

    const [supportedExportFormats] = modelToBeUploaded.supportedExportFormats;
    console.log(`\t\tSupported export formats`);
    if (!supportedExportFormats) {
      console.log(`\t\tSupported export format`);
    } else {
      for (const supportedExportFormat of supportedExportFormats) {
        console.log(`\t\tSupported export format`);
        console.log(`\t\t\tid : ${supportedExportFormat.id}`);
      }
    }

    const containerSpec = modelToBeUploaded.containerSpec;
    console.log(`\t\tContainer Spec`);
    if (!containerSpec) {
      console.log(`\t\t\t${JSON.stringify(containerSpec)}`);
      console.log(`\t\t\tImage uri : {}`);
      console.log(`\t\t\tCommand : {}`);
      console.log(`\t\t\tArgs : {}`);
      console.log(`\t\t\tPredict route : {}`);
      console.log(`\t\t\tHealth route : {}`);
      console.log(`\t\t\tEnv`);
      console.log(`\t\t\t{}`);
      console.log(`\t\t\tPort`);
      console.log(`\t\t\t{}`);
    } else {
      console.log(`\t\t\t${JSON.stringify(containerSpec)}`);
      console.log(`\t\t\tImage uri : ${containerSpec.imageUri}`);
      console.log(`\t\t\tCommand : ${containerSpec.command}`);
      console.log(`\t\t\tArgs : ${containerSpec.args}`);
      console.log(`\t\t\tPredict route : ${containerSpec.predictRoute}`);
      console.log(`\t\t\tHealth route : ${containerSpec.healthRoute}`);

      const envs = containerSpec.env;
      if (!envs) {
        console.log(`\t\t\tEnv`);
      } else {
        for (const env of envs) {
          console.log(`\t\t\tEnv`);
          console.log(`\t\t\tName : ${env.name}`);
          console.log(`\t\t\tValue : ${env.value}`);
        }
      }

      const ports = containerSpec.ports;
      if (!ports) {
        console.log(`\t\t\tPort`);
      } else {
        for (const port of ports) {
          console.log(`\t\t\tPort`);
          console.log(`\t\t\tContainer port : ${port.containerPort}`);
        }
      }
    }

    const [deployedModels] = modelToBeUploaded.deployedModels;
    if (!deployedModels) {
      console.log(`\t\tDeployed model`);
    } else {
      for (const deployedModel of deployedModels) {
        console.log(`\t\tDeployed model`);
        console.log(`\t\t\tEndpoint : ${deployedModel.endpoint}`);
        console.log(
          `\t\t\tDeployed model id : ${deployedModel.deployedModelId}`
        );
      }
    }

    const explanationSpec = modelToBeUploaded.explanationSpec;
    console.log(`\t\tExplanation spec`);
    console.log(`\t\t\tParameters`);
    if (!explanationSpec) {
      console.log(`\t\t\t\tSampled shapley attribution`);
      console.log(`\t\t\t\t\tPath count : {}`);
    } else {
      const parameters = explanationSpec.parameters;
      const sampledShapleyAttribution = parameters.sampledShapleyAttribution;
      console.log(`\t\t\t\tSampled shapley attribution`);
      console.log(
        `\t\t\t\t\tPath count : \
          ${sampledShapleyAttribution.pathCount}`
      );
    }

    console.log(`\t\t\tMetadata`);
    if (!explanationSpec) {
      console.log(`\t\t\t\tInputs : {}`);
      console.log(`\t\t\t\tOutputs : {}`);
      console.log(`\t\t\t\tFeature attributions schema uri : {}`);
    } else {
      const metadata = explanationSpec.metadata;
      console.log(`\t\t\t\tInputs : ${JSON.stringify(metadata.inputs)}`);
      console.log(`\t\t\t\tOutputs : ${JSON.stringify(metadata.outputs)}`);
      console.log(
        `\t\t\t\tFeature attributions schema uri : \
          ${metadata.featureAttributionsSchemaUri}`
      );
    }

    const error = response.error;
    console.log(`\tError`);
    if (!error) {
      console.log(`\t\tCode : {}`);
      console.log(`\t\tMessage : {}`);
    } else {
      console.log(`\t\tCode : ${error.code}`);
      console.log(`\t\tMessage : ${error.message}`);
    }
  }
  // [END aiplatform_create_training_pipeline_text_entity_extraction]
  await createTrainingPipelineTextEntityExtraction();
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err);
  process.exitCode = 1;
});
