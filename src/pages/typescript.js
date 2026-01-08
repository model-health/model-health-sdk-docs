import React from 'react';
import Layout from '@theme/Layout';

export default function TypeScriptAPI() {
  return (
    <Layout title="TypeScript API Reference" description="TypeScript API documentation for ModelHealth SDK">
      <div className="container margin-vert--lg">
        <h1>TypeScript API Reference</h1>
        <p>
          The TypeScript API documentation is generated from TypeDoc and will be integrated here.
        </p>
        <p>
          For now, you can view the documentation by building it locally:
        </p>
        <pre>
          <code>
            {`cd model-health
make docs-typescript-preview`}
          </code>
        </pre>
        <p>
          This will start a local server at <code>http://localhost:8080</code> with the full TypeScript API reference.
        </p>
        <h2>Quick Links</h2>
        <ul>
          <li><strong>ModelHealthService</strong> - Main SDK client class</li>
          <li><strong>Session</strong> - Session management types</li>
          <li><strong>Activity</strong> - Activity and recording types</li>
          <li><strong>Subject</strong> - Subject profile types</li>
          <li><strong>TokenStorage</strong> - Authentication token storage interface</li>
        </ul>
      </div>
    </Layout>
  );
}
