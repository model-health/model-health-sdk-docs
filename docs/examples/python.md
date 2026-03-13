---
sidebar_position: 3
---

# Python Example App

Interactive CLI demos covering the full SDK surface.

## Requirements

- Python 3.11+
- An API key — [request access](mailto:support@modelhealth.io?subject=API%20Access%20Request&body=Hi%20Model%20Health%20team%2C%0A%0AI%27m%20interested%20in%20integrating%20the%20Model%20Health%20SDK.%0A%0ACompany%3A%0AUse%20case%3A%0APlatform%20(iOS%2C%20Web%2C%20other)%3A%0AExisting%20Model%20Health%20account%3A%20Yes%20%2F%20No%0AIf%20yes%2C%20account%20email%3A%0A%0AThanks) if you don't have one

## Configuration

Install the SDK:

```bash
pip install modelhealth
```

## Capture demo

`capture_demo.py` walks through the complete capture workflow end-to-end:

1. Create a session
1. Calibrate cameras using a checkerboard pattern
1. Select or create a subject
1. Calibrate the subject (neutral standing pose)
1. Record a movement trial
1. Wait for upload and processing

Requires cameras connected and ready via the Model Health mobile app.

```bash
python3 examples/python/capture_demo.py <your_api_key>
```

## Analysis demo

`demo.py` walks through the post-capture analysis workflow on an existing session:

1. Select a session and activity
1. Wait for processing (if needed)
1. Choose an analysis type and run it
1. Choose which result files to save (metrics JSON, report PDF, data ZIP)

```bash
python3 examples/python/demo.py <your_api_key>
```

Downloaded results are written to `examples/python/downloads/`.
