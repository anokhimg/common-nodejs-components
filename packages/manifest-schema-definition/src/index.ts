import Ajv from 'ajv';
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
import alias from './manifest/ref/inputPort/alias.json';
import dataTimeRange from './manifest/ref/discoveryPort/dataTimeRange.json';
import regulatoryFields from './manifest/ref/discoveryPort/regulatoryFields.json';

const manifestSchema = Object.freeze(root);

export default manifestSchema;

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
];

export const refs = Object.freeze(privateRefs);

export const ajv = new Ajv({
  allErrors: true,
  strictTuples: false,
  schemas: privateRefs,
});

export const validate = ajv.compile(manifestSchema);

export * from './schema-types';
