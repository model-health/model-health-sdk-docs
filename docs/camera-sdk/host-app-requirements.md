---
title: Host app requirements
---

# Host app requirements

Your app has to do a few things for the Camera SDK to work.

## 1. Usage descriptions

Add these keys to your Info.plist. Without them iOS terminates the app when the SDK asks for access.

| Key | Needed for |
|---|---|
| `NSCameraUsageDescription` | Recording video and scanning the session QR code |
| `NSMicrophoneUsageDescription` | The audio track of each recording |

Without camera access `prepare()` throws `CaptureError.cameraAccessDenied`. Without microphone access the camera
still records, without sound, and `events` reports `.microphoneAccessDenied`.

IMU recording uses CoreMotion device motion, which needs no permission and no usage description.

## 2. Clean up and create the camera at launch

Call `CaptureCamera.cleanUpOnLaunch()` once at launch, before creating the camera. Create the camera at launch
too and keep one instance for the app's lifetime: it owns the upload queue, which resumes uploads from earlier
launches, and it starts network monitoring, which a universal link opened at a cold start needs.

## 3. Forward universal links

If your app receives session links as universal links, pass them to `handleIncomingURL(_:)`, from
`scene(_:willConnectTo:options:)` and `scene(_:continue:)`, or from
`onContinueUserActivity(NSUserActivityTypeBrowsingWeb)` in SwiftUI. It returns `false` for links that are not
session links. A link that arrives before `prepare()` has finished is held and connected once `prepare()`
succeeds.

## 4. Keep the screen awake

Set `UIApplication.shared.isIdleTimerDisabled = true` while the state is `.connected` or `.recording`. A locked
phone stops following the session and stops the camera.

## 5. Lock the capture screen to portrait

The preview assumes a portrait screen. Recording does not depend on the interface orientation: the SDK tracks
the physical orientation itself and writes it into the video's metadata.

On iPad, iPadOS can ignore the Info.plist orientations, so also return `.portrait` from
`supportedInterfaceOrientations` (and from `application(_:supportedInterfaceOrientationsFor:)`), and request
portrait geometry with `UIWindowScene.requestGeometryUpdate` when the capture screen appears.

## 6. Stay in the foreground while uploading

Uploads run while your app is in the foreground. Interrupted uploads resume on the next launch, and uploads
that failed while offline are retried when the network returns.

## Good to know

- **Audio session.** The SDK configures the shared `AVAudioSession` (`.playAndRecord`, `.videoRecording`,
  `.defaultToSpeaker`) when it sets up the camera.
- **Storage.** Recordings are kept in your app's Documents directory, excluded from backup, until they are
  uploaded.
- **Session links are secrets.** Anyone with a session's status link can join that session, so treat it like a
  password: do not log or share it.
- **Privacy manifest.** The SDK's `PrivacyInfo.xcprivacy` declares what it collects (device ID, recordings,
  diagnostics and motion data) and the required-reason APIs it uses. Xcode merges it into your app's privacy
  report.
