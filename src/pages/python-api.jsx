import React from 'react';
import Layout from '@theme/Layout';

export default function PythonAPI() {
  return (
    <Layout title="Python API Reference">
      <iframe
        src="/python/modelhealth.html"
        style={{
          width: '100%',
          height: 'calc(100vh - 60px)',
          border: 'none',
          display: 'block'
        }}
        title="Python API Documentation"
      />
    </Layout>
  );
}
