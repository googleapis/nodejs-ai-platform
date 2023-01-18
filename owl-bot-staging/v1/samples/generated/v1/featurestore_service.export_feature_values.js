// Copyright 2023 Google LLC
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

function main(entityType, destination, featureSelector) {
  // [START aiplatform_v1_generated_FeaturestoreService_ExportFeatureValues_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Exports the latest Feature values of all entities of the EntityType
   *  within a time range.
   */
  // const snapshotExport = {}
  /**
   *  Exports all historical values of all entities of the EntityType within a
   *  time range
   */
  // const fullExport = {}
  /**
   *  Required. The resource name of the EntityType from which to export Feature
   *  values. Format:
   *  `projects/{project}/locations/{location}/featurestores/{featurestore}/entityTypes/{entity_type}`
   */
  // const entityType = 'abc123'
  /**
   *  Required. Specifies destination location and format.
   */
  // const destination = {}
  /**
   *  Required. Selects Features to export values of.
   */
  // const featureSelector = {}
  /**
   *  Per-Feature export settings.
   */
  // const settings = 1234

  // Imports the Aiplatform library
  const {FeaturestoreServiceClient} = require('@google-cloud/aiplatform').v1;

  // Instantiates a client
  const aiplatformClient = new FeaturestoreServiceClient();

  async function callExportFeatureValues() {
    // Construct request
    const request = {
      entityType,
      destination,
      featureSelector,
    };

    // Run request
    const [operation] = await aiplatformClient.exportFeatureValues(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  callExportFeatureValues();
  // [END aiplatform_v1_generated_FeaturestoreService_ExportFeatureValues_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
