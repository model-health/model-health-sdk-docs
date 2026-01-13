import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function SwiftAPI() {
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    const iframe = document.querySelector('iframe[title="Swift API Documentation"]');
    if (!iframe) return;

    const syncTheme = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (!iframeDoc) return;

        const colorMode = document.documentElement.getAttribute('data-theme') || 'light';
        iframeDoc.body.setAttribute('data-color-scheme', colorMode);
      } catch (e) {
        console.warn('Could not sync theme to iframe');
      }
    };

    const injectStyles = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        // Hide controls
        const style = iframeDoc.createElement('style');
        style.textContent = `
          .color-scheme-toggle { display: none !important; }
          footer { display: none !important; }
          
          /* Match Docusaurus fonts */
          body {
            font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
          }
          
          /* Adjust font sizes to be more consistent */
          body {
            font-size: 16px;
            line-height: 1.6;
          }
        `;
        iframeDoc.head.appendChild(style);

        syncTheme();
      } catch (e) {
        console.warn('Could not inject styles into iframe');
      }
    };

    iframe.addEventListener('load', injectStyles);

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      iframe.removeEventListener('load', injectStyles);
      observer.disconnect();
    };
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
