---
sidebar_position: 1
---

# Introduction

Welcome to the Model Health SDK documentation!

Model Health enables you to measure and analyze human movement from smartphone videos. The SDK provides a complete workflow for biomechanical analysis:

- **Authentication and session management**
- **Multi-camera calibration**
- **Movement data collection**
- **Analysis and reporting**

## Supported Platforms

### Swift SDK (iOS, macOS, tvOS, watchOS)
Native Apple platform SDK built with Swift. Perfect for iOS apps that need biomechanical analysis capabilities.

### TypeScript SDK (Web, Node.js)
Cross-platform JavaScript/TypeScript SDK with WebAssembly core. Works in both browser and Node.js environments.

## Quick Links

- [Installation Guide](./getting-started/installation)
- [Quick Start](./getting-started/quick-start)
- [Swift SDK Reference](/swift-api)
- [TypeScript SDK Reference](/typescript-api)

## Workflow Overview

The typical Model Health workflow follows these steps:

1. **Authentication**: Login with credentials, verify with email code if needed
2. **Session Creation**: Create a calibration session
3. **Camera Calibration**: Calibrate cameras using a checkerboard pattern
4. **Neutral Pose**: Capture subject's neutral standing pose for scaling
5. **Recording**: Record movement activities (squats, jumps, etc.)
6. **Analysis**: Fetch processed biomechanical data

## Support

For questions, issues, or feature requests, please visit our [GitHub repository](https://github.com/model-health/model-health).
