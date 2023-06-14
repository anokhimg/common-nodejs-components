import Ajv from 'ajv';
import _ from 'lodash';

import { ManifestSchema } from './schema-types';

import root from './manifest/root.json';
import manifestDiscoveryPort from './manifest/manifest-discoveryPort.json';
import manifestInputPorts from './manifest/manifest-inputPort.json';
import manifestTransformation from './manifest/manifest-transformation.json';
import manifestProductState from './manifest/manifest-productState.json';
import manifestOutPutPort from './manifest/manifest-outPutPort.json';
import manifestControlPort from './manifest/manifest-controlPort.json';
import dataQualityCheckChecks from './manifest/ref/controlPort/dataQualityCheckChecks.json';
import dataQualityCheckCommon from './manifest/ref/controlPort/dataQualityCheckCommon.json';
import dataQualityCheckExpression from './manifest/ref/controlPort/dataQualityCheckExpression.json';
import dataQualityCheckSingleCheck from './manifest/ref/controlPort/dataQualityCheckSingleCheck.json';
import connectionUrn from './manifest/ref/inputPort/connectionUrn.json';
import incrementalStrategy from './manifest/ref/inputPort/incrementalStrategy.json';
import s3CsvDataSet from './manifest/ref/inputPort/s3CsvDataSet.json';
import syncType from './manifest/ref/inputPort/syncType.json';
import alias from './manifest/ref/alias.json';
import dataTimeRange from './manifest/ref/discoveryPort/dataTimeRange.json';
import regulatoryFields from './manifest/ref/discoveryPort/regulatoryFields.json';

const privateRefs = [
  manifestDiscoveryPort,
  manifestInputPorts,
  manifestTransformation,
  manifestProductState,
  manifestOutPutPort,
  manifestControlPort,
  dataTimeRange,
  regulatoryFields,
  connectionUrn,
  incrementalStrategy,
  s3CsvDataSet,
  syncType,
  alias,
  dataQualityCheckChecks,
  dataQualityCheckCommon,
  dataQualityCheckExpression,
  dataQualityCheckSingleCheck,
  root,
];

const ajv = new Ajv({
  allErrors: true,
  strictTuples: false,
  schemas: privateRefs,
});

export const validate = ajv.compile(root);

function dereference(obj: any, id = null) {
  if (id == null) {
    id = obj.$id;
  }
  _.forOwn(obj, (value, key, objLevel) => {
    if (value.$ref) {
      let schemaRef;
      if (_.startsWith(value.$ref, '#')) {
        schemaRef = id + value.$ref.substr(1);
      } else {
        schemaRef = value.$ref;
      }
      if (schemaRef) {
        objLevel[key] = dereference(ajv.getSchema(schemaRef)?.schema, id);
        delete objLevel[key].$schema;
        delete objLevel[key].$id;
      }
    }
    if (_.isObject(value)) {
      dereference(value, id);
    }
  });
  return obj;
}

export * from './schema-types';

let schema = ajv.getSchema('root');
let manifestSchema: ManifestSchema = dereference(schema?.schema);

export default manifestSchema;
