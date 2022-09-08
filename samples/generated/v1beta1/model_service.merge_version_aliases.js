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

function main(name, versionAliases) {
  // [START aiplatform_v1beta1_generated_ModelService_MergeVersionAliases_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The name of the model version to merge aliases, with a version ID
   *  explicitly included.
   *  Example: `projects/{project}/locations/{location}/models/{model}@1234`
   */
  // const name = 'abc123'
  /**
   *  Required. The set of version aliases to merge.
   *  The alias should be at most 128 characters, and match
   *  `[a-z][a-zA-Z0-9-]{0,126}[a-z-0-9]`.
   *  Add the `-` prefix to an alias means removing that alias from the version.
   *  `-` is NOT counted in the 128 characters. Example: `-golden` means removing
   *  the `golden` alias from the version.
   *  There is NO ordering in aliases, which means
   *  1) The aliases returned from GetModel API might not have the exactly same
   *  order from this MergeVersionAliases API. 2) Adding and deleting the same
   *  alias in the request is not recommended, and the 2 operations will be
   *  cancelled out.
   */
  // const versionAliases = 'abc123'

  // Imports the Aiplatform library
  const {ModelServiceClient} = require('@google-cloud/aiplatform').v1beta1;

  // Instantiates a client
  const aiplatformClient = new ModelServiceClient();

  async function callMergeVersionAliases() {
    // Construct request
    const request = {
      name,
      versionAliases,
    };

    // Run request
    const response = await aiplatformClient.mergeVersionAliases(request);
    console.log(response);
  }

  callMergeVersionAliases();
  // [END aiplatform_v1beta1_generated_ModelService_MergeVersionAliases_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
