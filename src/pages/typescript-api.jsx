import React from 'react';
import Layout from '@theme/Layout';

export default function TypeScriptAPI() {
  return (
    <Layout title="TypeScript API Reference">
      <iframe
        src="/typescript/"
        style={{
          width: '100%',
          height: 'calc(100vh - 60px)',
          border: 'none',
          display: 'block'
        }}
        title="TypeScript API Documentation"
      />
    </Layout>
  );
}
