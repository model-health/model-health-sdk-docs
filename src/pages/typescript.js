import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';

export default function TypeScriptAPI() {
  const history = useHistory();

  useEffect(() => {
    // Redirect to TypeDoc documentation
    history.push('/typescript/');
  }, [history]);

  return (
    <Layout title="TypeScript API Reference" description="TypeScript API documentation for ModelHealth SDK">
      <div className="container margin-vert--lg">
        <p>Redirecting to TypeScript API documentation...</p>
      </div>
    </Layout>
  );
}
