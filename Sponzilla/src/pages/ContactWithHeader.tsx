import React, { useState } from 'react';

const ContactWithHeaderPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header matching the original design */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111518]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]">SponZilla</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#111518] text-sm font-medium leading-normal" href="#">Home</a>
              <a className="text-[#111518] text-sm font-medium leading-normal" href="#">About</a>
              <a className="text-[#111518] text-sm font-medium leading-normal" href="#">Sponsorships</a>
              <a className="text-[#111518] text-sm font-medium leading-normal" href="#">Contact</a>
            </div>
            <div className="flex gap-2">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1383eb] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Login</span>
              </button>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Sign Up</span>
              </button>
            </div>
          </div>
        </header>
        
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:px-4 @[480px]:py-3">
                <div
                  className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded-xl min-h-[218px]"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDouRoNNHVoznRkO5G0xm8QzAtsPQb9eXz9UMkv8aEt5YRa2_q6zUWHYSUdjGhRaBzArNN75zCt-Dyr3eDl9x-cQncBz1tak_fFqM701SwUAGpbqFSSLv3L2Burnx5zGLVPWc-pelq024qncwsAjaYqNxWDfXwkiF0OT2_jMw8s2k4djz6uTGocHsD03pi2R1VUSvZcnVx2iW660TE1QMGTeBO-lAJu0uAr61p_Pcd4BZd9H5VDcLba_advlcA8xHZQ7VvWYLtUTEc")' }}
                ></div>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight">Contact Us</p>
                <p className="text-[#617689] text-sm font-normal leading-normal">We're here to help! Reach out to us with any questions or feedback.</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    name="name"
                    placeholder="Your Name"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617689] p-[15px] text-base font-normal leading-normal"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617689] p-[15px] text-base font-normal leading-normal"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    name="subject"
                    placeholder="Subject"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617689] p-[15px] text-base font-normal leading-normal"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] min-h-36 placeholder:text-[#617689] p-[15px] text-base font-normal leading-normal"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </label>
              </div>
              <div className="flex px-4 py-3 justify-start">
                <button
                  type="submit"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1383eb] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Send Message</span>
                </button>
              </div>
            </form>
            
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Contact Information</h2>
            <div className="flex items-center gap-4 bg-white px-4 min-h-14">
              <div className="text-[#111518] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-10" data-icon="Envelope" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"
                  ></path>
                </svg>
              </div>
              <p className="text-[#111518] text-base font-normal leading-normal flex-1 truncate">Email: support@sponzilla.com</p>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 min-h-14">
              <div className="text-[#111518] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-10" data-icon="Phone" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"
                  ></path>
                </svg>
              </div>
              <p className="text-[#111518] text-base font-normal leading-normal flex-1 truncate">Phone: (555) 123-4567</p>
            </div>
            
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Frequently Asked Questions</h2>
            <div className="flex flex-col p-4 gap-3">
              <details className="flex flex-col rounded-xl border border-[#dbe1e6] bg-white px-[15px] py-[7px] group" open>
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                  <p className="text-[#111518] text-sm font-medium leading-normal">How does SponZilla work?</p>
                  <div className="text-[#111518] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                </summary>
                <p className="text-[#617689] text-sm font-normal leading-normal pb-2">
                  SponZilla connects student clubs with brands for sponsorships. Clubs create profiles showcasing their events and initiatives, while brands browse and offer targeted sponsorship opportunities.
                </p>
              </details>
              <details className="flex flex-col rounded-xl border border-[#dbe1e6] bg-white px-[15px] py-[7px] group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                  <p className="text-[#111518] text-sm font-medium leading-normal">What types of sponsorships are available?</p>
                  <div className="text-[#111518] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                </summary>
                <p className="text-[#617689] text-sm font-normal leading-normal pb-2">
                  We offer various sponsorship types, including event sponsorships, in-kind donations, long-term partnerships, and brand collaboration opportunities tailored to your specific needs.
                </p>
              </details>
              <details className="flex flex-col rounded-xl border border-[#dbe1e6] bg-white px-[15px] py-[7px] group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                  <p className="text-[#111518] text-sm font-medium leading-normal">How can I get started?</p>
                  <div className="text-[#111518] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                </summary>
                <p className="text-[#617689] text-sm font-normal leading-normal pb-2">
                  Sign up as a club or brand, create your profile with relevant information about your organization or events, and start exploring sponsorship opportunities that match your interests.
                </p>
              </details>
            </div>
          </div>
        </div>
        
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a className="text-[#617689] text-base font-normal leading-normal min-w-40" href="#">About</a>
                <a className="text-[#617689] text-base font-normal leading-normal min-w-40" href="#">Contact</a>
                <a className="text-[#617689] text-base font-normal leading-normal min-w-40" href="#">Terms of Service</a>
                <a className="text-[#617689] text-base font-normal leading-normal min-w-40" href="#">Privacy Policy</a>
              </div>
              <p className="text-[#617689] text-base font-normal leading-normal">© 2023 SponZilla. All rights reserved.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ContactWithHeaderPage;
