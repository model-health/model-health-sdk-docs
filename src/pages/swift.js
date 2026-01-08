import React from 'react';
import Layout from '@theme/Layout';

export default function SwiftAPI() {
  return (
    <Layout title="Swift API Reference" description="Swift API documentation for ModelHealth SDK">
      <div className="container margin-vert--lg">
        <h1>Swift API Reference</h1>
        <p>
          The Swift API documentation is generated from Swift DocC and will be integrated here.
        </p>
        <p>
          For now, you can view the documentation by building it locally:
        </p>
        <pre>
          <code>
            {`cd model-health
make docs-swift-preview`}
          </code>
        </pre>
        <p>
          This will start a local server at <code>http://localhost:3000</code> with the full Swift API reference.
        </p>
        <h2>Quick Links</h2>
        <ul>
          <li><strong>ModelHealthService</strong> - Main SDK interface</li>
          <li><strong>Session</strong> - Calibration session management</li>
          <li><strong>Activity</strong> - Movement recording and analysis</li>
          <li><strong>Subject</strong> - Subject profile management</li>
        </ul>
      </div>
    </Layout>
  );
}
