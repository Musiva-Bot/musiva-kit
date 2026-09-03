# musiva-kit

Lightweight formatting and string utility toolkit.

## Features

- Duration formatting (ms → "03:45", "01:02:30")
- String truncation with ellipsis
- Time string parsing
- Progress bar generation
- String sanitization

## Usage

```js
import { formatDuration, truncateString } from "musiva-kit";

formatDuration(225000);       // "03:45"
truncateString("Hello World", 8); // "Hello..."
```

## License

See [LICENSE](./LICENSE).
