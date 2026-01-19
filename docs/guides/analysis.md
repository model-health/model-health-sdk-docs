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

print("Analysis task started: \(task.taskId)")
```

**TypeScript:**
```typescript
// Ensure activity is ready
const status = await service.getStatus(activity);

if (status.type !== "ready") {
  console.log("Activity not ready for analysis");
  return;
}

// Start analysis
const task = await service.startAnalysis(
  "counter_movement_jump",
  activity,
  session
);

console.log("Analysis task started:", task.task_id);
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
case .completed(let resultTags):
    print("Analysis complete! Available results: \(resultTags)")
case .failed:
    print("Analysis failed")
default:
    break
}
```

**TypeScript:**
```typescript
let analysisStatus = await service.getAnalysisStatus(task);

while (analysisStatus.type === "processing") {
  console.log("Analysis in progress...");
  await new Promise(resolve => setTimeout(resolve, 2000));
  analysisStatus = await service.getAnalysisStatus(task);
}

if (analysisStatus.type === "completed") {
  console.log("Analysis complete! Available results:", analysisStatus.result_tags);
} else if (analysisStatus.type === "failed") {
  console.log("Analysis failed");
}
```

## Downloading Results

Once analysis is complete, download the results:

**Swift:**
```swift
if case .completed(let resultTags) = analysisStatus {
    for tag in resultTags {
        let result = try await service.downloadAnalysisResult(
            forActivity: activity,
            resultTag: tag
        )
        
        // Result contains biomechanical metrics
        if let jumpHeight = result.jumpHeight {
            print("Jump height: \(jumpHeight) cm")
        }
        if let peakVelocity = result.peakVerticalVelocity {
            print("Peak velocity: \(peakVelocity) m/s")
        }
    }
}
```

**TypeScript:**
```typescript
if (analysisStatus.type === "completed") {
  for (const tag of analysisStatus.result_tags) {
    const result = await service.downloadAnalysisResult(activity, tag);
    
    // Result contains biomechanical metrics
    const jumpHeight = getJumpHeight(result);
    const peakVelocity = getPeakVerticalVelocity(result);
    
    if (jumpHeight !== null) {
      console.log("Jump height:", jumpHeight, "cm");
    }
    if (peakVelocity !== null) {
      console.log("Peak velocity:", peakVelocity, "m/s");
    }
  }
}
```

## Result Types

The analysis result contains:

- **Analysis metadata** - Title and description of the analysis
- **Metrics** - Dictionary of all measured values with metadata
- **Convenience properties** (Swift) - Direct access to common metrics like `jumpHeight`, `peakVerticalVelocity`
- **Helper functions** (TypeScript) - Functions like `getJumpHeight()`, `getPeakVerticalVelocity()`

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
guard case .ready = activityStatus else {
    print("Activity failed processing")
    return
}

let task = try await service.startAnalysis(.counterMovementJump, for: activity, in: session)

// Wait for analysis
var analysisStatus = try await service.getAnalysisStatus(for: task)
while case .processing = analysisStatus {
    try await Task.sleep(nanoseconds: 2_000_000_000)
    analysisStatus = try await service.getAnalysisStatus(for: task)
}

// Download results
if case .completed(let resultTags) = analysisStatus {
    for tag in resultTags {
        let result = try await service.downloadAnalysisResult(forActivity: activity, resultTag: tag)
        print("Analysis complete: \(result.analysisTitle)")
        
        // Access metrics
        for (key, metric) in result.metrics {
            print("\(metric.label):", terminator: " ")
            switch metric.value {
            case .single(let value):
                print(String(format: "%.\(metric.decimalPlaces)f", value))
            case .bilateral(let left, let right):
                print("L: \(left), R: \(right)")
            }
        }
    }
}
```

**TypeScript:**
```typescript
// Record
const activity = await service.record("cmj-1", session);
// ... subject performs jump ...
await service.stopRecording(session);

// Wait for processing
let activityStatus = await service.getStatus(activity);
while (activityStatus.type === "processing" || activityStatus.type === "uploading") {
  await new Promise(resolve => setTimeout(resolve, 2000));
  activityStatus = await service.getStatus(activity);
}

// Start analysis
if (activityStatus.type !== "ready") {
  console.log("Activity failed processing");
  return;
}

const task = await service.startAnalysis("counter_movement_jump", activity, session);

// Wait for analysis
let analysisStatus = await service.getAnalysisStatus(task);
while (analysisStatus.type === "processing") {
  await new Promise(resolve => setTimeout(resolve, 2000));
  analysisStatus = await service.getAnalysisStatus(task);
}

// Download results
if (analysisStatus.type === "completed") {
  for (const tag of analysisStatus.result_tags) {
    const result = await service.downloadAnalysisResult(activity, tag);
    console.log("Analysis complete:", result.analysis_title);
    
    // Access metrics
    for (const [key, metric] of Object.entries(result.metrics)) {
      console.log(`${metric.label}:`, metric.value);
    }
  }
}
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
  const task = await service.startAnalysis("counter_movement_jump", activity, session);
  // Monitor and download results...
} catch (error) {
  console.error("Analysis error:", error);
  // Handle error appropriately
}
```
