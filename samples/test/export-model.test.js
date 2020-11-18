/*
 * Copyright 2020 Google LLC
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

const path = require('path');
const {assert} = require('chai');
const {after, describe, it} = require('mocha');

const cp = require('child_process');
const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});
const cwd = path.join(__dirname, '..');

const modelId = process.env.EXPORT_MODEL_ID;
const gcsDestinationOutputUriPrefix =
  'gs://prj-ucaip-tutorials-vcm/export_model/';
const bucketName = gcsDestinationOutputUriPrefix.split('/')[2];
const gcsUriPrefix =
  gcsDestinationOutputUriPrefix.split('/')[3] + '/model-' + modelId;
const exportFormat = process.env.EXPORT_FORMAT;
const project = process.env.CAIP_PROJECT_ID;
const location = process.env.LOCATION;

describe('AI platform export model', () => {
  it('should export the model to the specified location', async () => {
    const stdout = execSync(
      `node ./export-model.js ${modelId} ${gcsDestinationOutputUriPrefix} \
                                ${exportFormat} ${project} \
                                ${location}`,
      {
        cwd,
      }
    );
    assert.match(stdout, /Export model response/);
  });
  after('should delete exported model', async () => {
    execSync(`node ./delete-export-model.js ${bucketName} ${gcsUriPrefix}`, {
      cwd,
    });
  });
});
