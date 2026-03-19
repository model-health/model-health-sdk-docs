# Python Examples

A collection of example scripts demonstrating the Model Health Python SDK.

## Requirements

- Python 3.11+
- An API key — [request access](mailto:support@modelhealth.io?subject=API%20Access%20Request&body=Hi%20Model%20Health%20team%2C%0A%0AI%27m%20interested%20in%20integrating%20the%20Model%20Health%20SDK.%0A%0ACompany%3A%0AUse%20case%3A%0APlatform%20(iOS%2C%20Web%2C%20other)%3A%0AExisting%20Model%20Health%20account%3A%20Yes%20%2F%20No%0AIf%20yes%2C%20account%20email%3A%0A%0AThanks) if you don't have one

## Installation

```bash
pip install modelhealth docopt
```

## Scripts

### `activity_recording.py` — Full capture workflow

Walks through the complete capture workflow end-to-end:

1. Create a session (QR code saved locally for pairing)
2. Select or create a subject
3. Calibrate cameras using a checkerboard pattern
4. Calibrate the subject (neutral standing pose)
5. Record a movement trial
6. Wait for upload and processing

Requires cameras connected and ready via the Model Health mobile app.

```bash
python3 examples/python/activity_recording.py <api_key>
```

### `activity_analysis.py` — Post-capture analysis workflow

Walks through the post-capture analysis workflow on an existing session:

1. Select a session and activity
2. Wait for processing to complete (if needed)
3. Choose an analysis type and run it
4. Choose which result files to save (metrics JSON, report PDF, data ZIP)

```bash
python3 examples/python/activity_analysis.py <api_key>
```

Downloaded results are written to `examples/python/downloads/`.

### `archive_session.py` — Session archive download

Requests preparation of a session archive, polls until ready, and downloads the resulting ZIP file. Optionally includes raw video files.

```bash
python3 examples/python/archive_session.py <api_key>
```

### `session_data.py` — Download data from an existing session

Downloads data from a session at multiple levels of granularity: full session archive, per-activity archives, OpenSim model, raw motion data, and analysis results.

```bash
python3 examples/python/session_data.py <api_key> <session_id>
```

### `opencap_import.py` — Import an OpenCap session

Copies all trials from an OpenCap session into a new Model Health session and processes them. Demonstrates the `importSession` API and `SessionConfig`.

```bash
python3 examples/python/opencap_import.py <api_key> <opencap_token> <opencap_session_id>
```
