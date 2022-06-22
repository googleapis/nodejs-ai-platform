// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **



'use strict';

function main(parent) {
  // [START aiplatform_v1_generated_VizierService_ListTrials_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The resource name of the Study to list the Trial from.
   *  Format: `projects/{project}/locations/{location}/studies/{study}`
   */
  // const parent = 'abc123'
  /**
   *  Optional. A page token to request the next page of results.
   *  If unspecified, there are no subsequent pages.
   */
  // const pageToken = 'abc123'
  /**
   *  Optional. The number of Trials to retrieve per "page" of results.
   *  If unspecified, the service will pick an appropriate default.
   */
  // const pageSize = 1234

  // Imports the Aiplatform library
  const {VizierServiceClient} = require('@google-cloud/aiplatform').v1;

  // Instantiates a client
  const aiplatformClient = new VizierServiceClient();

  async function callListTrials() {
    // Construct request
    const request = {
      parent,
    };

    // Run request
    const iterable = await aiplatformClient.listTrialsAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

  callListTrials();
  // [END aiplatform_v1_generated_VizierService_ListTrials_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
