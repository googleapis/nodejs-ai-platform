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

function main(parent, suggestionCount, clientId) {
  // [START aiplatform_v1_generated_VizierService_SuggestTrials_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The project and location that the Study belongs to.
   *  Format: `projects/{project}/locations/{location}/studies/{study}`
   */
  // const parent = 'abc123'
  /**
   *  Required. The number of suggestions requested.
   */
  // const suggestionCount = 1234
  /**
   *  Required. The identifier of the client that is requesting the suggestion.
   *  If multiple SuggestTrialsRequests have the same `client_id`,
   *  the service will return the identical suggested Trial if the Trial is
   *  pending, and provide a new Trial if the last suggested Trial was completed.
   */
  // const clientId = 'abc123'

  // Imports the Aiplatform library
  const {VizierServiceClient} = require('@google-cloud/aiplatform').v1;

  // Instantiates a client
  const aiplatformClient = new VizierServiceClient();

  async function callSuggestTrials() {
    // Construct request
    const request = {
      parent,
      suggestionCount,
      clientId,
    };

    // Run request
    const [operation] = await aiplatformClient.suggestTrials(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  callSuggestTrials();
  // [END aiplatform_v1_generated_VizierService_SuggestTrials_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
