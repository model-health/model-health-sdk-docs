import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function TypeScriptAPI() {
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    const iframe = document.querySelector('iframe[title="TypeScript API Documentation"]');
    if (!iframe) return;

    const syncTheme = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (!iframeDoc) return;

        const colorMode = document.documentElement.getAttribute('data-theme') || 'light';
        iframeDoc.documentElement.setAttribute('data-theme', colorMode === 'dark' ? 'dark' : 'light');
      } catch (e) {
        console.warn('Could not sync theme to iframe');
      }
    };

    const injectStyles = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        const style = iframeDoc.createElement('style');
        style.textContent = `
          .tsd-page-toolbar { display: none !important; }
          
          /* Match Docusaurus fonts */
          body {
            font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
          }
          
          /* Adjust font sizes */
          body {
            font-size: 16px;
            line-height: 1.6;
          }
          
          .tsd-typography {
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
    <Layout title="TypeScript API Reference">
      <iframe
        src="/typescript/modules.html"
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
