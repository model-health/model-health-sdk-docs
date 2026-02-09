sidebar_position: 1
---

# Introduction

The Model Health SDK lets you **integrate advanced human movement analysis directly into your platform or application**. Using smartphone videos recorded through our **Model Health Companion iOS app**, your app can measure, analyze, and report on biomechanics without motion capture suits or specialized hardware.

> Think of the integration as a **trio**:  
> 1. **Your app** – where your users interact and request biomechanical analyses.  
> 2. **Model Health SDK** – provides the tools to authenticate, control the recording workflow, and retrieve processed biomechanical data.  
> 3. **Model Health Companion iOS app** – used for capturing videos needed for analysis.

With this setup, you can quickly add a complete workflow similar to that of Model Health's own web app:

- **Authentication and session management**  
- **Camera calibration**  
- **Movement data collection**  
- **Analysis and reporting**

## Supported SDK Platforms

Today, we provide SDKs for the platforms most in demand, with more coming in the future:

### Swift SDK (iOS)  
Native Apple platform SDK built with Swift.

### TypeScript SDK (Web, Node.js)  
Cross-platform SDK powered by WebAssembly. Works in both browser and Node.js environments for flexible integration.

> More SDKs for additional platforms are planned—stay tuned!

## Quick Links

- [Get API Key](/register)  
- [Installation Guide](./getting-started/installation)  
- [Quick Start](./getting-started/quick-start)  
- [Swift SDK Reference](/swift-api)  
- [TypeScript SDK Reference](/typescript-api)

## Workflow Overview

A typical Model Health integration follows these steps:

1. **Authentication** – Sign in with your credentials and verify via email code if needed.  
2. **Session Creation** – Start a data collection session.  
3. **Camera Calibration** – Calibrate the cameras with a checkerboard pattern.  
4. **Subject Calibration** – Record the subject standing in a neutral pose for calibration.  
5. **Movement Recording** – Measure activities like squats, jumps, or running.  
6. **Analysis** – Fetch the recordings and processed biomechanical data via the SDK.

## Support

For questions, issues, or feature requests, visit our [GitHub repository](https://github.com/model-health/model-health).