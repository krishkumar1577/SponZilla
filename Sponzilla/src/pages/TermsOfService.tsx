import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const TermsOfService: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <Navbar />

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Page Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72 text-left">Terms of Service</p>
            </div>

            {/* Introduction */}
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              Welcome to SponZilla! These Terms of Service govern your use of our platform and services. By accessing or using SponZilla, you agree to comply with these
              terms. Please read them carefully.
            </p>

            {/* Section 1 */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">1. Acceptance of Terms</h3>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              By using SponZilla, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are
              prohibited from using or accessing this site.
            </p>

            {/* Section 2 */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">2. Description of Service</h3>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              SponZilla provides a platform for student clubs to connect with brands for sponsorship opportunities. We facilitate connections but are not responsible for the
              actions or agreements between clubs and brands.
            </p>

            {/* Section 3 */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">3. User Accounts</h3>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              To use certain features of SponZilla, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and
              for all activities that occur under your account.
            </p>

            {/* Section 4 */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">4. User Conduct</h3>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              You agree not to use SponZilla for any unlawful or prohibited activities. This includes, but is not limited to, posting inappropriate content, engaging in
              fraudulent activities, or violating the rights of others.
            </p>

            {/* Section 5 */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">5. Intellectual Property</h3>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              All content on SponZilla, including text, graphics, logos, and software, is the property of SponZilla or its licensors and is protected by copyright and other
              intellectual property laws.
            </p>

            {/* Section 6 */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">6. Limitation of Liability</h3>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              SponZilla is not liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our
              platform.
            </p>

            {/* Section 7 */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">7. Changes to Terms</h3>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              We reserve the right to modify these Terms of Service at any time. Your continued use of SponZilla after any changes indicates your acceptance of the new terms.
            </p>

            {/* Section 8 */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">8. Governing Law</h3>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction in which SponZilla operates.
            </p>

            {/* Section 9 */}
            <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">9. Contact Us</h3>
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              If you have any questions about these Terms of Service, please contact us at support@sponzilla.com.
            </p>

            {/* Return Link */}
            <Link to="/" className="text-[#617989] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline text-left">
              Return to Homepage
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-[#dde1e3]">
          <div className="flex flex-col gap-6 py-10 text-center">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:flex-row">
              <Link className="text-[#617689] hover:text-[#111518] text-sm font-medium transition-colors" to="/about">About</Link>
              <Link className="text-[#617689] hover:text-[#111518] text-sm font-medium transition-colors" to="/contact">Contact Us</Link>
              <Link className="text-[#617689] hover:text-[#111518] text-sm font-medium transition-colors" to="/privacy-policy">Privacy Policy</Link>
              <Link className="text-[#617689] hover:text-[#111518] text-sm font-medium transition-colors" to="/terms-of-service">Terms of Service</Link>
            </div>
            <p className="text-[#617689] text-xs font-normal">
              © 2025 SponZilla. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TermsOfService;
