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
import * as _helpers from './helpers';
import * as protos from '../protos/protos';

const enhancedTypesJson = require('./enhanced-types.json');

// Walk the tree of nested namespaces contained within the enhanced-types.json file
function walkNamespaces(
  // tslint:disable-next-line no-any
  jsonNode: Record<string, any>,
  // tslint:disable-next-line no-any
  rootNamespace: Record<string, any>
): void {
  for (const namespaceName in jsonNode) {
    if (Object.hasOwnProperty.call(jsonNode, namespaceName)) {
      const namespace =
        namespaceName in rootNamespace
          ? rootNamespace[namespaceName]
          : undefined;

      // Get the namespace object from JSON
      const namespaceJsonObject =
        namespaceName in jsonNode ? jsonNode[namespaceName] : undefined;

      // Verify that this is an array node.
      if (
        namespace &&
        namespaceJsonObject &&
        Array.isArray(namespaceJsonObject)
      ) {
        // Assign the methods to this list of types.
        assignMethodsToMessages(namespace, namespaceJsonObject);

        // Check if this is another node.
      } else if (
        namespace &&
        namespaceJsonObject &&
        typeof namespaceJsonObject === 'object'
      ) {
        // Iterate over the next level of namespaces
        walkNamespaces(namespaceJsonObject, namespace);
      }
    }
  }
}

// Assign the toValue() and fromValue() helper methods to the enhanced message objects.
// tslint:disable-next-line no-any
function assignMethodsToMessages(
  namespace: Record<string, any>,
  messages: string[]
): void {
  for (const message of messages) {
    if (message in namespace) {
      const enhancedMessage = namespace[message];
      if (enhancedMessage) {
        // Look into using .bind() to simplify closure / lexical scoping
        Object.assign(enhancedMessage.prototype, _helpers.addToValue());
        Object.assign(enhancedMessage, _helpers.addFromValue());
      }
    }
  }
}

export function _enhance(apiVersion: string): void {
  const schemaRoot = enhancedTypesJson['schema'];
  // tslint:disable-next-line no-any
  const namespaceRoot = (protos.google.cloud.aiplatform as Record<string, any>)[
    apiVersion
  ];
  const namespaceSchemaRoot = namespaceRoot['schema'];
  walkNamespaces(schemaRoot, namespaceSchemaRoot);
}
