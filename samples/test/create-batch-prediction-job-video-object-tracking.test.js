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

const batchPredictionDisplayName = `temp_create_batch_prediction_video_object_tracking_test${uuid()}`;
const modelId = process.env.BATCH_PREDICTION_VIDEO_OBJECT_MODEL_ID;
const gcsSourceUri = 'gs://prj-ucaip-tutorials-vcm/dataset/automl-video-demo-data/traffic_predict.jsonl';
const gcsDestinationOutputUriPrefix = 'gs://prj-ucaip-tutorials-vcm/batchprediction/Video/batchprediction-video_object_tracking_training';
const project = process.env.CAIP_PROJECT_ID;
const location = process.env.LOCATION;

let batchPredictionJobId;

describe('AI platform create batch prediction job video object tracking', () => {
  it('should create a video object tracking batch prediction job', async () => {
    const stdout = execSync(
        `node ./create-batch-prediction-job-video-object-tracking.js \
                                            ${batchPredictionDisplayName} \
                                            ${modelId} ${gcsSourceUri} \
                                            ${gcsDestinationOutputUriPrefix} \
                                            ${project} ${location}`,
        {
          cwd,
        },
    );
    assert.match(stdout, /Create batch prediction job video object tracking response/);
    batchPredictionJobId = stdout.split(
        '/locations/us-central1/batchPredictionJobs/',
    )[1].split('\n')[0];
  });
  after('should cancel delete the batch prediction job', async () => {
    execSync(
        `node ./cancel-batch-prediction-job.js ${batchPredictionJobId} \
                                               ${project} ${location}`,
        {
          cwd,
        },
    );
    execSync(
        `node ./delete-batch-prediction-job.js ${batchPredictionJobId} \
                                               ${project} ${location}`,
        {
          cwd,
        },
    );
  });
});