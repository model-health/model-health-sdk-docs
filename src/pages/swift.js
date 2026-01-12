import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';

export default function SwiftAPI() {
  const history = useHistory();

  useEffect(() => {
    history.push('/swift/');
  }, [history]);

  return (
    <Layout title="Swift API Reference" description="Swift API documentation for ModelHealth SDK">
      <div className="container margin-vert--lg">
        <p>Redirecting to Swift API documentation...</p>
      </div>
    </Layout>
  );
}
