import React from 'react';
import Navbar from '../components/layout/Navbar';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <Navbar />

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Page Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72 text-left">Privacy Policy</p>
            </div>

            {/* Privacy Policy Content */}
            <p className="text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4 text-left">
              At SponZilla, we value your trust and are committed to safeguarding your personal information. This Privacy Policy describes how we handle the information you provide when you use our platform and related services (“Services”). By accessing or using SponZilla, you agree to the terms outlined here. We collect the information you choose to share with us, such as when you register, create a profile, make a transaction, or contact us. This information may include your name, email address, organization details, and any other details you voluntarily provide. We use this information to deliver and improve our Services, personalize your experience, communicate with you, and ensure the proper functioning of our platform. We do not sell your personal information. However, we may share it with trusted service providers who assist us in operating our Services or conducting business activities, under agreements that require them to protect your information. We may also disclose information if required by law or in connection with the protection of our legal rights. We take reasonable measures to protect your personal data from unauthorized access or disclosure, but no system is completely secure. You may request to access, update, or delete your information at any time by contacting us. This Privacy Policy may be updated periodically to reflect changes in our practices or for legal and regulatory reasons. Any changes will be posted on this page, and your continued use of the Services after such updates indicates your acceptance of the revised terms. For any questions regarding this Privacy Policy, please contact me at xdevkrish@gmail.com .
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
