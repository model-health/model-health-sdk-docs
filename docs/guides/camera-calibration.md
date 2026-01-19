---
sidebar_position: 2
---

# Camera Calibration

Camera calibration is essential for accurate biomechanical analysis. It establishes the relationship between camera pixels and real-world measurements.

## Requirements

You'll need a checkerboard calibration pattern with known dimensions. Common configurations:

- 4×5 checkerboard (4 rows, 5 columns)
- 35mm square size
- Printed on stiff material (foam board recommended)

## Calibration Process

### 1. Create a Session

First, create a calibration session:

**Swift:**
```swift
let session = try await service.createSession()
```

**TypeScript:**
```typescript
const session = await service.createSession();
```

### 2. Set Up Checkerboard

Define your checkerboard details:

**Swift:**
```swift
let details = CheckerboardDetails(
    rows: 4,
    columns: 5,
    squareSize: 35,  // millimeters
    placement: .perpendicular
)
```

**TypeScript:**
```typescript
const details = {
  rows: 4,
  columns: 5,
  square_size: 35,  // millimeters
  placement: "perpendicular"
};
```

### 3. Calibrate Camera

**Swift:**
```swift
try await service.calibrateCamera(session, checkerboardDetails: details) { status in
    switch status {
    case .recording:
        print("Recording calibration...")
    case .uploading(let uploaded, let total):
        print("Uploading \(uploaded)/\(total) videos")
    case .processing(let percent):
        if let percent = percent {
            print("Processing: \(percent)%")
        } else {
            print("Processing...")
        }
    case .done:
        print("Calibration complete!")
    }
}
```

**TypeScript:**
```typescript
await service.calibrateCamera(session, details, (status) => {
  switch (status.type) {
    case "recording":
      console.log("Recording calibration...");
      break;
    case "uploading":
      console.log(`Uploading ${status.uploaded}/${status.total} videos`);
      break;
    case "processing":
      if (status.percent !== undefined) {
        console.log(`Processing: ${status.percent}%`);
      } else {
        console.log("Processing...");
      }
      break;
    case "done":
      console.log("Calibration complete!");
      break;
  }
});
```

## Neutral Pose Calibration

After camera calibration, capture the subject's neutral standing pose for scaling:

**Swift:**
```swift
let subjects = try await service.subjectList()
if let subject = subjects.first {
    try await service.calibrateNeutralPose(for: subject, in: session) { status in
        switch status {
        case .recording:
            print("Recording neutral pose...")
        case .uploading(let uploaded, let total):
            print("Uploading \(uploaded)/\(total) videos")
        case .processing(let percent):
            if let percent = percent {
                print("Processing: \(percent)%")
            } else {
                print("Processing...")
            }
        case .done:
            print("Neutral pose captured!")
        }
    }
}
```

**TypeScript:**
```typescript
const subjects = await service.subjectList();
if (subjects.length > 0) {
  await service.calibrateNeutralPose(subjects[0], session, (status) => {
    switch (status.type) {
      case "recording":
        console.log("Recording neutral pose...");
        break;
      case "uploading":
        console.log(`Uploading ${status.uploaded}/${status.total} videos`);
        break;
      case "processing":
        if (status.percent !== undefined) {
          console.log(`Processing: ${status.percent}%`);
        } else {
          console.log("Processing...");
        }
        break;
      case "done":
        console.log("Neutral pose captured!");
        break;
    }
  });
}
```

## Tips for Successful Calibration

1. **Lighting** - Ensure even, bright lighting without glare on the checkerboard
2. **Movement** - Move the checkerboard to various positions and angles
3. **Coverage** - Cover different areas of the camera's field of view
4. **Stillness** - Hold the checkerboard still when capturing each image
5. **Distance** - Vary the distance from the camera during calibration

## Troubleshooting

**Checkerboard not detected:**
- Ensure the pattern is clearly visible
- Check lighting conditions
- Verify the rows/columns configuration matches your physical checkerboard

**Poor calibration quality:**
- Capture more images from different angles
- Ensure the checkerboard is flat and not warped
- Try different distances from the camera
