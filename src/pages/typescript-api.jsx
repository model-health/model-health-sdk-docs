import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import { useColorMode } from '@docusaurus/theme-common';

export default function TypeScriptAPI() {
  const { colorMode } = useColorMode();

  useEffect(() => {
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

        // Sync theme - TypeDoc uses different attributes
        if (colorMode === 'dark') {
          iframeDoc.documentElement.setAttribute('data-theme', 'dark');
        } else {
          iframeDoc.documentElement.setAttribute('data-theme', 'light');
        }
      } catch (e) {
        console.warn('Could not inject styles into iframe');
      }
    };

    iframe.addEventListener('load', injectStyles);
    return () => iframe.removeEventListener('load', injectStyles);
  }, [colorMode]);

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
