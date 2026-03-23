# Examples

The Model Health SDK ships with reference example apps and scripts for iOS, TypeScript, and Python. They implement the SDK workflow end-to-end and are useful for getting oriented before building your own integration, or as a source of patterns to copy directly into your project.

All examples live in the [model-health repository](https://github.com/model-health/model-health) under `examples/`:

```
examples/
├── ios/     — SwiftUI app for iOS
├── ts/      — Vite web app (TypeScript/JavaScript)
└── python/  — CLI scripts (Python)
```

Clone the repository to get started:

```bash
git clone https://github.com/model-health/model-health.git
```

---

## iOS Example App

A native SwiftUI app that covers the complete SDK workflow: session management, camera calibration, subject calibration, activity recording, and analysis retrieval.

[iOS Example →](./ios)

---

## TypeScript Example App

A Vite web app that implements the same workflow in the browser using the `@modelhealth/modelhealth` npm package.

[TypeScript Example →](./typescript)

---

## Python Example Scripts

A collection of CLI scripts covering individual parts of the workflow — from full capture end-to-end to post-capture analysis, archive download, and importing OpenCap data for reprocessing and analysis.

[Python Examples →](./python)
