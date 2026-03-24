import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './register.module.css';

export default function Register() {
  const { siteConfig } = useDocusaurusContext();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    company_name: '',
    key_name: 'Default Key'
  });
  
  const [status, setStatus] = useState({
    type: null, // 'loading', 'success', 'error'
    message: ''
  });
  
  const [apiKey, setApiKey] = useState(null);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

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
      const customApiUrl = siteConfig.customFields?.DOCUSAURUS_API_URL;
      const buildEnv = siteConfig.customFields?.BUILD_ENV;
      
      console.log('🔍 Environment Debug:', {
        customApiUrl,
        buildEnv,
        allCustomFields: siteConfig.customFields
      });
      
      let endpoint;
      if (customApiUrl) {
        endpoint = `${customApiUrl}/register-api-key/`;
      } else if (buildEnv === 'dev') {
        endpoint = 'https://dev.modelhealth.io/register-api-key/';
      } else {
        endpoint = 'https://api.modelhealth.io/register-api-key/';
      }
      
      console.log('📡 API Endpoint:', endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          ...(formData.company_name && { company_name: formData.company_name }),
          key_name: formData.key_name || 'Default Key'
        })
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', response.headers);

      // Get response text first to handle both JSON and non-JSON responses
      const responseText = await response.text();
      console.log('📥 Response text:', responseText);

      if (!response.ok) {
        let errorMessage = 'Registration failed';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Response wasn't JSON, use status text or raw response
          errorMessage = `Server error (${response.status}): ${responseText.substring(0, 100)}`;
        }
        throw new Error(errorMessage);
      }

      // Parse successful response
      const data = JSON.parse(responseText);
      console.log('✅ Success:', data);
      
      setApiKey(data.api_key);
      setStatus({
        type: 'success',
        message: 'API key generated successfully!'
      });

      // Clear form
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        company_name: '',
        key_name: 'Default Key'
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
          <p className={styles.subtitle}>
            The free trial includes <strong>1 month of access</strong> and up to <strong>10 new sessions</strong>. After the trial, <a href="mailto:support@modelhealth.io">get in touch</a> to continue.
          </p>

          {!apiKey ? (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="first_name">First Name *</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  placeholder="Alex"
                  disabled={status.type === 'loading'}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="last_name">Last Name *</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  placeholder="Smith"
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
                  placeholder="alex@example.com"
                  disabled={status.type === 'loading'}
                />
                <small>If you already have a Model Health account, use the same email address to access your existing data.</small>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="company_name">Company Name (Optional)</label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Your Company or Institution"
                  disabled={status.type === 'loading'}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="key_name">API Key Name (Optional)</label>
                <input
                  type="text"
                  id="key_name"
                  name="key_name"
                  value={formData.key_name}
                  onChange={handleChange}
                  placeholder="e.g., Production, Development"
                  disabled={status.type === 'loading'}
                />
                <small>Give your API key a memorable name to help you organize multiple keys.</small>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={agreedPrivacy}
                    onChange={(e) => setAgreedPrivacy(e.target.checked)}
                    disabled={status.type === 'loading'}
                  />
                  <span>I confirm that I have read the <a href="https://www.modelhealth.io/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy and Security Policy</a> of Model Health</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    disabled={status.type === 'loading'}
                  />
                  <span>I confirm that I have read and agree to the <a href="https://www.modelhealth.io/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> of Model Health</span>
                </label>
              </div>

              {status.type === 'error' && (
                <div className={styles.alert + ' ' + styles.alertError}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={
                  status.type === 'loading' ||
                  !agreedPrivacy ||
                  !agreedTerms ||
                  !formData.first_name ||
                  !formData.last_name ||
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                }
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
