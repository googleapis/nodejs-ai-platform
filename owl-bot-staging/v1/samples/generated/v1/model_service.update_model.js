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

function main(model, updateMask) {
  // [START aiplatform_v1_generated_ModelService_UpdateModel_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The Model which replaces the resource on the server.
   *  When Model Versioning is enabled, the model.name will be used to determine
   *  whether to update the model or model version.
   *  1. model.name with the @ value, e.g. models/123@1, refers to a version
   *  specific update.
   *  2. model.name without the @ value, e.g. models/123, refers to a model
   *  update.
   *  3. model.name with @-, e.g. models/123@-, refers to a model update.
   *  4. Supported model fields: display_name, description; supported
   *  version-specific fields: version_description. Labels are supported in both
   *  scenarios. Both the model labels and the version labels are merged when a
   *  model is returned. When updating labels, if the request is for
   *  model-specific update, model label gets updated. Otherwise, version labels
   *  get updated.
   *  5. A model name or model version name fields update mismatch will cause a
   *  precondition error.
   *  6. One request cannot update both the model and the version fields. You
   *  must update them separately.
   */
  // const model = {}
  /**
   *  Required. The update mask applies to the resource.
   *  For the `FieldMask` definition, see google.protobuf.FieldMask google.protobuf.FieldMask.
   */
  // const updateMask = {}

  // Imports the Aiplatform library
  const {ModelServiceClient} = require('@google-cloud/aiplatform').v1;

  // Instantiates a client
  const aiplatformClient = new ModelServiceClient();

  async function callUpdateModel() {
    // Construct request
    const request = {
      model,
      updateMask,
    };

    // Run request
    const response = await aiplatformClient.updateModel(request);
    console.log(response);
  }

  callUpdateModel();
  // [END aiplatform_v1_generated_ModelService_UpdateModel_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
