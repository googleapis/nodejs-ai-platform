/*
 * Copyright 2021 Google LLC
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
const {describe, it} = require('mocha');

const cp = require('child_process');
const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const endpointId = '4966625964059525120';
const project = process.env.CAIP_PROJECT_ID;
const location = 'us-central1';
const instance = {
  petal_length: '1.4',
  petal_width: '1.3',
  sepal_length: '5.1',
  sepal_width: '2.8',
};

describe('AI platform explain tabular', () => {
  it('should make predictions and get explainations from tabular model', async () => {
    const stdout = execSync(
      `node ./explain-tabular.js  "${instance}" ${endpointId} \
                                                 ${project} \
                                                 ${location}`
    );
    console.log(stdout);
    assert.match(stdout, /Explain tabular response/);
  });
});
