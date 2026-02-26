---
sidebar_position: 1
---

# Introduction

If you're building a platform in sports, physical therapy, performance, rehabilitation, or digitial health, chances are you've needed movement data — and found that getting it requires expensive hardware, specialized setups, or custom computer vision work.

The Model Health SDK lets you add **lab-grade 3D biomechanical analysis to your app using nothing but smartphones**. No motion capture suits. No custom ML pipeline. Just videos captured through our [Model Health Companion iOS app](https://apps.apple.com/app/model-health/id6748835391), processed into actionable movement data your platform can consume.

> The SDK is currently available to select partners. [Request API access](mailto:support@modelhealth.io?subject=API%20Access%20Request&body=Hi%20Model%20Health%20team%2C%0A%0AI%27m%20interested%20in%20integrating%20the%20Model%20Health%20SDK.%0A%0ACompany%3A%0AUse%20case%3A%0APlatform%20(iOS%2C%20Web%2C%20other)%3A%0AExisting%20Model%20Health%20account%3A%20Yes%20%2F%20No%0AIf%20yes%2C%20account%20email%3A%0A%0AThanks) to get started.
> The Companion iOS app is currently required for video capture. Support for additional capture methods is on the roadmap.

## How It Works

The integration involves three parts working together:

1. **Your app** – where your users interact and request biomechanical analyses.
2. **Model Health SDK** – handles API key authentication, controls the recording workflow, and retrieves processed biomechanical data.
3. **Model Health Companion iOS app** – used by your users to capture the video needed for analysis.

A complete integration — session management, calibration, recording, and retrieving results — typically takes **an experienced developer less than a week**. Our first pilot had things running in a couple of days.

## What You Can Build

The SDK gives you a full workflow out of the box:

- **API key authentication and session management**
- **Camera calibration**
- **Movement data collection**
- **Analysis and reporting**

This mirrors the workflow in [Model Health's own web app](https://app.modelhealth.io/), so the concepts map directly if you've used it.

## Supported Platforms

### Swift SDK (iOS)
Native SDK for iOS applications.

### TypeScript SDK (Web, Node.js)
Cross-platform SDK powered by WebAssembly. Works in both browser and Node.js environments.

> Support for additional platforms (Python, Kotlin) is in development.

## Workflow Overview

A typical integration follows these steps:

1. **Session Creation** – Start a data collection session.
2. **Camera Calibration** – Calibrate the cameras with a checkerboard pattern.
3. **Subject Calibration** – Record the subject standing in a neutral pose.
4. **Movement Recording** – Capture activities like squats, jumps, or running.
5. **Analysis** – Retrieve recordings and processed biomechanical data.

## Quick Links

- [Request API Access](mailto:support@modelhealth.io?subject=API%20Access%20Request&body=Hi%20Model%20Health%20team%2C%0A%0AI%27m%20interested%20in%20integrating%20the%20Model%20Health%20SDK.%0A%0ACompany%3A%0AUse%20case%3A%0APlatform%20(iOS%2C%20Web%2C%20other)%3A%0AExisting%20Model%20Health%20account%3A%20Yes%20%2F%20No%0AIf%20yes%2C%20account%20email%3A%0A%0AThanks)
- [Installation Guide](./getting-started/installation)
- [Quick Start](./getting-started/quick-start)
- [Swift SDK Reference](/swift-api)
- [TypeScript SDK Reference](/typescript-api)

## Support

For bug reports and feature requests, visit our [GitHub repository](https://github.com/model-health/model-health).  
For everything else, reach us at support@modelhealth.io