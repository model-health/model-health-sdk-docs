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
          Your fastest way to lab-grade movement analysis.
          <br />
          Biomechanical analysis from smartphone video, for medical, performance and research teams
        </p>
        <div className={styles.buttons}>
          <Link className="button button--lg" style={{ backgroundColor: '#A5FF01', color: '#02352E', fontWeight: 700, border: 'none' }} to="/docs/intro">
            Get Started →
          </Link>
        </div>
      </div>
    </header>
  );
}


function WhatYouGet() {
  return (
    <section className={styles.features + " padding-vert--l"}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">
          What You Get Out of the Box
        </h2>
        <div className="row" style={{ justifyContent: 'center', textAlign: 'center' }}>
          {[
            {
              title: "Markerless motion capture, anywhere",
              description: "Capture full-body biomechanical data in 3D using just two smartphones — no lab, no markers, no barriers."
            },
            {
              title: "Automated data analysis for most frequent physical tests",
              description: "Run standardized biomechanical assessments for 12 movement types and get objective biomechanical insights in minutes."
            },
            {
              title: "Health & performance dashboards and reports",
              description: "Track athletes' movement quality, asymmetries, and readiness over time with shareable reports built for clinicians and performance staffs."
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
      title: "Clinical & Medical staff",
      description: "Model Health delivers validated 3D movement analysis into everyday rehab. Results in minutes, ready for routine clinical use and return-to-activity decisions.",
    },
    {
      title: "Performance team",
      description: "Assess movement quality, explosiveness, and coordination in minutes, individualizing training, supporting readiness and return-to-performance decisions, and aligning staff around objective movement data.",
    },
    {
      title: "R&D teams",
      description: "Built on the foundations of OpenCap, Model Health extends smartphone-based motion capture with automated analysis, standardized metrics, and ready-to-use assessment modules, enabling reproducible protocols at scale without the operational constraints of a traditional motion lab.",
    },
  ];

  return (
    <section className={clsx(styles.features, styles.builtForSection, "padding-vert--l")}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">
          Built For
        </h2>
        <div className="row" style={{ justifyContent: 'center' }}>
          {useCases.map((caseItem) => (
            <div className="col col--4" key={caseItem.title}>
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
        <WhatYouGet />
        <BuiltFor />
      </main>
    </Layout>
  );
}
