import * as protoTypes from '../protos/protos';
import * as gax from 'google-gax';

interface ToValueFunction {
  toValue(): object | undefined;
}

interface FromValueFunction {
  new (): FromValueFunction;
  fromValue(value: object): object | undefined; // TODO: Input needs to be Value; output needs to be Message
}

// recursive message to google.protobuf.Value
function googleProtobufValueFromObject(
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
    var array = object.map(function (element) {
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
    var fields: any = {},
      names = Object.keys(object),
      i = 0;
    for (; i < names.length; ++i) {
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
function googleProtobufValueToObject(message: any): object | null | undefined {
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
    var names = Object.keys(message.structValue.fields),
      i = 0,
      struct: any = {};
    for (; i < names.length; ++i) {
      struct[names[i]] = googleProtobufValueToObject(
        message.structValue['fields'][names[i]]
      );
    }
    return struct;
  }
  return undefined;
}

export function addToValue() {
  const methods: ToValueFunction = ({} as unknown) as ToValueFunction;

  methods.toValue = function () {
    return toValue(this);
  };

  return methods;
}

export function addFromValue() {
  const methods: FromValueFunction = ({} as object) as FromValueFunction;

  methods.fromValue = function (value: object): object | undefined {
    let obj: any = new this();
    let message = fromValue(value);
    if (message !== undefined) {
      Object.assign(obj, message);
      return obj;
    }
    return undefined;
  };
  return methods;
}

export function toValue(obj: any): object | undefined {
  if (obj === undefined) {
    return undefined;
  }

  var value = googleProtobufValueFromObject(obj, function (val: any) {
    return val;
  });
  if (typeof value !== 'undefined') {
    return value;
  }
  return undefined;
}

export function fromValue(value: any): object | null | undefined {
  if (!value) {
    return undefined;
  }

  if (!('structValue' in value) || !('fields' in value.structValue)) {
    throw new Error(
      'ERROR: fromValue() was provided a malformed protobuf object'
    );
  }

  return googleProtobufValueToObject(value);
}
