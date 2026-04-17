import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PrivacyPolicyPage = () => {
  return (
    <>
      <div className='mainMaxWidth'>
        <Header />

      <div className="px-3 md:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Privacy Policy 🔐
          </h1>

          <p className="text-gray-600 mb-6 text-center">
            Your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your information while you use our platform.
          </p>

          <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed mt-16">
            <div>
              <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
              <p>
                We may collect personal information such as your name, email address, and usage data when you sign up or interact with our platform. This helps us improve your learning experience.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
              <p>
                Your information is used to provide personalized content, improve our services, communicate updates, and enhance overall user experience.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
              <p>
                We take appropriate security measures to protect your data from unauthorized access, misuse, or disclosure. Your data is stored securely and handled with care.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">4. Third-Party Services</h2>
              <p>
                We may use third-party tools or services to improve functionality. These services may collect limited data as per their own privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
              <p>
                We use cookies to enhance user experience, remember preferences, and analyze website traffic. You can disable cookies in your browser settings if you prefer.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal data. You can contact us anytime for any privacy-related concerns.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">7. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be reflected on this page.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, feel free to contact us at{' '}
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

export default PrivacyPolicyPage;