import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import { useColorMode } from '@docusaurus/theme-common';

export default function SwiftAPI() {
  const { colorMode } = useColorMode();

  useEffect(() => {
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

        // Sync theme
        iframeDoc.body.setAttribute('data-color-scheme', colorMode);
      } catch (e) {
        // CORS might prevent this
        console.warn('Could not inject styles into iframe');
      }
    };

    iframe.addEventListener('load', injectStyles);
    return () => iframe.removeEventListener('load', injectStyles);
  }, [colorMode]);

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
