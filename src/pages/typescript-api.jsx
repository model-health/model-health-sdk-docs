import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function TypeScriptAPI() {
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    const iframe = document.querySelector('iframe[title="TypeScript API Documentation"]');
    if (!iframe) return;

    const injectStyles = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const style = iframeDoc.createElement('style');
        style.textContent = `
          /* Hide TypeDoc settings panel */
          .tsd-page-toolbar { display: none !important; }
        `;
        iframeDoc.head.appendChild(style);

        // Sync theme from parent
        const colorMode = document.documentElement.getAttribute('data-theme') || 'light';
        iframeDoc.documentElement.setAttribute('data-theme', colorMode === 'dark' ? 'dark' : 'light');
      } catch (e) {
        console.warn('Could not inject styles into iframe');
      }
    };

    iframe.addEventListener('load', injectStyles);
    return () => iframe.removeEventListener('load', injectStyles);
  }, []);

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
