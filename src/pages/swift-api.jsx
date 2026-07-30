import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const PRODUCTS = [
  {
    title: 'Swift SDK',
    description: 'Native iOS SDK with full support for iPhone and iPad. Built with Swift and optimized for production deployment.',
    link: '/swift-sdk-api',
    linkText: 'View Swift SDK Reference →',
  },
  {
    title: 'Swift UI SDK',
    description: 'ModelHealthUI — an embeddable interactive 3D view for rendering motion data, built on SwiftUI and WebKit.',
    link: '/swift-ui-api',
    linkText: 'View Swift UI SDK Reference →',
  },
];

export default function SwiftAPI() {
  return (
    <Layout title="Swift">
      <section className={styles.features + ' padding-vert--l'}>
        <div className="container">
          <h2 className="text--center margin-bottom--lg">Swift</h2>
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
