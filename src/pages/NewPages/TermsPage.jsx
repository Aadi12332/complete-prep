import React from 'react';
import Header from './Header';
import Footer from './Footer';

const TermsPage = () => {
  return (
    <>
      <div className='mainMaxWidth'>
        <Header />

        <div className="px-3 md:px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Terms of Usage 📄
            </h1>

            <p className="text-gray-600 mb-6 text-center">
              These Terms of Usage govern your access to and use of our platform. By using our services, you agree to comply with these terms.
            </p>

            <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed mt-16">
              <div>
                <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using our platform, you agree to be bound by these Terms of Usage. If you do not agree, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">2. Use of the Platform</h2>
                <p>
                  You agree to use the platform only for lawful purposes. You must not misuse the platform, attempt unauthorized access, or disrupt services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">3. User Accounts</h2>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">4. Content Usage</h2>
                <p>
                  All content provided on the platform is for educational purposes only. You may not copy, distribute, or reuse content without permission.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
                <p>
                  All materials, including logos, content, and designs, are owned by us and protected by applicable intellectual property laws.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
                <p>
                  We are not liable for any direct or indirect damages resulting from the use of our platform. Use the platform at your own risk.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
                <p>
                  We reserve the right to suspend or terminate access to the platform if users violate these terms or misuse the service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
                <p>
                  We may update these Terms of Usage from time to time. Continued use of the platform means you accept the updated terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
                <p>
                  If you have any questions regarding these Terms, feel free to contact us at{' '}
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

export default TermsPage;