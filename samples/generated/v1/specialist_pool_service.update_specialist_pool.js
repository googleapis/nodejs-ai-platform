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

function main(specialistPool, updateMask) {
  // [START aiplatform_v1_generated_SpecialistPoolService_UpdateSpecialistPool_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The SpecialistPool which replaces the resource on the server.
   */
  // const specialistPool = {}
  /**
   *  Required. The update mask applies to the resource.
   */
  // const updateMask = {}

  // Imports the Aiplatform library
  const {SpecialistPoolServiceClient} = require('@google-cloud/aiplatform').v1;

  // Instantiates a client
  const aiplatformClient = new SpecialistPoolServiceClient();

  async function callUpdateSpecialistPool() {
    // Construct request
    const request = {
      specialistPool,
      updateMask,
    };

    // Run request
    const [operation] = await aiplatformClient.updateSpecialistPool(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  callUpdateSpecialistPool();
  // [END aiplatform_v1_generated_SpecialistPoolService_UpdateSpecialistPool_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
