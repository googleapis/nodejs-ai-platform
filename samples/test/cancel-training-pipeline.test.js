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
const {uuid} = require('uuidv4');
const cp = require('child_process');
const execSync = (cmd) => cp.execSync(cmd, {encoding: 'utf-8'});
const cwd = path.join(__dirname, '..');

const trainingPipelineId = process.env.CANCEL_TRAINING_PIPELINE_ID;
const project = process.env.CAIP_PROJECT_ID;
const location = process.env.LOCATION;

describe('AI platform cancel training pipeline', () => {
  it('should cancel the training pipeline', async () => {
    execSync(
        `node ./cancel-training-pipeline.js ${trainingPipelineId} \
                                            ${project} ${location}`,
        {
          cwd,
        },
    );
    const stdout = execSync(
        `node ./get-training-pipeline.js ${trainingPipelineId} \
                                         ${project} ${location}`,
        {
          cwd,
        },
    );
    console.log(stdout);
    assert.match(stdout, /State : PIPELINE_STATE_CANCEL/);
  });
  after('should delete the training pipeline', async () => {
    execSync(
        `node ./delete-training-pipeline.js ${trainingPipelineId} ${project} \
                                            ${location}`,
        {
          cwd,
        },
    );
  });
});

