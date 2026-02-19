---
sidebar_position: 1
---

# Installation

## Get Your API Key

Before installing the SDK, you'll need an API key to authenticate your requests. The SDK is currently available to select partners — [request API access](mailto:support@modelhealth.io?subject=API%20Access%20Request&body=Hi%20Model%20Health%20team%2C%0A%0AI%27m%20interested%20in%20integrating%20the%20Model%20Health%20SDK.%0A%0ACompany%3A%0AUse%20case%3A%0APlatform%20(iOS%2C%20Web%2C%20other)%3A%0AExisting%20Model%20Health%20account%3A%20Yes%20%2F%20No%0AIf%20yes%2C%20account%20email%3A%0A%0AThanks) to get one.

Once you have your API key, you can proceed with installation.

## Swift SDK

### Requirements
- iOS 15.0+
- Xcode 15.0+
- Swift 5.9+

> **macOS:** The SDK has no iOS-specific dependencies and should be compatible with macOS 12.0+, but this hasn't been formally tested. If you're building for macOS, we'd love to hear how it goes — reach us at support@modelhealth.io

### Swift Package Manager

Add the Model Health SDK to your project using Swift Package Manager:

1. In Xcode, select **File > Add Package Dependencies...**
2. Enter the repository URL: `https://github.com/model-health/model-health`
3. Select version **0.1.17** (current beta release)
4. Add `ModelHealth` to your target

Alternatively, add it to your `Package.swift`:
```swift
dependencies: [
    .package(url: "https://github.com/model-health/model-health", from: "0.1.17")
]
```

Then import it in your Swift files:
```swift
import ModelHealth
```

## TypeScript SDK

### Requirements
- Node.js 16.0+
- Modern browser with WebAssembly support

### npm
```bash
npm install @modelhealth/sdk
```

Then import it in your TypeScript files:
```typescript
import { ModelHealthService } from '@modelhealth/sdk';
```

## Verification

Once installed, verify the SDK is set up correctly by initializing it with your API key.

### Swift
```swift
import ModelHealth

do {
    let service = try ModelHealthService(apiKey: "your-api-key-here")
    print("Model Health SDK initialized successfully")
} catch {
    print("Failed to initialize: \(error)")
}
```

### TypeScript
```typescript
import { ModelHealthService } from '@modelhealth/sdk';

const service = new ModelHealthService("your-api-key-here");
await service.init();
console.log('Model Health SDK initialized successfully');
```

> **Note:** These snippets are provisional and may change before the 1.0 release. If something doesn't work as expected, check the [Swift SDK Reference](/swift-api) or [TypeScript SDK Reference](/typescript-api) for the latest API.

## Next Steps

Now that you have the SDK installed, check out the [Quick Start Guide](./quick-start) to build your first integration.