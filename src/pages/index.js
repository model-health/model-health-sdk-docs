import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          Model Health Documentation
        </h1>
        <p className="hero__subtitle">
          Everything you need to use and build with Model Health.
          <br />
          Biomechanical analysis from smartphone video — for clinicians, researchers and developers.
        </p>
      </div>
    </header>
  );
}

function PathCards() {
  return (
    <section className={styles.pathSection}>
      <div className="container">
        <div className={styles.pathGrid}>
          <div className={styles.pathCard}>
            <div className={styles.pathCardInner}>
              <div className={styles.pathIcon}>📖</div>
              <h2>Product Docs</h2>
              <p>
                Guides, best practices, and reference material for using the
                Model Health web and mobile app. Get up and running quickly,
                and get the most out of every session.
              </p>
              <Link className={clsx('button button--primary button--lg', styles.pathButton)} to="/docs/getting-started">
                Get Started →
              </Link>
            </div>
          </div>
          <div className={styles.pathCard}>
            <div className={styles.pathCardInner}>
              <div className={styles.pathIcon}>⚡</div>
              <h2>SDK</h2>
              <p>
                Integrate biomechanical analysis directly into your product.
                Production-ready SDKs for Swift, TypeScript, and Python —
                from recording to structured data in a few API calls.
              </p>
              <Link className={clsx('button button--outline button--primary button--lg', styles.pathButton)} to="/sdk/intro">
                View SDK →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatYouGet() {
  return (
    <section className={styles.features + " padding-vert--l"}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">
          What You Get Out of the Box
        </h2>
        <div className="row">
          {[
            {
              title: "Seamless Integration",
              description: "Drop motion capture and biomechanical analysis into your platform. Simple APIs to record movement, run analyses and fetch results. No complex workflows to build from scratch."
            },
            {
              title: "Cloud-Powered Analysis",
              description: "Send data to our secure cloud pipelines for 3D modeling, automated metrics extraction and structured reports — all handled behind the scenes. No specialized infrastructure required."
            },
            {
              title: "Structured & Ready-to-Use Outputs",
              description: "Receive time-series kinematics, key movement metrics and optional reports in formats that can be easily integrated into your app, dashboards, databases, or research workflows."
            },
          ].map((feature) => (
            <div className="col col--4" key={feature.title}>
              <div className={styles.card}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuiltFor() {
  const useCases = [
    {
      title: "Sports & Health Platforms",
      description: "Build vertical products without a motion capture team. Focus on your workflows while the SDK handles validated motion analysis.",
    },
    {
      title: "Existing Product Extensions",
      description: "Add motion analysis to your portfolio. Integrate SDK outputs into dashboards and analytics pipelines without rebuilding your stack.",
    },
    {
      title: "Clinics & EMR Integration",
      description: "Automatically route motion data from the collection interface into your internal databases, EMR, or athletic management systems.",
    },
    {
      title: "Research & Development",
      description: "Access and analyze your motion capture data directly via the SDK instead of the web app, ideal for custom analyses and pipelines.",
    },
  ];

  return (
    <section className={clsx(styles.features, styles.builtForSection, "padding-vert--l")}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">
          Built For
        </h2>
        <div className="row">
          {useCases.map((caseItem) => (
            <div className="col col--3" key={caseItem.title}>
              <div className={styles.builtForCard}>
                <p><strong>{caseItem.title}</strong></p>
                <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>{caseItem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Documentation"
      description="Everything you need to use and build with Model Health">
      <HomepageHeader />
      <main>
        <PathCards />
        <WhatYouGet />
        <BuiltFor />
      </main>
    </Layout>
  );
}
