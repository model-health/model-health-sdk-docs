---
sidebar_position: 3
---

# Recording Activities

Once you've completed camera calibration and neutral pose capture, you're ready to record movement activities.

## Starting a Recording

**Swift:**
```swift
let activity = try await service.record(activityNamed: "cmj-1", in: session)
print("Recording started: \(activity.id)")
```

**TypeScript:**
```typescript
const activity = await service.record("cmj-1", session);
console.log("Recording started:", activity.id);
```

The activity name should be descriptive and unique within the session.

## During Recording

While recording:
- Subject performs the movement activity
- Ensure the subject stays within the camera's field of view
- Maintain good lighting conditions
- Avoid camera movement

## Stopping the Recording

**Swift:**
```swift
try await service.stopRecording(session)
print("Recording stopped")
```

**TypeScript:**
```typescript
await service.stopRecording(session);
console.log("Recording stopped");
```

## Checking Processing Status

After stopping, the video is uploaded and processed:

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

## Best Practices

### Activity Naming
Use descriptive names that help identify the activity later:
- `cmj-1`, `cmj-2` - Counter-movement jump attempts
- `squat-warmup` - Warm-up squats
- `sprint-trial-1` - Sprint trial

### Recording Duration
- Keep recordings focused on the activity
- Start recording just before the movement begins
- Stop shortly after the movement completes
- Typical duration: 5-30 seconds

### Multiple Attempts
Record multiple attempts of the same activity:
```swift
for i in 1...3 {
    let activity = try await service.record(activityNamed: "cmj-\(i)", in: session)
    // Perform movement
    try await service.stopRecording(session)
}
```

### Error Handling

**Swift:**
```swift
do {
    let activity = try await service.record(activityNamed: name, in: session)
    // Recording in progress...
    try await service.stopRecording(session)
} catch {
    print("Recording failed: \(error)")
    // Handle error - maybe retry or alert user
}
```

**TypeScript:**
```typescript
try {
  const activity = await service.record(name, session);
  // Recording in progress...
  await service.stopRecording(session);
} catch (error) {
  console.error("Recording failed:", error);
  // Handle error
}
```

## Next Steps

After your activity is processed and ready, proceed to [Analysis](./analysis) to extract biomechanical insights.
