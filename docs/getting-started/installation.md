---
sidebar_position: 1
---

# Installation

## Get Your API Key

Before installing the SDK, you'll need an API key to authenticate your requests.

[Get your API key →](/register)

Once you have your API key, you can proceed with installation.

## Swift SDK

### Requirements
- iOS 15.0+ / macOS 12.0+
- Xcode 15.0+
- Swift 5.9+

### Swift Package Manager

Add the Model Health SDK to your project using Swift Package Manager:

1. In Xcode, select **File > Add Package Dependencies...**
2. Enter the repository URL: `https://github.com/model-health/model-health`
3. Select the version you want to use
4. Add `Model Health` to your target

Alternatively, add it to your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/model-health/model-health", from: "1.0.0")
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
npm install @modelhealth/modelhealth
```

### yarn

```bash
yarn add @modelhealth/modelhealth
```

### Import

```typescript
import { ModelHealthService } from '@modelhealth/modelhealth';
```

## Verification

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
import { ModelHealthService } from '@modelhealth/modelhealth';

const service = new ModelHealthService("your-api-key-here");
await service.init();
console.log('Model Health SDK initialized successfully');
```

## Next Steps

Now that you have the SDK installed, check out the [Quick Start Guide](./quick-start) to learn how to use it.
