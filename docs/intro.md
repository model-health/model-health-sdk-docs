# Introduction

If you're building a platform in sports, physical therapy, performance, rehabilitation, or digital health, chances are you've needed movement data — and found that getting it requires expensive hardware, specialized setups, or custom computer vision work.

The Model Health SDK removes that barrier. Add lab-grade 3D biomechanical analysis to your app using nothing but smartphones — no motion capture suits, no ML infrastructure. Users capture video through the [Model Health Companion iOS app](https://apps.apple.com/app/model-health/id6748835391), your platform receives clean, actionable movement data.

> The SDK is currently available to select partners. [Request API access](mailto:support@modelhealth.io?subject=API%20Access%20Request&body=Hi%20Model%20Health%20team%2C%0A%0AI%27m%20interested%20in%20integrating%20the%20Model%20Health%20SDK.%0A%0ACompany%3A%0AUse%20case%3A%0APlatform%20(iOS%2C%20Web%2C%20other)%3A%0AExisting%20Model%20Health%20account%3A%20Yes%20%2F%20No%0AIf%20yes%2C%20account%20email%3A%0A%0AThanks) to get started.
> The Companion iOS app is currently required for video capture. Support for additional capture methods is on the roadmap.

## How It Works

The integration involves three parts working together:

1. **Your app** – presents the interface, triggers recording sessions, and displays data to your users.
2. **Model Health SDK** – manages the recording workflow, submits data for processing in our cloud, and retrieves the analysis.
3. **Model Health Companion iOS app** – captures the video footage needed to run the analysis.

It typically takes an experienced developer **less than a week** for a complete integration — session management, calibration, recording, and retrieving results. Our first pilot users were up and running in two days.

## Supported Platforms

### Swift SDK (iOS)
Native SDK for iOS applications.

### TypeScript SDK (Web, Node.js)
Cross-platform SDK powered by WebAssembly. Works in both browser and Node.js environments.

### Python SDK
Native Python SDK. Supports the full capture workflow — sessions, calibration, recording, analysis, and data retrieval.

## Workflow Overview

A typical integration follows these steps:

1. **Session Creation** – Start a data collection session
1. **Camera Calibration** – Calibrate the cameras with a checkerboard pattern
1. **Subject Calibration** – Record the subject standing in a neutral pose
1. **Movement Recording** – Capture activities like squats, jumps, or running
1. **Analysis** – Retrieve recordings and processed biomechanical data

This mirrors the workflow in [Model Health's own web app](https://app.modelhealth.io/), so if you've used it, the concepts will feel familiar.

## Quick Links

- [Request API Access](mailto:support@modelhealth.io?subject=API%20Access%20Request&body=Hi%20Model%20Health%20team%2C%0A%0AI%27m%20interested%20in%20integrating%20the%20Model%20Health%20SDK.%0A%0ACompany%3A%0AUse%20case%3A%0APlatform%20(iOS%2C%20Web%2C%20other)%3A%0AExisting%20Model%20Health%20account%3A%20Yes%20%2F%20No%0AIf%20yes%2C%20account%20email%3A%0A%0AThanks)
- [Installation Guide](./getting-started/installation)
- [Quick Start](./getting-started/quick-start)
- [Swift SDK Reference](/swift-api)
- [TypeScript SDK Reference](/typescript-api)
- [Python SDK Reference](/python-api)

## Support

For bug reports and feature requests, visit our [GitHub repository](https://github.com/model-health/model-health).  
For everything else, reach us at support@modelhealth.io
