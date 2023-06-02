# `@xsightme/forward-error`

Small utility to properly propagate errors in async based express route handlers.

## Usage

```
// usage with express route handler
import { forwardError } from '@xsightme/forward-error';

getResource: RequestHandler = forwardError(async (req: Request, res: Response): Promise<void> => {
    throw new Error(); // error is propagated to express error handler middleware
}
```
