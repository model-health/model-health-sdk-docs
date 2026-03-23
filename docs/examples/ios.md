# iOS Example App

A native SwiftUI app that mirrors the complete SDK workflow. It connects to the Model Health Companion app via the SDK to manage sessions, calibrate cameras and subjects, record activities and retrieve analysis results.

## Requirements

- iOS 17.0+
- Xcode 15.0+
- An API key — [request access](mailto:support@modelhealth.io?subject=API%20Access%20Request&body=Hi%20Model%20Health%20team%2C%0A%0AI%27m%20interested%20in%20integrating%20the%20Model%20Health%20SDK.%0A%0ACompany%3A%0AUse%20case%3A%0APlatform%20(iOS%2C%20Web%2C%20other)%3A%0AExisting%20Model%20Health%20account%3A%20Yes%20%2F%20No%0AIf%20yes%2C%20account%20email%3A%0A%0AThanks) if you don't have one

## Configuration

**1. Signing configuration**

An Xcode config file is required by the project but not committed to the repository — it contains your signing credentials. A template is provided.

Copy the template and fill in your Apple Developer details:

```bash
cd examples/ios
cp LocalConfig.xcconfig.template LocalConfig.xcconfig
```

Edit `LocalConfig.xcconfig` and replace the placeholder values:

```
DEVELOPMENT_TEAM = YOUR_TEAM_ID
PRODUCT_BUNDLE_IDENTIFIER = com.yourcompany.ModelHealthDemo
```

Your Team ID can be found in [Apple Developer](https://developer.apple.com/account) under **Membership details**.

**2. API key**

Open `ExampleConfig.swift` and replace the placeholder:

```swift
enum ExampleConfig {
    static let apiKey = "your_api_key_here"
}
```

## Launch

Open the project in Xcode and run it on a connected device or simulator:

```bash
open examples/ios/ModelHealthDemo.xcodeproj
```

Select your target device in Xcode's toolbar and press **Run** (⌘R).
