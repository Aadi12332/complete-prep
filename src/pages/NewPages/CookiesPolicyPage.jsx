import React from 'react';
import Header from './Header';
import Footer from './Footer';

const CookiesPolicyPage = () => {
  return (
    <>
      <div className='mainMaxWidth'>
        <Header />

        <div className="px-3 md:px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Cookie Policy 🔒
            </h1>

            <p className="text-gray-600 mb-6 text-center">
              This Cookie Policy explains how we use cookies and similar technologies to enhance your experience on our platform.
            </p>

            <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed mt-16">
              <div>
                <h2 className="text-xl font-semibold mb-2">1. What Are Cookies</h2>
                <p>
                  Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve your experience.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">2. How We Use Cookies</h2>
                <p>
                  We use cookies to personalize content, remember user preferences, analyze traffic, and improve overall performance of our platform.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">3. Types of Cookies We Use</h2>
                <p>
                  We may use session cookies, persistent cookies, and third-party cookies for analytics and functionality improvements.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">4. Third-Party Cookies</h2>
                <p>
                  Some cookies may be placed by third-party services such as analytics tools. These help us understand user behavior and improve our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">5. Managing Cookies</h2>
                <p>
                  You can control or disable cookies through your browser settings. However, disabling cookies may affect certain features of the platform.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">6. Changes to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time. Any changes will be posted on this page.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
                <p>
                  If you have any questions about our Cookie Policy, feel free to contact us at{' '}
                  <span className="text-blue-600">support@semprep.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CookiesPolicyPage;