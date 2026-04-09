# TypeScript Example App

A Vite web app that implements the same workflow as the iOS example in the browser. It uses the `@modelhealth/modelhealth` npm package and runs a local dev server.

Source: [`examples/ts`](https://github.com/model-health/model-health/tree/main/examples/ts)

## Requirements

- Node.js 16.0+
- A modern browser with WebAssembly support (Chrome, Edge, Firefox, or Safari)
- An API key — [request access](mailto:support@modelhealth.io?subject=API%20Access%20Request&body=Hi%20Model%20Health%20team%2C%0A%0AI%27m%20interested%20in%20integrating%20the%20Model%20Health%20SDK.%0A%0ACompany%3A%0AUse%20case%3A%0APlatform%20(iOS%2C%20Web%2C%20other)%3A%0AExisting%20Model%20Health%20account%3A%20Yes%20%2F%20No%0AIf%20yes%2C%20account%20email%3A%0A%0AThanks) if you don't have one

## Configuration

Copy the environment template and add your API key:

```bash
cd examples/ts
cp .env.local.template .env.local
```

Open `.env.local` and replace the placeholder:

```
VITE_API_KEY=your_api_key_here
```

## Launch

Install dependencies and start the dev server:

```bash
make install
make dev
```

The app opens at `http://localhost:5173`. The dev server is also accessible on your local network at your machine's IP address — useful for testing the full workflow from a mobile device running the Model Health Companion app.
