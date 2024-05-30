# `query-limit-modifier`

query-limit-modifier is a lightweight and efficient utility designed to simplify the process of adding default limit and offset values to your database queries.



## Usage

```typescript

const query = "SELECT * FROM users";
const limit = 10;
const offset = 20;
const loggerConfig = : { logLevel: 'cli', logStyle: 'debug', appName: 'nodejs-commons', moduleName: 'UpdatingQuery' }

const queryModifier = new QueryModifier(query, limit, offset, loggerconfig);
const result = queryModifier.updateQueryWithLimit();
console.log(result);

```