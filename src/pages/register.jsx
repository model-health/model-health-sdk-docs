import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './register.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    keyName: ''
  });
  
  const [status, setStatus] = useState({
    type: null, // 'loading', 'success', 'error'
    message: ''
  });
  
  const [apiKey, setApiKey] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '' });

    try {
      const endpoint = `${process.env.REACT_APP_API_BASE_URL}/api/v2/register-api-key/`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          ...(formData.companyName && { company_name: formData.companyName }),
          key_name: formData.keyName || 'Default Key'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      setApiKey(data.api_key);
      setStatus({
        type: 'success',
        message: 'API key generated successfully!'
      });

      // Clear form
      setFormData({
        name: '',
        email: '',
        companyName: '',
        keyName: ''
      });

    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Failed to generate API key. Please try again.'
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setStatus({
      type: 'success',
      message: 'API key copied to clipboard!'
    });
  };

  return (
    <Layout title="Get API Key" description="Register for a Model Health SDK API key">
      <div className={styles.registerContainer}>
        <div className={styles.registerContent}>
          <h1>Get Your API Key</h1>
          <p className={styles.subtitle}>
            Register to receive your API key and start using the Model Health SDK.
          </p>

          {!apiKey ? (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Robin Smith"
                  disabled={status.type === 'loading'}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="robin@example.com"
                  disabled={status.type === 'loading'}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="companyName">Company Name (Optional)</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your Company or Institution"
                  disabled={status.type === 'loading'}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="keyName">API Key Name (Optional)</label>
                <input
                  type="text"
                  id="keyName"
                  name="keyName"
                  value={formData.keyName}
                  onChange={handleChange}
                  placeholder="e.g., Production, Development"
                  disabled={status.type === 'loading'}
                />
                <small>Give your API key a memorable name to help you organize multiple keys.</small>
              </div>

              {status.type === 'error' && (
                <div className={styles.alert + ' ' + styles.alertError}>
                  {status.message}
                </div>
              )}

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={status.type === 'loading'}
              >
                {status.type === 'loading' ? 'Generating...' : 'Generate API Key'}
              </button>
            </form>
          ) : (
            <div className={styles.successContainer}>
              <div className={styles.alert + ' ' + styles.alertSuccess}>
                <strong>Success!</strong> Your API key has been generated.
              </div>

              <div className={styles.apiKeyDisplay}>
                <label>Your API Key</label>
                <div className={styles.apiKeyBox}>
                  <code>{apiKey}</code>
                  <button 
                    onClick={copyToClipboard}
                    className={styles.copyButton}
                    title="Copy to clipboard"
                  >
                    📋 Copy
                  </button>
                </div>
                <div className={styles.warning}>
                  ⚠️ <strong>Important:</strong> Store this API key securely. You won't be able to see it again.
                </div>
              </div>

              <div className={styles.nextSteps}>
                <h3>Next Steps</h3>
                <ol>
                  <li>Copy your API key and store it securely</li>
                  <li>Follow the <a href="/docs/getting-started/installation">Installation Guide</a></li>
                  <li>Check out the <a href="/docs/getting-started/quick-start">Quick Start</a> to begin using the SDK</li>
                </ol>
              </div>

              <button 
                onClick={() => {
                  setApiKey(null);
                  setStatus({ type: null, message: '' });
                }}
                className={styles.secondaryButton}
              >
                Generate Another Key
              </button>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}
