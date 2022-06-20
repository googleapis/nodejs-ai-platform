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

const {BigQuery} = require('@google-cloud/bigquery');
const {FeaturestoreServiceClient} = require('@google-cloud/aiplatform').v1;
const {assert} = require('chai');
const {after, before, describe, it} = require('mocha');
const uuid = require('uuid').v4;
const cp = require('child_process');
const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const project = process.env.CAIP_PROJECT_ID;
const datasetName = `movie_predictions_nodejs_${uuid()
  .replace(/-/g, '_')
  .slice(10, 20)}`;
const tableName = 'batch_serving_table';

const featurestoreId = `featurestore_sample_${uuid()
  .replace(/-/g, '_')
  .slice(10, 20)}`;
const fixedNodeCount = 1;

const entityTypeId1 = 'perm_users';
const entityTypeDescription1 = 'Users Entity';
const entityTypeId2 = 'perm_movies';
const entityTypeDescription2 = 'Movies Entity';

const avroGcsUri1 =
  'gs://cloud-samples-data-us-central1/vertex-ai/feature-store/datasets/users.avro';
const entityIdField1 = 'user_id';

const avroGcsUri2 =
  'gs://cloud-samples-data-us-central1/vertex-ai/feature-store/datasets/movies.avro';
const entityIdField2 = 'movie_id';

const featureTimeField = 'update_time';
const workerCount = 2;
const destinationTableUri = `bq://${project}.${datasetName}.${tableName}`;
const inputCsvFile =
  'gs://cloud-samples-data-us-central1/vertex-ai/feature-store/datasets/movie_prediction_perm.csv';
const location = 'us-central1';
const apiEndpoint = 'us-central1-aiplatform.googleapis.com';

// Instantiates a featurestore and bigquery clients
const featurestoreServiceClient = new FeaturestoreServiceClient({
  apiEndpoint: apiEndpoint,
});
const bigqueryClient = new BigQuery({projectId: project});

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

const createEntityType = async (entityTypeId, entityTypeDescription) => {
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

const createPermUsersFeatures = async () => {
  // Configure the parent resource
  const parent = `projects/${project}/locations/${location}/featurestores/${featurestoreId}/entityTypes/${entityTypeId1}`;

  const ageFeature = {
    valueType: 'INT64',
    description: 'User age',
  };

  const ageFeatureRequest = {
    feature: ageFeature,
    featureId: 'age',
  };

  const genderFeature = {
    valueType: 'STRING',
    description: 'User gender',
  };

  const genderFeatureRequest = {
    feature: genderFeature,
    featureId: 'gender',
  };

  const likedGenresFeature = {
    valueType: 'STRING_ARRAY',
    description: 'An array of genres that this user liked',
  };

  const likedGenresFeatureRequest = {
    feature: likedGenresFeature,
    featureId: 'liked_genres',
  };

  const requests = [
    ageFeatureRequest,
    genderFeatureRequest,
    likedGenresFeatureRequest,
  ];

  const request = {
    parent: parent,
    requests: requests,
  };

  // Batch Create Features request
  const [operation] = await featurestoreServiceClient.batchCreateFeatures(
    request,
    {timeout: 300000}
  );
  await operation.promise();
};

const createPermMoviesFeatures = async () => {
  // Configure the parent resource
  const parent = `projects/${project}/locations/${location}/featurestores/${featurestoreId}/entityTypes/${entityTypeId2}`;

  const titleFeatureRequest = {
    feature: {
      valueType: 'STRING',
      description: 'The title of the movie',
    },
    featureId: 'title',
  };

  const genresFeatureRequest = {
    feature: {
      valueType: 'STRING',
      description: 'The genres of the movie',
    },
    featureId: 'genres',
  };

  const averageRatingFeatureRequest = {
    feature: {
      valueType: 'DOUBLE',
      description: 'The average rating for the movie, range is [1.0-5.0]',
    },
    featureId: 'average_rating',
  };

  const requests = [
    titleFeatureRequest,
    genresFeatureRequest,
    averageRatingFeatureRequest,
  ];

  const request = {
    parent: parent,
    requests: requests,
  };

  // Batch Create Features request
  const [operation] = await featurestoreServiceClient.batchCreateFeatures(
    request,
    {timeout: 300000}
  );
  await operation.promise();
};

const importPermMoviesFeatures = async () => {
  // Configure the entityType resource
  const entityType = `projects/${project}/locations/${location}/featurestores/${featurestoreId}/entityTypes/${entityTypeId2}`;

  const avroSource = {
    gcsSource: {
      uris: [avroGcsUri2],
    },
  };

  const featureSpecs = [{id: 'title'}, {id: 'genres'}, {id: 'average_rating'}];

  const request = {
    entityType: entityType,
    avroSource: avroSource,
    entityIdField: entityIdField2,
    featureSpecs: featureSpecs,
    featureTimeField: featureTimeField,
    workerCount: workerCount,
  };

  // Import Feature Values Request
  const [operation] = await featurestoreServiceClient.importFeatureValues(
    request,
    {timeout: 300000}
  );
  await operation.promise();
};

const importPermUsersFeatures = async () => {
  // Configure the entityType resource
  const entityType = `projects/${project}/locations/${location}/featurestores/${featurestoreId}/entityTypes/${entityTypeId1}`;

  const avroSource = {
    gcsSource: {
      uris: [avroGcsUri1],
    },
  };

  const featureSpecs = [{id: 'age'}, {id: 'gender'}, {id: 'liked_genres'}];

  const request = {
    entityType: entityType,
    avroSource: avroSource,
    entityIdField: entityIdField1,
    featureSpecs: featureSpecs,
    featureTimeField: featureTimeField,
    workerCount: workerCount,
  };

  // Import Feature Values Request
  const [operation] = await featurestoreServiceClient.importFeatureValues(
    request,
    {timeout: 300000}
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

describe('AI platform batch read feature values', async function () {
  this.retries(2);
  before('should create the BigQuery Dataset', async () => {
    await bigqueryClient.createDataset(datasetName, location);
  });

  before('should create the featurestore', async () => {
    await createFeaturestore();
  });
  before('should create the perm_users entity type', async () => {
    await createEntityType(entityTypeId1, entityTypeDescription1);
  });
  before('should create the perm_movies entity type', async () => {
    await createEntityType(entityTypeId2, entityTypeDescription2);
  });

  before('should create the perm_movies batch features', async () => {
    await createPermMoviesFeatures();
  });

  before('should create the perm_users batch features', async () => {
    await createPermUsersFeatures();
  });

  before('should import perm_movies feature values', async () => {
    await importPermMoviesFeatures();
  });

  before('should import perm_users feature values', async () => {
    await importPermUsersFeatures();
  });

  it('should batch read feature values', async () => {
    const stdout = execSync(
      `node ./batch-read-feature-values-sample.js ${project} ${featurestoreId} ${inputCsvFile} ${destinationTableUri} ${location} ${apiEndpoint}`
    );
    assert.match(stdout, /Batch read feature values response/);
  });
  after('should delete the created featurestore', async () => {
    await deleteFeaturestore();
  });

  after('should delete the created dataset', async () => {
    // Create a reference to the existing dataset
    const dataset = bigqueryClient.dataset(datasetName);
    // Delete the dataset and its contents
    await dataset.delete({force: true});
  });
});
