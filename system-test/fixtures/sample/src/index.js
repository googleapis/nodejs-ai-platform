// Copyright 2021 Google LLC
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

/* eslint-disable node/no-missing-require, no-unused-vars */
const aiplatform = require('@google-cloud/aiplatform');

function main() {
  const datasetServiceClient = new aiplatform.DatasetServiceClient();
  const endpointServiceClient = new aiplatform.EndpointServiceClient();
  const indexEndpointServiceClient =
    new aiplatform.IndexEndpointServiceClient();
  const indexServiceClient = new aiplatform.IndexServiceClient();
  const jobServiceClient = new aiplatform.JobServiceClient();
  const migrationServiceClient = new aiplatform.MigrationServiceClient();
  const modelServiceClient = new aiplatform.ModelServiceClient();
  const pipelineServiceClient = new aiplatform.PipelineServiceClient();
  const predictionServiceClient = new aiplatform.PredictionServiceClient();
  const specialistPoolServiceClient =
    new aiplatform.SpecialistPoolServiceClient();
}

main();
