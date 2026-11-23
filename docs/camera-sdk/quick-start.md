---
title: Quick start
---

# Quick start

This example shows the whole flow in a UIKit view controller: prepare the camera, show the preview, join a
session from its QR code, and follow the state and uploads. Make sure your app meets the
[host app requirements](./host-app-requirements.md) first.

## Create the camera at launch

```swift
import ModelHealthCapture

// In application(_:didFinishLaunchingWithOptions:), on the main actor:
CaptureCamera.cleanUpOnLaunch()
let camera = try CaptureCamera()  // keep one camera for the app's lifetime
```

## Show the camera and join a session

```swift
import ModelHealthCapture
import UIKit

final class CaptureViewController: UIViewController {
    let camera: CaptureCamera

    init(camera: CaptureCamera) {
        self.camera = camera
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) { nil }

    override func viewDidLoad() {
        super.viewDidLoad()
        Task { @MainActor in
            for await event in camera.events { print("event:", event) }  // subscribe before prepare()
        }
        Task { @MainActor in
            try await camera.prepare()  // camera and microphone permission, capture session
            view.layer.insertSublayer(camera.previewLayer, at: 0)
            camera.previewLayer.frame = view.bounds

            for await code in camera.detectedQRCodes {  // session QR codes, while not connected
                do {
                    try await camera.connect(qrCode: code)
                } catch {
                    print("not a session QR code:", error)
                }
            }
        }
        Task { @MainActor in
            for await state in camera.states { print("state:", state) }  // idle, connected, recording, expired
        }
        Task { @MainActor in
            for await progress in camera.uploadProgress { print(progress.videoID, progress.phase) }
        }
    }
}
```

Once connected, recording is driven by the session: when it starts a trial the phone records, and when the trial
stops the video is saved and uploaded. Your UI only reflects what happens.

You can also join a session without a QR code: `connect(statusURL:)` takes a session status link your backend
provides, and `handleIncomingURL(_:)` takes a universal link. `disconnect()` leaves the session; a running
recording is finished and uploaded.

## States, events and uploads

| API | What it reports |
|---|---|
| `state`, `states` | `.idle`, `.connected(sessionID:)`, `.recording(CaptureRecording)`, `.expired` |
| `events` | `CaptureEvent`s such as microphone access denied, network lost or back, recording failed, uploads paused or resumed by the session, upload failed |
| `uploadProgress` | `UploadProgress` per video: `queued`, `uploading`, `paused`, `waitingForNetwork`, `stopped`, `completed`, `failed` |
| `pendingVideos` | Videos still on the phone, with their latest upload phase |

Use `retryUpload(_:)`, `stopUpload(_:)` and `deleteVideo(_:)` for videos that need attention. Events carry typed
values only, so the wording in your UI is yours. Errors are `CaptureError`.

## Configuration

`CaptureCamera(configuration:)` takes a `CaptureConfiguration`:

| Setting | Default | |
|---|---|---|
| `allowedHosts` | `modelhealth.io` and its subdomains | Hosts a session link may point at, over https |
| `allowsInsecureSessionLinks` | `false` | Allows plain http and any host. For local development only |
| `reportsDeviceTelemetry` | `true` | Sends device telemetry (battery, thermal state, storage, network, microphone permission, video counts) to Model Health |
| `recordsIMU` | `true` | Records the motion sensors (accelerometer, gyroscope, gravity at 100 Hz) next to each video and uploads them with it |
| `logger` | silent | A `CaptureLogger` for the SDK's logs. `OSCaptureLogger()` logs to `os.Logger` under `io.modelhealth.capture` |

There are no camera, recording or upload settings. See the
[API reference](pathname:///capture-swift/documentation/modelhealthcapture/) for every type and method.
