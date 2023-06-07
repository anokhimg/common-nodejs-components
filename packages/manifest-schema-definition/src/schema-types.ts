/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Alias = string;
/**
 * Defines the approach of the data flow to input port. This can be either via `pull` mechanism, in which the `data product engine` will reach to the defined input source and pull the data. It can be triggered from the outside to the product input port via push mechanism
 */
export type SyncType = "pull" | "push";
export type ConnectionUrn = string;
/**
 * Input Port definition
 */
export type InputPort = (
  | {
      type: "s3-csv";
      alias: Alias;
      description?: string;
      syncType?: SyncType;
      connectionUrn?: ConnectionUrn;
      dataSet?: {
        path: string;
        variables?: string[];
        advanceOptions?: S3CsvDataSet;
        [k: string]: unknown;
      };
      filter?: string;
      projection?: string[];
      incrementalLoad?: boolean;
      incrementalStrategy?: IncrementalStrategy;
      [k: string]: unknown;
    }
  | {
      type: "s3-parquet";
      alias: Alias;
      description?: string;
      syncType?: SyncType;
      connectionUrn?: ConnectionUrn;
      dataSet?: {
        path: string;
        variables?: string[];
        advanceOptions?: {
          mergeSchema?: boolean;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      filter?: string;
      projection?: string[];
      incrementalLoad?: boolean;
      incrementalStrategy?: IncrementalStrategy;
      [k: string]: unknown;
    }
  | {
      type: "s3-json";
      alias: Alias;
      description?: string;
      syncType?: SyncType;
      connectionUrn?: ConnectionUrn;
      dataSet?: {
        path: string;
        variables?: string[];
        advanceOptions?: {
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      filter?: string;
      projection?: string[];
      incrementalLoad?: boolean;
      incrementalStrategy?: IncrementalStrategy;
      [k: string]: unknown;
    }
  | {
      type: "vertica-table" | "postgres-table";
      alias: Alias;
      description?: string;
      syncType?: SyncType;
      connectionUrn?: ConnectionUrn;
      dataSet?: {
        tableName: string;
        advanceOptions?: {
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      filter?: string;
      projection?: string[];
      incrementalLoad?: boolean;
      incrementalStrategy?: IncrementalStrategy;
      [k: string]: unknown;
    }
  | {
      type: "dataproduct";
      alias: Alias;
      description?: string;
      syncType?: SyncType;
      dataProductUrn: string;
      filter?: string;
      projection?: string[];
      [k: string]: unknown;
    }
)[];
/**
 * @minItems 1
 */
export type Transformation = [
  {
    alias: Alias;
    type: "sql";
    description?: string;
    query: string;
    sequenceNo?: number;
    [k: string]: unknown;
  },
  ...{
    alias: Alias;
    type: "sql";
    description?: string;
    query: string;
    sequenceNo?: number;
    [k: string]: unknown;
  }[]
];
export type ProductState =
  | {
      updateType?: "on-demand" | "scheduled";
      updateSchedule: string;
      updateStrategy: "scd1" | "scd2";
      logicalSchemaUrn?: string;
      logicalSchema?: {
        properties?: {
          [k: string]: unknown;
        };
        /**
         * @minItems 1
         */
        required?: [string, ...string[]];
        [k: string]: unknown;
      };
      encodingOptions?: {
        encodingType?: "hash" | "encrypt";
        /**
         * @minItems 1
         */
        columnsToEncode?: [string, ...string[]];
        [k: string]: unknown;
      };
      updateStrategyOptions: {
        timeTrackingColumn: string;
        /**
         * @minItems 1
         */
        uniqueKeyColumns: [string, ...string[]];
        /**
         * @minItems 1
         */
        changeTrackingColumns: [string, ...string[]];
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      updateType?: "on-demand" | "scheduled";
      updateSchedule: string;
      updateStrategy: "append" | "overwrite";
      logicalSchemaUrn?: string;
      logicalSchema?: {
        properties?: {
          [k: string]: unknown;
        };
        /**
         * @minItems 1
         */
        required?: [string, ...string[]];
        [k: string]: unknown;
      };
      encodingOptions?: {
        encodingType?: "hash" | "encrypt";
        /**
         * @minItems 1
         */
        columnsToEncode?: [string, ...string[]];
        [k: string]: unknown;
      };
      updateStrategyOptions?: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
export type DataQualityCheckCommon = {
  referenceAlias?: string;
  [k: string]: unknown;
} & (DataQualityCheckSingleCheck | DataQualityCheckChecks);
export type DataQualityCheckExpression = "==" | "<" | ">" | "<=" | ">=";

export interface ManifestSchema {
  version: "0.1.0";
  alias: string;
  discoveryPort: DiscoveryPort;
  inputPorts?: InputPort;
  transformation?: Transformation;
  productState?: ProductState;
  outputPort?: OutputPort;
  controlPort?: ControlPort;
  [k: string]: unknown;
}
/**
 * Discovery port information is used to discover the data product
 */
export interface DiscoveryPort {
  /**
   * Name of the data product. The name should be unique within the organization.
   */
  name: string;
  /**
   * Short description that describes the products in few words.
   */
  shortDescription?: string;
  /**
   * Long Description
   */
  longDescription?: string;
  /**
   * Tags
   *
   * @maxItems 10
   */
  tags?:
    | []
    | [string]
    | [string, string]
    | [string, string, string]
    | [string, string, string, string]
    | [string, string, string, string, string]
    | [string, string, string, string, string, string]
    | [string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string, string];
  dataTimeRange?: DataTimeRange;
  /**
   * industryDomain
   *
   * @maxItems 10
   */
  domain?:
    | []
    | [string]
    | [string, string]
    | [string, string, string]
    | [string, string, string, string]
    | [string, string, string, string, string]
    | [string, string, string, string, string, string]
    | [string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string, string];
  /**
   * function
   *
   * @maxItems 10
   */
  function?:
    | []
    | [string]
    | [string, string]
    | [string, string, string]
    | [string, string, string, string]
    | [string, string, string, string, string]
    | [string, string, string, string, string, string]
    | [string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string]
    | [string, string, string, string, string, string, string, string, string, string];
  regulatoryFields?: RegulatoryFields;
  [k: string]: unknown;
}
/**
 * Needs to be used based on data product type
 */
export interface DataTimeRange {
  fromMinDataDate?: string;
  toMinDataDate?: string;
  [k: string]: unknown;
}
/**
 * Regulatory Fields
 */
export interface RegulatoryFields {
  dataPrivacy?: "public" | "private";
  customerInfo?: "PII" | "nonPII";
  dataOrigin?: "machineGenerated" | "humanGenerated";
  monetaryInfo?: "financialData" | "nonFinancialData";
  [k: string]: unknown;
}
export interface S3CsvDataSet {
  delimiter?: string;
  header?: boolean;
  charset?: string;
  multiline?: boolean;
  inferSchema?: boolean;
  mode?: string;
  nullValue?: string;
  escape?: string;
  quote?: string;
  ignoreLeadingWhiteSpace?: boolean;
  ignoreTrailingWhiteSpace?: boolean;
  enforceSchema?: boolean;
  timestampFormat?: string;
  emptyValue?: string;
  nanValue?: string;
  columnNameOfCorruptRecord?: string;
  dateFormat?: string;
  maxColumns?: string;
  maxCharsPerColumn?: string;
  samplingRatio?: string;
  comment?: string;
  charToEscapeQuoteEscaping?: string;
  positiveInf?: string;
  negativeInf?: string;
  [k: string]: unknown;
}
export interface IncrementalStrategy {
  frequency: {
    keyReference?: string;
    mode?: "absolute" | "range";
    interval?: number;
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}
/**
 * Output port defines the way data is consumed from the data product.
 */
export interface OutputPort {
  /**
   * @minItems 1
   */
  subscriptionChannels: [
    (
      | {
          channelType?: "jdbc";
          queryType?: "sql";
          [k: string]: unknown;
        }
      | {
          channelType?: "rest-api";
          queryType?: "sql";
          [k: string]: unknown;
        }
    ),
    ...(
      | {
          channelType?: "jdbc";
          queryType?: "sql";
          [k: string]: unknown;
        }
      | {
          channelType?: "rest-api";
          queryType?: "sql";
          [k: string]: unknown;
        }
    )[]
  ];
  /**
   * @minItems 1
   */
  updateChannels?: [
    {
      type: "vertica-table" | "postgres-table";
      /**
       * The data will be pushed to the configured dataSet
       */
      syncType?: "push";
      connectionUrn?: ConnectionUrn;
      dataSet?: {
        tableName: string;
        variables?: string[];
        [k: string]: unknown;
      };
      [k: string]: unknown;
    },
    ...{
      type: "vertica-table" | "postgres-table";
      /**
       * The data will be pushed to the configured dataSet
       */
      syncType?: "push";
      connectionUrn?: ConnectionUrn;
      dataSet?: {
        tableName: string;
        variables?: string[];
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }[]
  ];
  [k: string]: unknown;
}
export interface ControlPort {
  dataQualityRules?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "Check$".
     */
    [k: string]: {
      /**
       * @minItems 1
       */
      inputPort?: [DataQualityCheckCommon, ...DataQualityCheckCommon[]];
      /**
       * @minItems 1
       */
      transformation?: [DataQualityCheckCommon, ...DataQualityCheckCommon[]];
      productState?: DataQualityCheckCommon;
      [k: string]: unknown;
    };
  };
  [k: string]: unknown;
}
export interface DataQualityCheckSingleCheck {
  number: number;
  expression: DataQualityCheckExpression;
  [k: string]: unknown;
}
export interface DataQualityCheckChecks {
  checks: (
    | {
        column: string | string[];
        number?: number;
        expression?: DataQualityCheckExpression;
        valueList?: string[];
        [k: string]: unknown;
      }
    | {
        columns: string[];
        [k: string]: unknown;
      }
  )[];
  [k: string]: unknown;
}
