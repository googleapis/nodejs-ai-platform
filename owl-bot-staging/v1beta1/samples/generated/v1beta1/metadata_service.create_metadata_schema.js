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

function main(parent, metadataSchema) {
  // [START aiplatform_v1beta1_generated_MetadataService_CreateMetadataSchema_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The resource name of the MetadataStore where the MetadataSchema should
   *  be created.
   *  Format:
   *  `projects/{project}/locations/{location}/metadataStores/{metadatastore}`
   */
  // const parent = 'abc123'
  /**
   *  Required. The MetadataSchema to create.
   */
  // const metadataSchema = {}
  /**
   *  The {metadata_schema} portion of the resource name with the format:
   *  `projects/{project}/locations/{location}/metadataStores/{metadatastore}/metadataSchemas/{metadataschema}`
   *  If not provided, the MetadataStore's ID will be a UUID generated by the
   *  service.
   *  Must be 4-128 characters in length. Valid characters are `/[a-z][0-9]-/`.
   *  Must be unique across all MetadataSchemas in the parent Location.
   *  (Otherwise the request will fail with ALREADY_EXISTS, or PERMISSION_DENIED
   *  if the caller can't view the preexisting MetadataSchema.)
   */
  // const metadataSchemaId = 'abc123'

  // Imports the Aiplatform library
  const {MetadataServiceClient} = require('@google-cloud/aiplatform').v1beta1;

  // Instantiates a client
  const aiplatformClient = new MetadataServiceClient();

  async function callCreateMetadataSchema() {
    // Construct request
    const request = {
      parent,
      metadataSchema,
    };

    // Run request
    const response = await aiplatformClient.createMetadataSchema(request);
    console.log(response);
  }

  callCreateMetadataSchema();
  // [END aiplatform_v1beta1_generated_MetadataService_CreateMetadataSchema_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
