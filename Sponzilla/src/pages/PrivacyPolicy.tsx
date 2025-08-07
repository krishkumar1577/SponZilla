import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111518]">
            <Link to="/" className="flex items-center gap-4 cursor-pointer">
              <div className="size-4">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]">SponZilla</h2>
            </Link>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link to="/about" className="text-[#111518] text-sm font-medium leading-normal">About Us</Link>
              <Link to="/contact" className="text-[#111518] text-sm font-medium leading-normal">Contact Us</Link>
            </div>
            <Link
              to="/login"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#118ee8] text-white text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Login/Sign Up</span>
            </Link>
          </div>
        </header>

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Page Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72 text-left">Privacy Policy</p>
            </div>

            {/* Privacy Policy Content */}
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              At SponZilla, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and share your
              information when you use our platform. By using SponZilla, you agree to the terms of this Privacy Policy. We may collect information you provide directly, such as
              when you register, create a profile, or contact us. This information may include your name, email address, organization details, and other relevant information. We
              also collect information automatically, such as your IP address, device information, and usage data. This helps us improve our platform and provide a better user
              experience. We use your information to provide and improve our services, personalize your experience, communicate with you, and ensure the security of our platform.
              We may share your information with third-party service providers who assist us in operating our platform, conducting business, or servicing you, as long as those
              parties agree to keep this information confidential. We may also disclose your information if required by law or to protect our rights and interests. We take
              reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic
              storage is completely secure, so we cannot guarantee absolute security. You have the right to access, update, or delete your personal information. You can manage your
              information through your account settings or by contacting us directly. We may update this Privacy Policy from time to time. We will notify you of any significant
              changes by posting the new policy on our platform. Your continued use of SponZilla after any changes indicates your acceptance of the updated policy. If you have
              any questions or concerns about this Privacy Policy, please contact us at privacy@sponzilla.com.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <p className="text-[#617989] text-base font-normal leading-normal">© 2025 SponZilla. All rights reserved.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
