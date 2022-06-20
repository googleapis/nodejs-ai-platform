/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {assert} = require('chai');
const {FeaturestoreServiceClient} = require('@google-cloud/aiplatform').v1;
const {after, before, describe, it} = require('mocha');
const uuid = require('uuid').v4;
const cp = require('child_process');
const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const project = process.env.CAIP_PROJECT_ID;
const featurestoreId = `featurestore_sample_${uuid()
  .replace(/-/g, '_')
  .slice(10, 20)}`;
const fixedNodeCount = 1;
const entityTypeId = `entity_type_sample_${uuid()
  .replace(/-/g, '_')
  .slice(10, 20)}`;
const entityTypeDescription = 'created during get feature sample testing';
const featureId = `feature_sample_${uuid().replace(/-/g, '_').slice(10, 20)}`;
const featureDescription = 'created during get feature sample testing';
const valueType = 'STRING';
const location = 'us-central1';
const apiEndpoint = 'us-central1-aiplatform.googleapis.com';

// Instantiates a featurestore clients
const featurestoreServiceClient = new FeaturestoreServiceClient({
  apiEndpoint: apiEndpoint,
});

const createFeaturestore = async () => {
  // Configure the parent resource
  const parent = `projects/${project}/locations/${location}`;

  const featurestore = {
    onlineServingConfig: {
      fixedNodeCount: fixedNodeCount,
    },
  };

  const request = {
    parent: parent,
    featurestore: featurestore,
    featurestoreId: featurestoreId,
  };

  // Create Featurestore request
  const [operation] = await featurestoreServiceClient.createFeaturestore(
    request,
    {timeout: 900000}
  );
  await operation.promise();
};

const deleteFeaturestore = async () => {
  // Configure the name resource
  const name = `projects/${project}/locations/${location}/featurestores/${featurestoreId}`;

  const request = {
    name: name,
    force: true,
  };

  // Delete Featurestore request
  const [operation] = await featurestoreServiceClient.deleteFeaturestore(
    request,
    {timeout: 60000}
  );
  await operation.promise();
};

const createEntityType = async () => {
  // Configure the parent resource
  const parent = `projects/${project}/locations/${location}/featurestores/${featurestoreId}`;

  const entityType = {
    description: entityTypeDescription,
  };

  const request = {
    parent: parent,
    entityTypeId: entityTypeId,
    entityType: entityType,
  };

  // CreateEntityType request
  const [operation] = await featurestoreServiceClient.createEntityType(
    request,
    {timeout: 300000}
  );
  await operation.promise();
};

const createFeature = async () => {
  // Configure the parent resource
  const parent = `projects/${project}/locations/${location}/featurestores/${featurestoreId}/entityTypes/${entityTypeId}`;

  const feature = {
    valueType: valueType,
    description: featureDescription,
  };

  const request = {
    parent: parent,
    feature: feature,
    featureId: featureId,
  };

  // Create Feature request
  const [operation] = await featurestoreServiceClient.createFeature(request, {
    timeout: 300000,
  });
  await operation.promise();
};

describe('AI platform get feature', async function () {
  this.retries(2);
  before('should create the featurestore', async () => {
    await createFeaturestore();
  });
  before('should create the entity type', async () => {
    await createEntityType();
  });
  before('should create a feature', async () => {
    await createFeature();
  });
  it('should get the created feature', async () => {
    const stdout = execSync(
      `node ./get-feature-sample.js ${project} ${featurestoreId} ${entityTypeId} ${featureId} ${location} ${apiEndpoint}`
    );
    assert.match(stdout, /Get feature response/);
  });
  after('should delete the created featurestore', async () => {
    await deleteFeaturestore();
  });
});
