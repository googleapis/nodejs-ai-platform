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

async function main(dataLabelingJobId, project, location = 'us-central1') {
  // [START aiplatform_cancel_data_labeling_job]
  /**
   * TODO(developer): Uncomment these variables before running the sample.\
   * (Not necessary if passing values as arguments)
   */

  // const dataLabelingJobId = 'YOUR_DATA_LABELING_JOB_ID';
  // const project = 'YOUR_PROJECT_ID';
  // const location = 'YOUR_PROJECT_LOCATION';

  // Imports the Google Cloud Job Service Client library
  const {JobServiceClient} = require('@google-cloud/aiplatform');

  // Specifies the location of the api endpoint
  const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  };

  // Instantiates a client
  const jobServiceClient = new JobServiceClient(clientOptions);

  async function cancelDataLabelingJob() {
    // Configure the resource
    const name = `projects/${project}/locations/${location}/dataLabelingJobs/${dataLabelingJobId}`;
    const request = {
      name,
    };

    // Cancel data labeling job request
    await jobServiceClient.cancelDataLabelingJob(request);

    console.log('Cancel data labeling job response :');
  }
  await cancelDataLabelingJob();
  // [END aiplatform_cancel_data_labeling_job]
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err);
  process.exitCode = 1;
});
