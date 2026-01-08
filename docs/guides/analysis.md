---
sidebar_position: 4
---

# Analysis

Once an activity has been recorded and processed, you can run biomechanical analysis to extract meaningful metrics.

## Available Analysis Types

The SDK supports various analysis types depending on the movement:

- **Counter-Movement Jump** - Vertical jump analysis
- **Squat** - Squat depth and form analysis
- **Sprint** - Running mechanics and speed
- And more...

## Starting Analysis

**Swift:**
```swift
// Ensure activity is ready
let status = try await service.getStatus(forActivity: activity)

guard case .ready = status else {
    print("Activity not ready for analysis")
    return
}

// Start analysis
let task = try await service.startAnalysis(
    .counterMovementJump,
    for: activity,
    in: session
)

print("Analysis task started: \(task.id)")
```

**TypeScript:**
```typescript
// Ensure activity is ready
const status = await service.getActivityStatus(activity.id);

if (status !== "ready") {
  console.log("Activity not ready for analysis");
  return;
}

// Start analysis
const task = await service.startAnalysis(
  "counter_movement_jump",
  activity.id,
  session.id
);

console.log("Analysis task started:", task.id);
```

## Monitoring Analysis Progress

Analysis takes time to complete. Poll the status:

**Swift:**
```swift
var analysisStatus = try await service.getAnalysisStatus(for: task)

while case .processing = analysisStatus {
    print("Analysis in progress...")
    try await Task.sleep(nanoseconds: 2_000_000_000) // 2 seconds
    analysisStatus = try await service.getAnalysisStatus(for: task)
}

switch analysisStatus {
case .ready:
    print("Analysis complete!")
case .failed(let error):
    print("Analysis failed: \(error)")
default:
    break
}
```

**TypeScript:**
```typescript
let analysisStatus = await service.getAnalysisStatus(task.id);

while (analysisStatus === "processing") {
  console.log("Analysis in progress...");
  await new Promise(resolve => setTimeout(resolve, 2000));
  analysisStatus = await service.getAnalysisStatus(task.id);
}

if (analysisStatus === "ready") {
  console.log("Analysis complete!");
} else if (analysisStatus === "failed") {
  console.log("Analysis failed");
}
```

## Downloading Results

Once analysis is complete, download the results:

**Swift:**
```swift
let result = try await service.downloadAnalysisResult(
    forActivity: activity,
    resultTag: "summary"
)

// Result contains biomechanical metrics
print("Jump height: \(result.jumpHeight) cm")
print("Peak power: \(result.peakPower) W")
```

**TypeScript:**
```typescript
const result = await service.downloadAnalysisResult(
  activity.id,
  "summary"
);

// Result contains biomechanical metrics
console.log("Jump height:", result.jumpHeight, "cm");
console.log("Peak power:", result.peakPower, "W");
```

## Result Types

Different result tags provide different levels of detail:

- **`summary`** - High-level metrics and key findings
- **`detailed`** - Frame-by-frame data and detailed metrics
- **`visualization`** - Data formatted for charting/graphing

## Complete Example

Here's a complete workflow from recording to analysis:

**Swift:**
```swift
// Record
let activity = try await service.record(activityNamed: "cmj-1", in: session)
// ... subject performs jump ...
try await service.stopRecording(session)

// Wait for processing
var activityStatus = try await service.getStatus(forActivity: activity)
while case .processing = activityStatus {
    try await Task.sleep(nanoseconds: 2_000_000_000)
    activityStatus = try await service.getStatus(forActivity: activity)
}

// Start analysis
let task = try await service.startAnalysis(.counterMovementJump, for: activity, in: session)

// Wait for analysis
var analysisStatus = try await service.getAnalysisStatus(for: task)
while case .processing = analysisStatus {
    try await Task.sleep(nanoseconds: 2_000_000_000)
    analysisStatus = try await service.getAnalysisStatus(for: task)
}

// Download results
let result = try await service.downloadAnalysisResult(forActivity: activity, resultTag: "summary")
print("Analysis complete: \(result)")
```

**TypeScript:**
```typescript
// Record
const activity = await service.record("cmj-1", session.id);
// ... subject performs jump ...
await service.stopRecording(session.id);

// Wait for processing
let activityStatus = await service.getActivityStatus(activity.id);
while (activityStatus === "processing") {
  await new Promise(resolve => setTimeout(resolve, 2000));
  activityStatus = await service.getActivityStatus(activity.id);
}

// Start analysis
const task = await service.startAnalysis("counter_movement_jump", activity.id, session.id);

// Wait for analysis
let analysisStatus = await service.getAnalysisStatus(task.id);
while (analysisStatus === "processing") {
  await new Promise(resolve => setTimeout(resolve, 2000));
  analysisStatus = await service.getAnalysisStatus(task.id);
}

// Download results
const result = await service.downloadAnalysisResult(activity.id, "summary");
console.log("Analysis complete:", result);
```

## Error Handling

Always handle potential errors during analysis:

**Swift:**
```swift
do {
    let task = try await service.startAnalysis(.counterMovementJump, for: activity, in: session)
    // Monitor and download results...
} catch {
    print("Analysis error: \(error)")
    // Handle error appropriately
}
```

**TypeScript:**
```typescript
try {
  const task = await service.startAnalysis("counter_movement_jump", activity.id, session.id);
  // Monitor and download results...
} catch (error) {
  console.error("Analysis error:", error);
  // Handle error appropriately
}
```
