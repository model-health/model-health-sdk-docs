import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

export default function SwiftAPI() {
  useEffect(() => {
    window.location.href = '/swift/';
  }, []);

  return (
    <Layout title="Swift API Reference" description="Swift API documentation for ModelHealth SDK">
      <div className="container margin-vert--lg">
        <p>Redirecting to Swift API documentation...</p>
      </div>
    </Layout>
  );
}