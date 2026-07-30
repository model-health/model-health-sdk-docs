import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const PRODUCTS = [
  {
    title: 'TypeScript SDK',
    description: 'Cross-platform SDK for browser and Node.js environments. Compatible with both JavaScript and TypeScript projects.',
    link: '/typescript-sdk-api',
    linkText: 'View TypeScript SDK Reference →',
  },
  {
    title: 'TypeScript UI SDK',
    description: 'viewer-react — an embeddable React Three Fiber component for rendering motion data as an interactive 3D view.',
    link: '/typescript-ui-api',
    linkText: 'View TypeScript UI SDK Reference →',
  },
];

export default function TypeScriptAPI() {
  return (
    <Layout title="TypeScript">
      <section className={styles.features + ' padding-vert--l'}>
        <div className="container">
          <h2 className="text--center margin-bottom--lg">TypeScript</h2>
          <div className="row">
            {PRODUCTS.map((product) => (
              <div className="col col--6" key={product.title}>
                <div className={styles.card}>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <Link to={product.link}>{product.linkText}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
