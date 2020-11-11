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
    displayName,
    datasetId,
    instructionUri,
    inputsSchemaUri,
    annotationSpec,
    project,
    location = 'us-central1',
) {
  // [START aiplatform_create_data_labeling_job]
  /**
   * TODO(developer): Uncomment these variables before running the sample.\
   * (Not necessary if passing values as arguments)
   */

  // const displayName = 'YOUR_DISPLAY_NAME';
  // const datasetName = 'YOUR_DATASET_NAME';
  // const instructionUri = 'YOUR_INSTRUCTION_URI';
  // const inputsSchemaUri = 'YOUR_INPUTS_SCHEMA_URI';
  // const annotationSpec = 'YOUR_ANNOTATION_SPEC';
  // const project = 'YOUR_PROJECT_ID';
  // const location = 'YOUR_PROJECT_LOCATION';

  // Imports the Google Cloud job Service Client library
  const {JobServiceClient} = require('@google-cloud/aiplatform');

  // Specifies the location of the api endpoint
  const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  };

  // Instantiates a client
  const jobServiceClient = new JobServiceClient(clientOptions);

  async function createDataLabelingJob() {
    // Configure the parent resource
    const parent = `projects/${project}/locations/${location}`;
    const input = [
      {arrayValue: [annotationSpec]},
    ];
    const inputs = {
      row: {
        value: input,
      },
    };
    const datasets = `projects/${project}/locations/${location}/datasets/${datasetId}`;
    const dataLabelingJob = {
      displayName: displayName,
      datasets: [datasets],
      labelerCount: 1,
      instructionUri: instructionUri,
      inputsSchemaUri: inputsSchemaUri,
      inputs: inputs,
      annotationLabels: {
        'aiplatform.googleapis.com/annotation_set_name': 'my_test_saved_query'},
    };
    const request = {
      parent,
      dataLabelingJob,
    };

    // Create data labeling job request
    const [response] = await jobServiceClient.createDataLabelingJob(request);

    console.log(`Create data labeling job response`);
    console.log(`\tName : ${response.name}`);
    console.log(`\tDisplay name : ${response.displayName}`);
    console.log(`\tDatasets : ${response.datasets}`);
    console.log(`\tLabeler count : ${response.labelerCount}`);
    console.log(`\tInstruction uri : ${response.instructionUri}`);
    console.log(`\tInputs schema uri : ${response.inputsSchemaUri}`);
    console.log(`\tInputs : ${JSON.stringify(response.inputs)}`);
    console.log(`\tState : ${response.state}`);
    console.log(`\tLabeling progress : ${response.labelingProgress}`);
    console.log(`\tCreate time : ${JSON.stringify(response.createTime)}`);
    console.log(`\tUpdate time : ${JSON.stringify(response.updateTime)}`);
    console.log(`\tLabels : ${JSON.stringify(response.labels)}`);
    console.log(`\tSpecialist pools : ${response.specialistPools}`);

    const annotationLabels = response.annotationLabels;
    for (const annotationLabel in annotationLabels) {
      if (annotationLabels.hasOwnProperty(annotationLabel)) {
        console.log(`\tAnnotation label`);
        console.log(`\t\tKey : ${annotationLabel.key}`);
        console.log(`\t\tValue : ${annotationLabel.value}`);
      }
    }

    const currentSpend = response.currentSpend;
    if (currentSpend == null) {
      console.log(`\tCurrent spend : {}`);
    } else {
      console.log(`\tCurrent spend`);
      console.log(`\t\tCurrency code : ${currentSpend.currencyCode}`);
      console.log(`\t\tUnits : ${currentSpend.units}`);
      console.log(`\t\tNanos : ${currentSpend.nanos}`);
    }
  }
  // [END aiplatform_create_data_labeling_job]
  await createDataLabelingJob();
}
main(...process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
