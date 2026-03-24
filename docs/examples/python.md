# Python Examples

A collection of example scripts demonstrating the Model Health Python SDK.

Source: [`examples/python`](https://github.com/model-health/model-health/tree/main/examples/python)

## Requirements

- Python 3.11+
- An API key — [request access](mailto:support@modelhealth.io?subject=API%20Access%20Request&body=Hi%20Model%20Health%20team%2C%0A%0AI%27m%20interested%20in%20integrating%20the%20Model%20Health%20SDK.%0A%0ACompany%3A%0AUse%20case%3A%0APlatform%20(iOS%2C%20Web%2C%20other)%3A%0AExisting%20Model%20Health%20account%3A%20Yes%20%2F%20No%0AIf%20yes%2C%20account%20email%3A%0A%0AThanks) if you don't have one

## Installation

```bash
pip install modelhealth docopt pandas matplotlib
```

## Configuration

API credentials can be stored in a `.env` file in this directory so you don't
have to pass them on the command line every time.

Create a file called `.env` (it is gitignored):

```
MODEL_HEALTH_API_KEY=your_model_health_api_key
OPENCAP_TOKEN=your_opencap_token        # only needed for opencap_import.py
```

Each script reads credentials in this order:
1. Command-line argument (if provided)
2. `.env` file in this directory
3. Environment variable (`MODEL_HEALTH_API_KEY` / `OPENCAP_TOKEN`)

If `OPENCAP_TOKEN` is not found by any of the above, `opencap_import.py` will
prompt you to log in with your OpenCap
credentials and will save the token to `.env` automatically.


## Scripts

### `activity_recording.py` — Full capture workflow

Walks through the complete capture workflow end-to-end:

1. Create a session (QR code saved locally for pairing)
2. Select or create a subject
3. Calibrate cameras using a checkerboard pattern
4. Calibrate the subject (neutral standing pose)
5. Record a movement trial

```bash
python3 examples/python/activity_recording.py
```

### `activity_analysis.py` — Post-capture analysis workflow

Walks through the post-capture analysis workflow on an existing session:

1. Select a session and activity
3. Choose an analysis and run it
4. Choose which results to download (e.g., metrics or report)

```bash
python3 examples/python/activity_analysis.py
```

### `archive_session.py` — Session archive download

Requests preparation of a session archive, polls until ready and downloads the resulting ZIP file. Optionally includes video files.

```bash
python3 examples/python/archive_session.py
```

### `session_data.py` — Data download

Downloads data from a session at multiple levels of granularity: raw or synced videos, OpenSim model, motion data and analysis results.

```bash
python3 examples/python/session_data.py
```

### `plot_kinematics.py` — Download and plot kinematics for an activity

Selects a session (your own or a built-in demo session), picks an 
activity, downloads its kinematics CSV and plots selected joint angle
columns against time.

```bash
python3 examples/python/plot_kinematics.py
```

### `opencap_import.py` — OpenCap data import

Imports an OpenCap session into Model Health for processing and analysis. Demonstrates the `importSession` API and `SessionConfig`.

```bash
python3 examples/python/opencap_import.py <opencap_session_id>
```
