---
sidebar_position: 4
---

# Activity Analysis

Once an activity has been recorded and its status is `ready`, you can run biomechanical analysis to extract movement metrics.

## Available Analysis Types

The full list of supported analysis types is available in the SDK Reference. For a description of each analysis, see the [Automated Analysis](https://modelhealth.io/automated-analysis) page on the Model Health website.

## Starting Analysis

**Swift:**
```swift
let status = try await service.getStatus(forActivity: activity)

guard case .ready = status else {
    print("Activity not ready for analysis")
    return
}

let task = try await service.startAnalysis(
    .counterMovementJump,
    for: activity,
    in: session
)
```

**TypeScript:**
```typescript
const status = await service.getStatus(activity);

if (status.type !== "ready") {
  console.log("Activity not ready for analysis");
  return;
}

const task = await service.startAnalysis(
  "counter_movement_jump",
  activity,
  session
);
```

## Monitoring Progress

Analysis runs asynchronously — poll until complete:

**Swift:**
```swift
var analysisStatus = try await service.getAnalysisStatus(for: task)

while case .processing = analysisStatus {
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

**Swift:**
```swift
if case .completed(let resultTags) = analysisStatus {
    for tag in resultTags {
        let result = try await service.downloadAnalysisResult(
            forActivity: activity,
            resultTag: tag
        )
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
if (analysisStatus.type === "completed") {
  for (const tag of analysisStatus.result_tags) {
    const result = await service.downloadAnalysisResult(activity, tag);
    console.log("Analysis complete:", result.analysis_title);

    for (const [key, metric] of Object.entries(result.metrics)) {
      console.log(`${metric.label}:`, metric.value);
    }
  }
}
```

> **Note:** The result structure above — including the metrics dictionary, convenience properties, and helper functions — is provisional and may change before the 1.0 release. Refer to the [Swift SDK Reference](/swift-api) and [TypeScript SDK Reference](/typescript-api) for the latest API.

## Result Structure

Each result contains:

- **Analysis metadata** — title and description of the analysis
- **Metrics** — dictionary of all measured values with labels, units, and decimal precision

## Complete Example

A full workflow from recording to retrieving results:

**Swift:**
```swift
// Record
let activity = try await service.record(activityNamed: "cmj", in: session)
// ... subject performs jump ...
try await service.stopRecording(session)

// Wait for processing
var activityStatus = try await service.getStatus(forActivity: activity)
while case .processing = activityStatus {
    try await Task.sleep(nanoseconds: 2_000_000_000)
    activityStatus = try await service.getStatus(forActivity: activity)
}

guard case .ready = activityStatus else {
    print("Activity failed processing")
    return
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
if case .completed(let resultTags) = analysisStatus {
    for tag in resultTags {
        let result = try await service.downloadAnalysisResult(forActivity: activity, resultTag: tag)
        print("Analysis complete: \(result.analysisTitle)")
        for (_, metric) in result.metrics {
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
const activity = await service.record("cmj", session);
// ... subject performs jump ...
await service.stopRecording(session);

// Wait for processing
let activityStatus = await service.getStatus(activity);
while (activityStatus.type === "processing" || activityStatus.type === "uploading") {
  await new Promise(resolve => setTimeout(resolve, 2000));
  activityStatus = await service.getStatus(activity);
}

if (activityStatus.type !== "ready") {
  console.log("Activity failed processing");
  return;
}

// Start analysis
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
    for (const [key, metric] of Object.entries(result.metrics)) {
      console.log(`${metric.label}:`, metric.value);
    }
  }
}
```

## Next Steps

- [Swift SDK Reference](/swift-api)
- [TypeScript SDK Reference](/typescript-api)