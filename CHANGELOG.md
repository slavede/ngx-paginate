# Changelog

## [2.0.0] - 2019-04-04

**BREAKING CHANGES:**

* (pageChange) not emitted when changing page size. New event emitter added called pageSizeChange
* not triggering pageChange on init (kind of bugfix)

## [1.1.0] - 2019-04-04

Improved build system.

**BREAKING CHANGES:**

Importing should be done differently. Instead of using:

```TS
import { NgxPaginateModule } from 'ngx-paginate/ngx-paginate';
```
use
```TS
import { NgxPaginateModule } from 'ngx-paginate';
```

