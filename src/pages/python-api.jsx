import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function PythonAPI() {
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    const iframe = document.querySelector('iframe[title="Python API Documentation"]');
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

        const style = iframeDoc.createElement('style');
        style.textContent = `
          /* Dark mode variable overrides — triggered by parent Docusaurus theme sync */
          body[data-color-scheme='dark'] {
            --pdoc-background: #1e2126;
          }
          body[data-color-scheme='dark'] .pdoc {
            --text: #ced4da;
            --muted: #6c757d;
            --link: #66b3ff;
            --link-hover: #80c4ff;
            --code: #161b22;
            --active: #fff598;
            --accent: #2d3238;
            --accent2: #454d57;
            --nav-hover: rgba(0, 0, 0, 0.2);
            --name: #66b3ff;
            --def: #66c266;
            --annotation: #66b3ff;
          }
          body[data-color-scheme='dark'] {
            background-color: var(--pdoc-background);
            color: var(--text, #ced4da);
          }
          /* Hide pdoc's own theme toggle — theme is controlled by Docusaurus */
          .color-scheme-toggle { display: none !important; }
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
