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

function main(parent, pipelineJob) {
  // [START aiplatform_v1beta1_generated_PipelineService_CreatePipelineJob_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The resource name of the Location to create the PipelineJob in.
   *  Format: `projects/{project}/locations/{location}`
   */
  // const parent = 'abc123'
  /**
   *  Required. The PipelineJob to create.
   */
  // const pipelineJob = {}
  /**
   *  The ID to use for the PipelineJob, which will become the final component of
   *  the PipelineJob name. If not provided, an ID will be automatically
   *  generated.
   *  This value should be less than 128 characters, and valid characters
   *  are /[a-z][0-9]-/.
   */
  // const pipelineJobId = 'abc123'

  // Imports the Aiplatform library
  const {PipelineServiceClient} = require('@google-cloud/aiplatform').v1beta1;

  // Instantiates a client
  const aiplatformClient = new PipelineServiceClient();

  async function callCreatePipelineJob() {
    // Construct request
    const request = {
      parent,
      pipelineJob,
    };

    // Run request
    const response = await aiplatformClient.createPipelineJob(request);
    console.log(response);
  }

  callCreatePipelineJob();
  // [END aiplatform_v1beta1_generated_PipelineService_CreatePipelineJob_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
