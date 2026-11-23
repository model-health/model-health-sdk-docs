---
title: Camera SDK
sidebar_label: Overview
---

# Camera SDK

**ModelHealthCapture** is the Model Health camera for your own iOS app. A phone running your app pairs with a
Model Health session by QR code, records whenever the session starts a trial, and uploads every recording with
the capture settings Model Health's 3D reconstruction needs. You build the UI; the SDK handles the camera,
recording and uploads.

Use it when you want your users to capture video in your app instead of the Model Health Companion app.

## How it works

1. **Your session app** (the Model Health web app, or your own app built on the [Model Health SDK](/docs/intro))
   creates a session and shows its QR code.
2. **Your iOS app** scans the QR code with the Camera SDK, or receives the session link another way, and joins
   the session.
3. When the session starts a trial, every connected phone starts recording within about a second, and stops
   when the trial stops. There is no local record button.
4. Each finished video is stored on the phone and uploaded automatically for processing. Results are available
   through the Model Health SDK as usual.

The Camera SDK is independent of the Model Health SDK: it does not depend on it and phones need no API key.
A phone only uses the endpoints of the session it joined.

## What's included

- `CaptureCamera`: camera preview, QR code scanning, pairing, session-driven recording and uploads.
- State, event and upload progress streams to drive your UI: `states`, `events`, `uploadProgress`.
- An upload queue that survives relaunches and network loss, with `pendingVideos`, `retryUpload(_:)`,
  `stopUpload(_:)` and `deleteVideo(_:)` for videos that need attention.
- IMU recording: the phone's motion sensors are recorded next to each video and uploaded with it.
- A privacy manifest that Xcode merges into your app's privacy report.

Capture settings (resolution, frame rate, codec and compression, focus, stabilisation, orientation handling) are
fixed by the SDK, because the 3D reconstruction depends on them. There is no API to change them.

## Next steps

- [Installation](./installation.mdx)
- [Quick start](./quick-start.md)
- [Host app requirements](./host-app-requirements.md)
- [API reference](pathname:///capture-swift/documentation/modelhealthcapture/)
