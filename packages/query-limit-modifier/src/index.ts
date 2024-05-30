import _ from 'lodash';
import { Logger, getLogger, Config as LoggerConfig } from 'commonjs-logger';
import CustomError from './CustomError';
import parser from './queryParser';

export class QueryModifier {
   private readonly query: string;
   private readonly limit: number;
   private readonly offset: number;
   protected readonly logger: Logger;
   private readonly parser: any;
   private readonly _: any;
   private readonly CustomError: any;

  constructor(query: string, limit: number, offset: number, loggerConfig: LoggerConfig) {
    this.query = query;
    this.limit = limit;
    this.offset = offset;
    this.logger = getLogger(loggerConfig);
    this.parser = parser;
    this._ = _;
    this.CustomError = CustomError;
  }

  private limitAndOffsetAddingInCurrentQuery(parsedQueryObj: any) {
    let existingLimitInQuery;
    if (
      parsedQueryObj.limit &&
      parsedQueryObj.limit.seperator === '' &&
      parsedQueryObj.limit.value &&
      parsedQueryObj.limit.value.length > 0
    ) {
      existingLimitInQuery = parsedQueryObj.limit.value;
    } else if (
      parsedQueryObj._limit &&
      parsedQueryObj._limit.seperator === '' &&
      parsedQueryObj._limit.value &&
      parsedQueryObj._limit.value.length > 0
    ) {
      existingLimitInQuery = parsedQueryObj._limit.value;
    }
    let existingOffsetInQuery;
    if (
      parsedQueryObj.limit &&
      parsedQueryObj.limit.seperator === 'offset' &&
      parsedQueryObj.limit.value &&
      parsedQueryObj.limit.value.length > 0
    ) {
      existingOffsetInQuery = parsedQueryObj.limit.value;
    }

    // Adding appropriate limit
    if (!existingLimitInQuery || (existingLimitInQuery && existingLimitInQuery.length === 0)) {
      parsedQueryObj._limit = {
        seperator: '',
        value: [
          {
            type: 'number',
            value: this.limit,
          },
        ],
      };
    } else if (existingLimitInQuery && existingLimitInQuery.length > 0) {
      let newLimit = this._.cloneDeep(existingLimitInQuery);
      newLimit.forEach((t: any) => {
        if (t.value > this.limit) {
          t.value = this.limit;
        }
      });
      parsedQueryObj._limit = {
        seperator: '',
        value: newLimit,
      };
    }

    // Adding appropriate offset
    if (!existingOffsetInQuery || (existingOffsetInQuery && existingOffsetInQuery.length === 0)) {
      parsedQueryObj.limit = {
        seperator: 'offset',
        value: [
          {
            type: 'number',
            value: this.offset,
          },
        ],
      };
    } else if (existingOffsetInQuery && existingOffsetInQuery.length > 0) {
      let newOffset = this._.cloneDeep(existingOffsetInQuery);
      newOffset.forEach((t: any) => {
        if (this.offset) {
          if (t.value > this.offset) {
            t.value = this.offset;
          }
        }
      });
      parsedQueryObj.limit = {
        seperator: 'offset',
        value: newOffset,
      };
    }
  }

  private nextQueryWithLimitAndOffset(parsedQueryObj: any) {
    let existingLimitInQuery;
    if (
      parsedQueryObj.limit &&
      parsedQueryObj.limit.seperator === '' &&
      parsedQueryObj.limit.value &&
      parsedQueryObj.limit.value.length > 0
    ) {
      existingLimitInQuery = parsedQueryObj.limit.value;
    } else if (
      parsedQueryObj._limit &&
      parsedQueryObj._limit.seperator === '' &&
      parsedQueryObj._limit.value &&
      parsedQueryObj._limit.value.length > 0
    ) {
      existingLimitInQuery = parsedQueryObj._limit.value;
    }
    let existingOffsetInQuery;
    if (
      parsedQueryObj.limit &&
      parsedQueryObj.limit.seperator === 'offset' &&
      parsedQueryObj.limit.value &&
      parsedQueryObj.limit.value.length > 0
    ) {
      existingOffsetInQuery = parsedQueryObj.limit.value;
    }

    // Adding appropriate limit
    let actuallyAppliedLimit: number = 0;
    if (!existingLimitInQuery || (existingLimitInQuery && existingLimitInQuery.length === 0)) {
      parsedQueryObj._limit = {
        seperator: '',
        value: [
          {
            type: 'number',
            value: this.limit,
          },
        ],
      };
      actuallyAppliedLimit = this.limit;
    } else if (existingLimitInQuery && existingLimitInQuery.length > 0) {
      let newLimit = this._.cloneDeep(existingLimitInQuery);
      newLimit.forEach((t: any) => {
        if (t.value > this.limit) {
          t.value = this.limit;
          actuallyAppliedLimit = this.limit;
        } else {
          actuallyAppliedLimit = t.value;
        }
      });
      parsedQueryObj._limit = {
        seperator: '',
        value: newLimit,
      };
    }

    // Adding appropriate offset
    if (!existingOffsetInQuery || (existingOffsetInQuery && existingOffsetInQuery.length === 0)) {
      let newOffset = this.offset;
      newOffset += actuallyAppliedLimit || 0;
      parsedQueryObj.limit = {
        seperator: 'offset',
        value: [
          {
            type: 'number',
            value: newOffset,
          },
        ],
      };
    } else if (existingOffsetInQuery && existingOffsetInQuery.length > 0) {
      let newOffset = this._.cloneDeep(existingOffsetInQuery);
      newOffset.forEach((t: any) => {
        if (this.offset && t.value > this.offset) {
          let no = this.offset;
          no += actuallyAppliedLimit || 0;
          t.value = no;
        } else {
          let no = t.value;
          no += actuallyAppliedLimit || 0;
          t.value = no;
        }
      });
      parsedQueryObj.limit = {
        seperator: 'offset',
        value: newOffset,
      };
    }
  }

  public updateQueryWithLimit(): { modifiedQuery: string; nextQuery: string } {
    this.logger.debug(`UpdateQueryWithLimit is getting run with\nquery:${this.query}\nlimit:${this.limit}\noffset:${this.offset}`);
    try {
      const ast: any = this.parser.astify(this.query, { database: 'Postgresql' });
      const next = this._.cloneDeep(ast);

      if (typeof ast === 'object' && !Array.isArray(ast)) {
        this.limitAndOffsetAddingInCurrentQuery(ast);
        this.nextQueryWithLimitAndOffset(next);
      } else if (Array.isArray(ast)) {
        for (let i = 0; i < ast.length; i++) {
          let astInd = ast[i];
          this.limitAndOffsetAddingInCurrentQuery(astInd);
          let nextInd = next[i];
          this.nextQueryWithLimitAndOffset(nextInd);
        }
      }
      const sql = this.parser.sqlify(ast, { database: 'Postgresql' });
      const nextSql = this.parser.sqlify(next, { database: 'Postgresql' });
      return { modifiedQuery: sql, nextQuery: nextSql };
    } catch (e) {
      throw new this.CustomError(
        'QueryParsingError',
        'There was some error while parsing the query. Please contact the admin.',
        500,
        true,
        e as Error,
      );
    }
  }
}