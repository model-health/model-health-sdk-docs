import React from 'react';
import Layout from '@theme/Layout';

export default function SwiftAPI() {
  return (
    <Layout title="Swift API Reference">
      <iframe
        src="/swift/"
        style={{
          width: '100%',
          height: 'calc(100vh - 60px)',
          border: 'none',
          display: 'block'
        }}
        title="Swift API Documentation"
      />
    </Layout>
  );
}
