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

function main(endpoint, deployedModel) {
  // [START aiplatform_v1beta1_generated_EndpointService_DeployModel_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The name of the Endpoint resource into which to deploy a Model.
   *  Format:
   *  `projects/{project}/locations/{location}/endpoints/{endpoint}`
   */
  // const endpoint = 'abc123'
  /**
   *  Required. The DeployedModel to be created within the Endpoint. Note that
   *  [Endpoint.traffic_split][google.cloud.aiplatform.v1beta1.Endpoint.traffic_split] must be updated for the DeployedModel to start
   *  receiving traffic, either as part of this call, or via
   *  [EndpointService.UpdateEndpoint][google.cloud.aiplatform.v1beta1.EndpointService.UpdateEndpoint].
   */
  // const deployedModel = ''
  /**
   *  A map from a DeployedModel's ID to the percentage of this Endpoint's
   *  traffic that should be forwarded to that DeployedModel.
   *  If this field is non-empty, then the Endpoint's
   *  [traffic_split][google.cloud.aiplatform.v1beta1.Endpoint.traffic_split] will be overwritten with it.
   *  To refer to the ID of the just being deployed Model, a "0" should be used,
   *  and the actual ID of the new DeployedModel will be filled in its place by
   *  this method. The traffic percentage values must add up to 100.
   *  If this field is empty, then the Endpoint's
   *  [traffic_split][google.cloud.aiplatform.v1beta1.Endpoint.traffic_split] is not updated.
   */
  // const trafficSplit = 1234

  // Imports the Aiplatform library
  const {EndpointServiceClient} = require('@google-cloud/aiplatform').v1beta1;

  // Instantiates a client
  const aiplatformClient = new EndpointServiceClient();

  async function deployModel() {
    // Construct request
    const request = {
      endpoint,
      deployedModel,
    };

    // Run request
    const [operation] = await aiplatformClient.deployModel(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  deployModel();
  // [END aiplatform_v1beta1_generated_EndpointService_DeployModel_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
