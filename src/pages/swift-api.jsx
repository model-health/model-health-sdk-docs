import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

export default function SwiftAPI() {
  useEffect(() => {
    const iframe = document.querySelector('iframe[title="Swift API Documentation"]');
    if (iframe) {
      iframe.addEventListener('load', () => {
        try {
          iframe.contentWindow.baseUrl = '/swift/';
        } catch (e) {
          console.error('Could not set baseUrl:', e);
        }
      });
    }
  }, []);

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
