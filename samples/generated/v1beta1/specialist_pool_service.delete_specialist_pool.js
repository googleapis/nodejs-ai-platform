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
  // [START aiplatform_v1beta1_generated_SpecialistPoolService_DeleteSpecialistPool_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The resource name of the SpecialistPool to delete. Format:
   *  `projects/{project}/locations/{location}/specialistPools/{specialist_pool}`
   */
  // const name = 'abc123'
  /**
   *  If set to true, any specialist managers in this SpecialistPool will also be
   *  deleted. (Otherwise, the request will only work if the SpecialistPool has
   *  no specialist managers.)
   */
  // const force = true

  // Imports the Aiplatform library
  const {SpecialistPoolServiceClient} = require('@google-cloud/aiplatform').v1beta1;

  // Instantiates a client
  const aiplatformClient = new SpecialistPoolServiceClient();

  async function callDeleteSpecialistPool() {
    // Construct request
    const request = {
      name,
    };

    // Run request
    const [operation] = await aiplatformClient.deleteSpecialistPool(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  callDeleteSpecialistPool();
  // [END aiplatform_v1beta1_generated_SpecialistPoolService_DeleteSpecialistPool_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
