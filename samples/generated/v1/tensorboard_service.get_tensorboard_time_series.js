// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


'use strict';

function main(name) {
  // [START aiplatform_v1_generated_TensorboardService_GetTensorboardTimeSeries_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The name of the TensorboardTimeSeries resource.
   *  Format:
   *  `projects/{project}/locations/{location}/tensorboards/{tensorboard}/experiments/{experiment}/runs/{run}/timeSeries/{time_series}`
   */
  // const name = 'abc123'

  // Imports the Aiplatform library
  const {TensorboardServiceClient} = require('@google-cloud/aiplatform').v1;

  // Instantiates a client
  const aiplatformClient = new TensorboardServiceClient();

  async function callGetTensorboardTimeSeries() {
    // Construct request
    const request = {
      name,
    };

    // Run request
    const response = await aiplatformClient.getTensorboardTimeSeries(request);
    console.log(response);
  }

  callGetTensorboardTimeSeries();
  // [END aiplatform_v1_generated_TensorboardService_GetTensorboardTimeSeries_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
