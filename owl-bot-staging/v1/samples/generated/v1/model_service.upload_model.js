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

function main(parent, model) {
  // [START aiplatform_v1_generated_ModelService_UploadModel_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The resource name of the Location into which to upload the Model.
   *  Format: `projects/{project}/locations/{location}`
   */
  // const parent = 'abc123'
  /**
   *  Optional. The resource name of the model into which to upload the version. Only
   *  specify this field when uploading a new version.
   */
  // const parentModel = 'abc123'
  /**
   *  Optional. The ID to use for the uploaded Model, which will become the final
   *  component of the model resource name.
   *  This value may be up to 63 characters, and valid characters are
   *  `[a-z0-9_-]`. The first character cannot be a number or hyphen.
   */
  // const modelId = 'abc123'
  /**
   *  Required. The Model to create.
   */
  // const model = {}
  /**
   *  Optional. The user-provided custom service account to use to do the model
   *  upload. If empty, Vertex AI Service
   *  Agent (https://cloud.google.com/vertex-ai/docs/general/access-control#service-agents)
   *  will be used. Users uploading the Model must have the
   *  `iam.serviceAccounts.actAs` permission on this service account. Also, this
   *  account must belong to the project specified in the `parent` field and have
   *  all necessary read permissions.
   */
  // const serviceAccount = 'abc123'

  // Imports the Aiplatform library
  const {ModelServiceClient} = require('@google-cloud/aiplatform').v1;

  // Instantiates a client
  const aiplatformClient = new ModelServiceClient();

  async function callUploadModel() {
    // Construct request
    const request = {
      parent,
      model,
    };

    // Run request
    const [operation] = await aiplatformClient.uploadModel(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  callUploadModel();
  // [END aiplatform_v1_generated_ModelService_UploadModel_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
