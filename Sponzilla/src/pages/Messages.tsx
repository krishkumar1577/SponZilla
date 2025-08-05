import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Messages: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [messageValue, setMessageValue] = useState('');

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111518]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]">CampusConnect</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link className="text-[#111518] text-sm font-medium leading-normal" to="/brand-dashboard">Dashboard</Link>
              <Link className="text-[#111518] text-sm font-medium leading-normal" to="/browse-events">Opportunities</Link>
              <Link className="text-[#111518] text-sm font-medium leading-normal" to="/messages">Messages</Link>
              <Link className="text-[#111518] text-sm font-medium leading-normal" to="/find-clubs">Resources</Link>
            </div>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f3f4] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <div className="text-[#111518]" data-icon="Bell" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                </svg>
              </div>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnIs2LF4bk3aomsQy8uR91Vtx6MQNeC0MzKFJAOMx0zlhmk56PwXGXIl6M5QoQvuEXmmfem-5JybJ5i1_YuONaNosujsjGnIhcL5VZ_6yCIKSK7kurXMaohT9lG-Bm_-uwjdXI5sdTkFoBFRe6HuTUKj3wrNxGVBV1A-xOhNzV0vqb3GrfGYRBpFASje3SGKoFdkDUbEpPWBVb0FKhk6hRprpV0I3PQIqXcSj4d0MnNvkXTm4LfeuwaWetPWGgk1oFUqgBqBSDcQE")'}}
            ></div>
          </div>
        </header>
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-80">
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Messages</h2>
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div
                    className="text-[#617889] flex border-none bg-[#f0f3f4] items-center justify-center pl-4 rounded-l-lg border-r-0"
                    data-icon="MagnifyingGlass"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Search messages"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-full placeholder:text-[#617889] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </label>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDW2K_5zLRjkLSggpKZ8xINrOtv6H32uAV12cwit-wK0QcfQmUUn9sMWA9_o-Ei8bieNGhyyHmrSbGNu3_RydHp0WU0o7WeFCHRrZCVoJutMMEAopYXk9ob840xXrld_24i_KJLlZElGPKaLz58_gFgO3O6_VXvBxDPa_mxRJduzIxOTjy6ZZKw27gu8ZZGEvr5UlyN3MfPoUFIpmQl2Zw2iyu2G0JrYcj_vyxJPv1GdQprA5SSuuOmmKyY0P0WJw2WCLYrv1YD954")'}}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-[#111518] text-base font-medium leading-normal line-clamp-1">Brand X</p>
                <p className="text-[#617889] text-sm font-normal leading-normal line-clamp-2">Hey, just wanted to follow up on our last conversation...</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDnLNxhKOir9d_PFHH8cWhXzoY-91Y-NEZXFqND7xzyZG0WViIvUFib8MZFViYIt8ZKtyUsIopbWiLlOwPHow5b4Mi4EiaLIOynX_LYGgCmhUP2sHTxFnh-QFyl-ZFxcn3aTMVXJVk6dD-EF-3N1rnW0WppLeSpWUT6L0w0lXtca-GbIj-jQWBYzO7YNi1NZtbm2gZjm8EhPz53A7wI7sN3qEcyYAOa_OUhb3mq6jPJazBuDoWx2owTYjvgUWS3HLhf85nctY8bTzo")'}}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-[#111518] text-base font-medium leading-normal line-clamp-1">Club Y</p>
                <p className="text-[#617889] text-sm font-normal leading-normal line-clamp-2">Thanks for your interest! We're excited to explore...</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCj9VlEXFnAtcvFqGA7_mmTdcBq9kKNbFLVJ6F2RPHJLUU-BhAkHcgtr3VrG-Gc_EpVsH3sXs_Am2rK-9E_xbu_PWvxkxmo4Xe5vW-lfdxmEMXRO9r5Ff_fL8dtvlszr-S6dXR_EPcNFLTOsOHj6q1zHeMOPHJzycNh2RNEU07NFHF9Aqx7srfgr_9j4XvHYTRDVEduhRvjPfpWb3EcWuOeDY7tTWErs0imkZF6XPmFI-FEX_LRFwWp0q67opfRH8rLoVqEDUiYbzY")'}}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-[#111518] text-base font-medium leading-normal line-clamp-1">Brand Z</p>
                <p className="text-[#617889] text-sm font-normal leading-normal line-clamp-2">Sounds great! Let's schedule a call to discuss further.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMfvNX2AiCO0wJBQFnPu2L4n-mJqeaDkWwAEiTNO5JfJX56eRBXKYO17feULjcAEJYenCmI9nCPFGelMwwjkuyBnB5Z1tcPeufHOWR1mvxp2Z2BpOIbG112gyw2zSaChJpF2Tv6dBTGNtjy7a0_4K5cH15E64DcNTIp3_bUlvnyBSR_ZfDXw7tTdM4_MTxm9kQgdKsjSQnbZGe9ifG3NfMfzm43rOxDxmVT07WBzNq1-P30eyJGDbP7VP-JfrXh07Q1x_DRG6SzAA")'}}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-[#111518] text-base font-medium leading-normal line-clamp-1">Club A</p>
                <p className="text-[#617889] text-sm font-normal leading-normal line-clamp-2">We're looking for opportunities to support campus events...</p>
              </div>
            </div>
          </div>
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72">Brand X</p>
            </div>
            <div className="flex items-end gap-3 p-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCR7nKZIgB_-LIBh2_vKPFbTlOiCCmrr5oL4HIINGtLA95l27YG90UFo4SRCy3O0HMQ3RxjvgiHmp-cOO22xpOO-4-PSYzmddI4C2dj9zEE1PlECkbwlJDKJ0Dm5InazR9nAB5FPEn-VvRF-RMnDeyF2UXpGxqVf7Kze1v7OrRSp6gySaTUshv5SaxZNz1jNxtJ1uGZSGLpns1kPGxG214zPK45o75hU4tgJCdU7HMi7G1qwRw_Wyvyi7kn06U8RpVFm0FzpxoyRhI")'}}
              ></div>
              <div className="flex flex-1 flex-col gap-1 items-start">
                <p className="text-[#617889] text-[13px] font-normal leading-normal max-w-[360px]">Brand X</p>
                <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-lg px-4 py-3 bg-[#f0f3f4] text-[#111518]">
                  Hey, just wanted to follow up on our last conversation. Are you still interested in partnering for your upcoming event?
                </p>
              </div>
            </div>
            <div className="flex items-end gap-3 p-4 justify-end">
              <div className="flex flex-1 flex-col gap-1 items-end">
                <p className="text-[#617889] text-[13px] font-normal leading-normal max-w-[360px] text-right">You</p>
                <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-lg px-4 py-3 bg-[#138deb] text-white">
                  Yes, we are! We're very excited about the possibilities. Can we discuss the next steps?
                </p>
              </div>
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQEpZVnk9S4uvk8W9xTezEiHSDok-Fc4hl9I33_QNbGNP_vTdAsldr_Pdoo9cBuI9yskRPaSIJIYKo9kg4Z7dRHReMdcpTOnz1xpvsVAuNKJeF3VttRt6vd7NpGvMRg-XqlBQqylPAIUDb7TIjoVWF6W8Y3CfwwOFfiq1CI3ESXGEb9DICA9UVgVzQQtPg9Pv0HunlhXHPkh0QhLSHzinlvwBtHAVpqxsV35FfBxxzwuVL4edSRusv2rNLIHdlP-9rMzuiAEg1D_g")'}}
              ></div>
            </div>
            <div className="flex items-center px-4 py-3 gap-3 @container">
              <label className="flex flex-col min-w-40 h-12 flex-1">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <input
                    placeholder="Write a message..."
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-full placeholder:text-[#617889] px-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                    value={messageValue}
                    onChange={(e) => setMessageValue(e.target.value)}
                  />
                  <div className="flex border-none bg-[#f0f3f4] items-center justify-center pr-4 rounded-r-lg border-l-0 !pr-2">
                    <div className="flex items-center gap-4 justify-end">
                      <div className="flex items-center gap-1">
                        <button className="flex items-center justify-center p-1.5">
                          <div className="text-[#617889]" data-icon="Image" data-size="20px" data-weight="regular">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                              <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"></path>
                            </svg>
                          </div>
                        </button>
                      </div>
                      <button
                        className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#138deb] text-white text-sm font-medium leading-normal hidden @[480px]:block"
                        onClick={() => {
                          if (messageValue.trim()) {
                            // Handle sending message
                            console.log('Sending message:', messageValue);
                            setMessageValue('');
                          }
                        }}
                      >
                        <span className="truncate">Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
