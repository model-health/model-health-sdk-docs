import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <h3>Swift SDK</h3>
            <p>
              Native iOS SDK with full support for iPhone, iPad, and Apple Watch.
              Built with Swift and optimized for iOS development.
            </p>
            <Link to="/swift-api">View Swift SDK →</Link>
          </div>
          <div className="col col--4">
            <h3>TypeScript SDK</h3>
            <p>
              Cross-platform JavaScript/TypeScript SDK with WebAssembly core.
              Works in browser and Node.js environments.
            </p>
            <Link to="/typescript-api">View TypeScript SDK →</Link>
          </div>
          <div className="col col--4">
            <h3>Easy Integration</h3>
            <p>
              Simple APIs for authentication, camera calibration, movement recording,
              and biomechanical analysis. Get started in minutes.
            </p>
            <Link to="/docs/getting-started/quick-start">Quick Start →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Documentation`}
      description="Biomechanical analysis from smartphone videos">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
