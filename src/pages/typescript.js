import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

export default function TypeScriptAPI() {
  useEffect(() => {
    window.location.href = '/typescript/';
  }, []);

  return (
    <Layout title="TypeScript API Reference" description="TypeScript API documentation for ModelHealth SDK">
      <div className="container margin-vert--lg">
        <p>Redirecting to TypeScript API documentation...</p>
      </div>
    </Layout>
  );
}