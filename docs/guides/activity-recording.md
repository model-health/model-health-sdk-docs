---
sidebar_position: 3
---

# Activity Recording

Once camera and subject calibration are complete, you're ready to record movement activities.

> **Note:** Camera positions must remain fixed after calibration. If you need to reposition cameras, you'll need to [recalibrate](./camera-calibration).

## Recording

### Start Recording

Pass any descriptive string as the activity name — use something that helps identify the attempt later (e.g. `cmj`, `squat`, `cut`).

**Swift:**
```swift
let activity = try await service.record(activityNamed: "cmj", in: session)
```

**TypeScript:**
```typescript
const activity = await service.record("cmj", session);
```

### During Recording

- Subject performs the movement
- Ensure the subject stays within all camera fields of view
- Avoid moving the cameras
- For activities where cameras may not sync automatically (e.g. treadmill gait, balance assessments), have the subject punch one hand above their shoulder and bring it back down at any point during the trial

### Stop Recording

**Swift:**
```swift
try await service.stopRecording(session)
```

**TypeScript:**
```typescript
await service.stopRecording(session);
```

## Checking Processing Status

After stopping, video is uploaded and processed automatically:

**Swift:**
```swift
let status = try await service.getStatus(forActivity: activity)

switch status {
case .uploading(let uploaded, let total):
    print("Uploading: \(uploaded)/\(total) videos")
case .processing:
    print("Processing video...")
case .ready:
    print("Ready for analysis!")
case .failed:
    print("Processing failed")
}
```

**TypeScript:**
```typescript
let status = await service.getStatus(activity);

while (status.type === "uploading" || status.type === "processing") {
  if (status.type === "uploading") {
    console.log(`Uploading: ${status.uploaded}/${status.total} videos`);
  } else {
    console.log("Processing video...");
  }
  await new Promise(resolve => setTimeout(resolve, 2000));
  status = await service.getStatus(activity);
}

if (status.type === "ready") {
  console.log("Ready for analysis!");
} else if (status.type === "failed") {
  console.log("Processing failed");
}
```

## Tips

- **Clothing:** Subject should wear fitted clothing. Shoes should be a different color from both the pants and the floor — this improves pose detection significantly
- **Background:** A plain, uncluttered background improves accuracy
- **Multiple attempts:** Record several attempts of the same activity and name them sequentially (`cmj-1`, `cmj-2`, etc.)
- **Duration:** Start recording just before the movement begins and stop shortly after — typically 5–30 seconds

## Troubleshooting

**Trial trimmed too short or failed:**
- Camera fields of view may not overlap enough — reposition and recalibrate so at least 2 cameras see the subject throughout the full motion
- If the subject is only in the capture volume for less than 2 seconds, the trial may fail

**Inaccurate kinematics:**
- **Segment occlusion:** Each body segment must be visible by at least 2 cameras at all times — reposition and recalibrate if needed
- **Camera angles too similar:** Aim for 40–90° separation between cameras
- **Subject too far from cameras:** Move the subject closer if possible
- **Poor contrast:** Improve clothing and background contrast, especially at the feet
- **Camera sync issues:** Have the subject perform a sync punch at the start of the trial
- **Bad camera calibration:** Try recalibrating

## Next Steps

Once the activity status is `ready`, proceed to [Activity Analysis](./activity-analysis).
