import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function SwiftAPI() {
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    const iframe = document.querySelector('iframe[title="Swift API Documentation"]');
    if (!iframe) return;

    const injectStyles = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const style = iframeDoc.createElement('style');
        style.textContent = `
          /* Hide Swift DocC theme toggle */
          .color-scheme-toggle { display: none !important; }
          footer { display: none !important; }
        `;
        iframeDoc.head.appendChild(style);

        // Sync theme from parent
        const colorMode = document.documentElement.getAttribute('data-theme') || 'light';
        iframeDoc.body.setAttribute('data-color-scheme', colorMode);
      } catch (e) {
        console.warn('Could not inject styles into iframe');
      }
    };

    iframe.addEventListener('load', injectStyles);
    return () => iframe.removeEventListener('load', injectStyles);
  }, []);

  return (
    <Layout title="Swift API Reference">
      <iframe
        src="/swift/documentation/modelhealth/"
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
