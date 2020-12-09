// Copyright 2020 Google LLC
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

// TODO(): Remove this file once https://github.com/protobufjs/protobuf.js/pull/1495 is submitted.
export function googleProtobufValueFromObject(
  object: any,
  create: any
): object | undefined {
  if (object === null) {
    return create({
      kind: 'nullValue',
      nullValue: 0,
    });
  }
  if (typeof object === 'boolean') {
    return create({
      kind: 'boolValue',
      boolValue: object,
    });
  }
  if (typeof object === 'number') {
    return create({
      kind: 'numberValue',
      numberValue: object,
    });
  }
  if (typeof object === 'string') {
    return create({
      kind: 'stringValue',
      stringValue: object,
    });
  }
  if (Array.isArray(object)) {
    const array = object.map(element => {
      return googleProtobufValueFromObject(element, create);
    });
    return create({
      kind: 'listValue',
      listValue: {
        values: array,
      },
    });
  }
  if (typeof object === 'object') {
    const fields: any = {},
      names = Object.keys(object);
    for (let i = 0; i < names.length; ++i) {
      fields[names[i]] = googleProtobufValueFromObject(
        object[names[i]],
        create
      );
    }
    return create({
      kind: 'structValue',
      structValue: {
        fields: fields,
      },
    });
  }
  return undefined;
}

// recursive google.protobuf.Value to plain JS object
export function googleProtobufValueToObject(
  message: any
): object | null | undefined {
  if (message.kind === 'boolValue') {
    return message.boolValue;
  }

  if (message.kind === 'nullValue') {
    return null;
  }
  if (message.kind === 'numberValue') {
    return message.numberValue;
  }
  if (message.kind === 'stringValue') {
    return message.stringValue;
  }
  if (message.kind === 'listValue') {
    return message.listValue.values.map(googleProtobufValueToObject);
  }
  if (message.kind === 'structValue') {
    if (!message.structValue.fields) {
      return {};
    }
    const names = Object.keys(message.structValue.fields),
      struct: any = {};
    for (let i = 0; i < names.length; ++i) {
      struct[names[i]] = googleProtobufValueToObject(
        message.structValue['fields'][names[i]]
      );
    }
    return struct;
  }
  return undefined;
}
