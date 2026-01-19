---
sidebar_position: 2
---

# Quick Start

This guide will walk you through a basic example of using the Model Health SDK.

## Swift Quick Start

```swift
import ModelHealth

// Initialize the service
let service = try ModelHealthService()

// Authenticate
let loginResult = try await service.login(
    username: "user@example.com", 
    password: "your-password"
)

// Handle verification if needed
if case .verificationRequired = loginResult {
    try await service.verify(code: "123456", rememberDevice: true)
}

// Create a session
let session = try await service.createSession()

// Calibrate camera
let checkerboardDetails = CheckerboardDetails(
    rows: 4, 
    columns: 5, 
    squareSize: 35, 
    placement: .perpendicular
)

try await service.calibrateCamera(session, checkerboardDetails: checkerboardDetails) { status in
    print("Calibration status: \(status)")
}

// Capture neutral pose (requires a subject)
let subjects = try await service.subjectList()
if let subject = subjects.first {
    try await service.calibrateNeutralPose(for: subject, in: session) { status in
        print("Neutral pose status: \(status)")
    }
}

// Record an activity
let activity = try await service.record(activityNamed: "cmj-1", in: session)
// Subject performs the movement...
try await service.stopRecording(session)

// Check processing status
let status = try await service.getStatus(forActivity: activity)
if case .ready = status {
    // Start analysis
    let task = try await service.startAnalysis(.counterMovementJump, for: activity, in: session)
    
    // Poll for completion
    var analysisStatus = try await service.getAnalysisStatus(for: task)
    while case .processing = analysisStatus {
        try await Task.sleep(nanoseconds: 2_000_000_000) // 2 seconds
        analysisStatus = try await service.getAnalysisStatus(for: task)
    }
    
    // Download results
    if case .completed(let resultTags) = analysisStatus {
        for tag in resultTags {
            let result = try await service.downloadAnalysisResult(
                forActivity: activity, 
                resultTag: tag
            )
            print("Analysis complete: \(result)")
        }
    }
}
```

## TypeScript Quick Start

```typescript
import { ModelHealthService } from '@modelhealth/sdk';

// Initialize the service
const service = new ModelHealthService();
await service.init();

// Authenticate
const loginResult = await service.login("user@example.com", "your-password");

// Handle verification if needed
if (loginResult === "verification_required") {
  await service.verify("123456", true);
}

// Create a session
const session = await service.createSession();

// Calibrate camera
const checkerboardDetails = {
  rows: 4,
  columns: 5,
  square_size: 35,
  placement: "perpendicular"
};

await service.calibrateCamera(session, checkerboardDetails, (status) => {
  console.log("Calibration status:", status);
});

// Get subjects
const subjects = await service.subjectList();

// Capture neutral pose
if (subjects.length > 0) {
  await service.calibrateNeutralPose(subjects[0], session, (status) => {
    console.log("Neutral pose status:", status);
  });
}

// Record an activity
const activity = await service.record("cmj-1", session);
// Subject performs the activity...
await service.stopRecording(session);

// Check processing status
let activityStatus = await service.getStatus(activity);
while (activityStatus.type === "processing") {
  await new Promise(resolve => setTimeout(resolve, 2000));
  activityStatus = await service.getStatus(activity);
}

// Start analysis
if (activityStatus.type === "ready") {
  const task = await service.startAnalysis("counter_movement_jump", activity, session);
  
  // Poll for completion
  let analysisStatus = await service.getAnalysisStatus(task);
  while (analysisStatus.type === "processing") {
    await new Promise(resolve => setTimeout(resolve, 2000));
    analysisStatus = await service.getAnalysisStatus(task);
  }
  
  // Download results
  if (analysisStatus.type === "completed") {
    for (const tag of analysisStatus.result_tags) {
      const result = await service.downloadAnalysisResult(activity, tag);
      console.log("Analysis complete:", result);
    }
  }
}
```

## Next Steps

- Learn more about [Authentication](../guides/authentication)
- Understand [Camera Calibration](../guides/camera-calibration)
- Explore the [Swift SDK Reference](/swift-api)
- Explore the [TypeScript SDK Reference](/typescript-api)
