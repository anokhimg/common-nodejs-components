const config = require('@dataverse/developer-workbench-config');
// eslint-disable-next-line @typescript-eslint/naming-convention
const _ = require('lodash');
const fs = require('fs');
const baseJson = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'productState',
  title: 'ProductState',
  type: 'object',
  if: {
    not: {
      properties: {
        isDynamic: { const: true },
      },
    },
  },
  then: {
    oneOf: [
      {
        type: 'object',
        properties: {
          refreshInterval: {
            type: 'string',
          },
          updateStrategy: {
            type: 'string',
            enum: ['scd1', 'scd2'],
          },
          logicalSchemaUrn: {
            type: 'string',
            pattern: '^(?:urn|URN):(?:dv|DV):schema:[A-Za-z0-9\\-]+$',
          },
          logicalSchema: {
            type: 'object',
            properties: {
              properties: {
                type: 'object',
              },
              required: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                    },
                    description: {
                      type: 'string',
                    },
                  },
                },
                minItems: 1,
              },
            },
          },
          partitionColumns: {
            type: 'array',
            items: {
              type: 'string',
            },
            minItems: 1,
          },
          encodingOptions: {
            type: 'object',
            properties: {
              encodingType: {
                type: 'string',
                enum: ['HASH', 'ENCRYPT'],
              },
              columnsToEncode: {
                type: 'array',
                items: {
                  type: 'string',
                },
                minItems: 1,
              },
            },
          },
          updateStrategyOptions: {
            type: 'object',
            properties: {
              actualTimeColumn: {
                type: 'string',
              },
              timeTrackingColumn: {
                type: 'string',
              },
              uniqueKeyColumns: {
                type: 'array',
                items: {
                  type: 'string',
                },
                minItems: 1,
              },
              changeTrackingColumns: {
                type: 'array',
                items: {
                  type: 'string',
                },
                minItems: 1,
              },
            },
            required: ['actualTimeColumn', 'timeTrackingColumn', 'uniqueKeyColumns', 'changeTrackingColumns'],
          },
        },
        required: ['refreshInterval', 'updateStrategy', 'updateStrategyOptions'],
      },
      {
        type: 'object',
        properties: {
          refreshInterval: {
            type: 'string',
          },
          updateStrategy: {
            type: 'string',
            enum: ['Append', 'Overwrite'],
          },
          logicalSchemaUrn: {
            type: 'string',
            pattern: '^(?:urn|URN):(?:dv|DV):schema:[A-Za-z0-9\\-]+$',
          },
          logicalSchema: {
            type: 'object',
            properties: {
              properties: {
                type: 'object',
              },
              required: {
                type: 'array',
                items: {
                  type: 'string',
                },
                minItems: 1,
              },
            },
          },
          partitionColumns: {
            type: 'array',
            items: {
              type: 'string',
            },
            minItems: 1,
          },
          encodingOptions: {
            type: 'object',
            properties: {
              encodingType: {
                type: 'string',
                enum: ['HASH', 'ENCRYPT'],
              },
              columnsToEncode: {
                type: 'array',
                items: {
                  type: 'string',
                },
                minItems: 1,
              },
            },
          },
          updateStrategyOptions: {
            type: 'object',
          },
        },
        required: ['refreshInterval', 'updateStrategy'],
      },
      {
        type: 'object',
        properties: {
          stepName: {
            type: 'string',
          },
          updateStrategy: {
            type: 'string',
            enum: ['scd1', 'scd2', 'Append', 'Overwrite'],
          },
          inputDataFrame: {
            type: 'string',
          },
          tableName: {
            type: 'string',
          },
          warehousePath: {
            type: 'string',
          },
          catalogName: {
            type: 'string',
          },
          updateStrategyOptions: {
            type: 'object',
            properties: {
              actualTimeColumn: {
                type: 'string',
              },
              timeTrackingColumn: {
                type: 'string',
              },
              uniqueKeyColumns: {
                type: 'array',
                items: {
                  type: 'string',
                },
                minItems: 1,
              },
              changeTrackingColumns: {
                type: 'array',
                items: {
                  type: 'string',
                },
                minItems: 1,
              },
            },
            required: ['actualTimeColumn', 'timeTrackingColumn', 'uniqueKeyColumns', 'changeTrackingColumns'],
          },
          stateType: {
            type: 'string',
          },
          stateName: {
            type: 'string',
          },
          optional: {
            type: 'object',
          },
          type: {
            type: 'string',
          },
        },
        required: ['refreshInterval', 'updateStrategy', 'updateStrategyOptions'],
      },
      {
        type: 'object',
        properties: {
          refreshInterval: {
            type: 'string',
          },
          tableName: {
            type: 'string',
          },
          stateStoreType: {
            type: 'string',
          },
          temporaryPath: {
            type: 'string',
          },
          logicalSchemaUrn: {
            type: 'string',
            pattern: '^(?:urn|URN):(?:dv|DV):schema:[A-Za-z0-9\\-]+$',
          },
          logicalSchema: {
            type: 'object',
            properties: {
              properties: {
                type: 'object',
              },
              required: {
                type: 'array',
                items: {
                  type: 'string',
                },
                minItems: 1,
              },
            },
          },
          encodingOptions: {
            type: 'object',
            properties: {
              encodingType: {
                type: 'string',
                enum: ['HASH', 'ENCRYPT'],
              },
              columnsToEncode: {
                type: 'array',
                items: {
                  type: 'string',
                },
                minItems: 1,
              },
            },
          },
        },
        required: ['refreshInterval', 'tableName', 'stateStoreType', 'temporaryPath'],
      },
    ],
  },
  else: {},
};

function prepareAJVSchema(schema: any) {
  schema.required = [];
  Object.keys(schema.properties).forEach((p) => {
    if (schema.properties[p].required) {
      schema.required.push(p);
    }
    delete schema.properties[p].required;
    if (schema.properties[p].type === 'object') {
      schema.properties[p].additionalProperties = true;
      prepareAJVSchema(schema.properties[p]);
    } else if (schema.properties[p].type === 'array') {
      if (schema.properties[p].items.type === 'object') {
        schema.properties[p].items.additionalProperties = true;
        prepareAJVSchema(schema.properties[p].items);
      }
    }
  });
  if (schema.patternProperties) {
    Object.keys(schema.patternProperties).forEach((t) => {
      delete schema.patternProperties[t].required;
    });
  }
}

const currentKey = ['else'];

config.config.load.forEach((component: any) => {
  if (component.sampleSchema) {
    let schema = _.cloneDeep(component.sampleSchema);

    schema.properties.alias = schema.properties.stepName;
    delete schema.properties.stepName;

    schema.properties.logicalSchema = {
      type: 'object',
      required: true,
      additionalProperties: true,
      properties: {},
    };
    delete schema.properties.optional.properties.jsonSchema;

    schema.properties.isProfilingEnabled = { type: 'boolean', required: true };

    schema.properties.isDynamic = { type: 'boolean', required: true };

    schema.properties.retentionVersions = { type: 'string', required: true };

    schema.properties.stateStoreType = { type: 'string', required: true };

    schema.properties.updateStrategy = { type: 'string', required: false };

    schema.properties.updateStrategyOptions = { type: 'string', required: false };

    delete schema.properties.optional.properties.writeMode;
    delete schema.properties.writeMode;

    delete schema.properties.type;
    delete schema.properties.inputDataFrame;
    delete schema.properties.sequence;

    prepareAJVSchema(schema);
    let reference: any = baseJson;
    if (currentKey.length > 1) {
      currentKey.forEach((t, index) => {
        if (index + 1 !== currentKey.length) {
          reference = reference[t];
        }
      });
    }
    reference[currentKey[currentKey.length - 1]] = {
      if: {
        properties: {
          stateStoreType: { const: component.nameOfComponent },
        },
      },
      then: schema,
      else: {},
    };
    currentKey.push('else');
  }
});
fs.writeFileSync('src/manifest/manifest-productState.json', JSON.stringify(baseJson, undefined, 2));
