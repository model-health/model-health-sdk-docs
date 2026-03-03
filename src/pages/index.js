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
          Ship Biomechanical Intelligence in Days
        </h1>
        <p className="hero__subtitle">
          Production-ready SDKs for applications requiring precision in sports, physical therapy, performance, rehabilitation, or digital health.
          <br />
          Turn smartphone video into scientifically-validated biomechanical data.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Start Building
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageSDKs() {
  return (
    <section className={styles.features + " padding-vert--l"}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">
          Built for Your Stack
        </h2>
        <div className="row">
          {[
            {
              title: "Swift SDK",
              description: "Native iOS SDK with full support for iPhone and iPad. Built with Swift and optimized for production deployment.",
              link: "/swift-api",
              linkText: "View Swift SDK →",
            },
            {
              title: "TypeScript SDK",
              description: "Cross-platform SDK for browser and Node.js environments. Compatible with both JavaScript and TypeScript projects.",
              link: "/typescript-api",
              linkText: "View TypeScript SDK →",
            },
            {
              title: "Python SDK (Soon)",
              description: "Automated generation and aggregation of structured biomechanical insights, without requiring researchers to develop your own post-processing code or manually interacting with our web application.",
              link: "mailto:steve@modelhealth.io",
              linkText: "Register your interest",
            },
          ].map((sdk) => (
            <div className="col col--4" key={sdk.title}>
              <div className={styles.card}>
                <h3>{sdk.title}</h3>
                <p>{sdk.description}</p>
                <Link to={sdk.link}>{sdk.linkText}</Link>
              </div>
            </div>
          ))}
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
              description: "Embed motion capture and biomechanical analysis directly into your platform. The SDK provides the APIs to record movement and obtain both validated 3D kinematics and summary metrics without building complex workflows from scratch."
            },
            {
              title: "Cloud-Powered Analysis",
              description: "Send data to our secure cloud pipelines for 3D modeling, automated metrics extraction, and structured reports — all handled behind the scenes. No specialized infrastructure required."
            },
            {
              title: "Structured & Ready-to-Use Outputs",
              description: "Receive time-series kinematics, key movement metrics, and optional reports in formats that can be easily integrated into your app, dashboards, databases, or research workflows."
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
      title={`${siteConfig.title} Documentation`}
      description="Production-ready biomechanical analysis from smartphone video">
      <HomepageHeader />
      <main>
        <HomepageSDKs />
        <WhatYouGet />
        <BuiltFor />
      </main>
    </Layout>
  );
}
