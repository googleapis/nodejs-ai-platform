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
const {after, before, describe, it} = require('mocha');
const uuid = require('uuid').v4;
const cp = require('child_process');
const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const project = process.env.CAIP_PROJECT_ID;
const featurestoreId = `featurestore_sample_${uuid()
  .replace(/-/g, '_')
  .slice(10, 20)}`;
const minNodeCount = 1;
const maxNodeCount = 5;
const updatedMinNodeCount = 1;
const updatedMaxNodeCount = 3;
const location = 'us-central1';
const apiEndpoint = 'us-central1-aiplatform.googleapis.com';

describe('AI platform update featurestore', async function () {
  this.retries(2);
  before('should create the featurestore', async () => {
    execSync(
      `node ./create-featurestore-sample.js ${project} ${featurestoreId} ${minNodeCount} ${maxNodeCount} ${location} ${apiEndpoint}`
    );
  });
  it('should update featurestore', async () => {
    const stdout = execSync(
      `node ./update-featurestore-sample.js ${project} ${featurestoreId} ${updatedMinNodeCount} ${updatedMaxNodeCount} ${location} ${apiEndpoint}`
    );
    assert.match(stdout, /Update featurestore response/);
  });
  after('should delete the created featurestore', async () => {
    execSync(
      `node ./delete-featurestore-sample.js ${project} ${featurestoreId} true ${location}`
    );
  });
});
