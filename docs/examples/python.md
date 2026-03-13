---
sidebar_position: 3
---

# Python Example App

An interactive CLI demo that walks through the post-capture analysis workflow. Camera calibration, subject calibration and activity recording require the Model Health mobile app and are not demonstrated — use the [iOS](./ios) or [TypeScript](./typescript) example for those steps.

## Requirements

- Python 3.11+
- An API key — [request access](mailto:support@modelhealth.io?subject=API%20Access%20Request&body=Hi%20Model%20Health%20team%2C%0A%0AI%27m%20interested%20in%20integrating%20the%20Model%20Health%20SDK.%0A%0ACompany%3A%0AUse%20case%3A%0APlatform%20(iOS%2C%20Web%2C%20other)%3A%0AExisting%20Model%20Health%20account%3A%20Yes%20%2F%20No%0AIf%20yes%2C%20account%20email%3A%0A%0AThanks) if you don't have one

## Configuration

Install the SDK:

```bash
pip install modelhealth
```

## Launch

```bash
python3 examples/python/demo.py <your_api_key>
```

The demo will prompt you to select a session, an activity, an analysis type and the result files to save. Downloaded results are written to `examples/python/downloads/`.
