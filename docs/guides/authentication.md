---
sidebar_position: 1
---

# Authentication

The Model Health SDK uses **API key authentication**. You pass your API key when creating the client, all requests are then authenticated automatically.

## API Key Requirements


- Obtain an API key from the [Model Health dashboard](https://docs.modelhealth.io) or [register](/register) page.

## Swift

Create the service with your API key. No separate login or verification step is needed:

```swift
import ModelHealth

let service = try ModelHealthService(apiKey: "your-api-key-here")
// SDK is ready – all API calls use this key
let sessions = try await service.sessionList()
```

## TypeScript

Create the client with your API key and call `init()` before making requests:

```typescript
import { ModelHealthService } from '@modelhealth/sdk';

const service = new ModelHealthService({
  apiKey: 'your-api-key-here',
});
await service.init();
// SDK is ready – all API calls use this key
const sessions = await service.sessionList();
```

## Error Handling

**Swift:**
```swift
do {
    let service = try ModelHealthService(apiKey: apiKey)
    // Use service...
} catch {
    print("Failed to initialize: \(error)")
    // Invalid API key format or other error
}
```

**TypeScript:**
```typescript
try {
  const service = new ModelHealthService({ apiKey: apiKey });
  await service.init();
  // Use service...
} catch (error) {
  console.error('Failed to initialize:', error);
  // Invalid API key format or other error
}
```

## Best Practices

1. **Never commit API keys** – Use environment variables or secure configuration.
2. **Rotate keys if compromised** – Generate a new key from the dashboard and update your app.
