import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FindClubsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [headerSearchTerm, setHeaderSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleHeaderSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderSearchTerm(e.target.value);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f2f3] px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-[#131516]">
              <div className="size-4">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-[#131516] text-lg font-bold leading-tight tracking-[-0.015em]">SponZilla</h2>
            </div>
            <div className="flex items-center gap-9">
              <Link to="/" className="text-[#131516] text-sm font-medium leading-normal">Home</Link>
              <Link to="/browse-events" className="text-[#131516] text-sm font-medium leading-normal">Explore</Link>
              <Link to="/brand-dashboard" className="text-[#131516] text-sm font-medium leading-normal">My Sponsorships</Link>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <label className="flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div
                  className="text-[#6b7780] flex border-none bg-[#f1f2f3] items-center justify-center pl-4 rounded-l-xl border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                    ></path>
                  </svg>
                </div>
                <input
                  placeholder="Search"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#131516] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f3] focus:border-none h-full placeholder:text-[#6b7780] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  value={headerSearchTerm}
                  onChange={handleHeaderSearchChange}
                />
              </div>
            </label>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f1f2f3] text-[#131516] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <div className="text-[#131516]" data-icon="Bell" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"
                  ></path>
                </svg>
              </div>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAhDq4EHwfKyUzsOn0UZcmyz-GUEYO51izwsL3YBH0m4y03oyyoLuX0sIgIHpvXlnkjnkIwV7GzZNr4oePwc9Z2_7P06sV3ynNFp9M77lp90_sUQg2miBjF0exGxL8sg6jprNoBN8yopX4Lam65pePmDm45a1TVwXzRljubA-zKbUVrrUtA4zL6PxZdUDGz_foXQVm_vkYawE_342R4369y7TRT1447KAxWoQFFb3hN0wWUeEmUD6D_2fTqSN3DJmqkLQYWC4ovKkc")' }}
            ></div>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#131516] tracking-light text-[32px] font-bold leading-tight text-left">Explore Clubs</p>
                <p className="text-[#6b7780] text-sm font-normal leading-normal text-left">Discover student organizations aligned with your brand's values and goals.</p>
              </div>
            </div>
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div
                    className="text-[#6b7780] flex border-none bg-[#f1f2f3] items-center justify-center pl-4 rounded-l-xl border-r-0"
                    data-icon="MagnifyingGlass"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Search for clubs"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#131516] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f3] focus:border-none h-full placeholder:text-[#6b7780] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </label>
            </div>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f1f2f3] pl-4 pr-2">
                <p className="text-[#131516] text-sm font-medium leading-normal">Event Type</p>
                <div className="text-[#131516]" data-icon="CaretDown" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </div>
              </button>
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f1f2f3] pl-4 pr-2">
                <p className="text-[#131516] text-sm font-medium leading-normal">Audience Reach</p>
                <div className="text-[#131516]" data-icon="CaretDown" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </div>
              </button>
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f1f2f3] pl-4 pr-2">
                <p className="text-[#131516] text-sm font-medium leading-normal">University</p>
                <div className="text-[#131516]" data-icon="CaretDown" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </div>
              </button>
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f1f2f3] pl-4 pr-2">
                <p className="text-[#131516] text-sm font-medium leading-normal">Interests</p>
                <div className="text-[#131516]" data-icon="CaretDown" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </div>
              </button>
            </div>
            <h2 className="text-[#131516] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Featured Clubs</h2>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-xl">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#6b7780] text-sm font-normal leading-normal text-left">Tech</p>
                    <p className="text-[#131516] text-base font-bold leading-tight text-left">InnovateU Tech Society</p>
                    <p className="text-[#6b7780] text-sm font-normal leading-normal text-left">A hub for tech enthusiasts at InnovateU, hosting workshops, hackathons, and networking events.</p>
                  </div>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#f1f2f3] text-[#131516] text-sm font-medium leading-normal w-fit">
                    <span className="truncate">View Profile</span>
                  </button>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfSf1gU25ppQUza9PK2dg1Ohvn2hYL7hf3LRfbM2oLzIXQsjkSfkd9CZA2YmA8s9zYtCK_Vyyjiw19JGyVZxxGDT_-Inc5gaSRq3ELOWx8pv6BpoQv7rH8zE5iuBDVIxnUcjlY4FaLsl2t7I-CIfX5mZU_hHld-wcxGrQP3WCV6stp70bG6P9Yoe-f1CY-1PAK_SdF_tNZQJr4_tbjPcu8XjqoR2m0hEaBmvZ-t0fz7xIU8FNj3BLOgB3PjKEmG8W1VZpH0T0boVY")' }}
                ></div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-xl">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#6b7780] text-sm font-normal leading-normal text-left">Arts</p>
                    <p className="text-[#131516] text-base font-bold leading-tight text-left">Creative Minds Collective</p>
                    <p className="text-[#6b7780] text-sm font-normal leading-normal text-left">
                      A vibrant community of artists, musicians, and writers at State University, showcasing talent and fostering collaboration.
                    </p>
                  </div>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#f1f2f3] text-[#131516] text-sm font-medium leading-normal w-fit">
                    <span className="truncate">View Profile</span>
                  </button>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBapPeMMheiCa5KP7IZUjP1kf0hOZ2-zjp-ZyJhk_O3NTH3EJsd3Sok1DlpH0nhAjsda0s2I9zLGyOGKBQNvXSNtQCTN8f6x0h4cwYUDRUrsQWCrSJT4WFEVNA0NmE7HH52elKRGuy6_wwGlkc4JmVGOv0WyJW-ZWaBmi38otxvCNHoEHyv_wm1KrAcnlWO2bW7JSlEmuyO3GhaKwwv2aY3gW4r5TlRLnBQlRL2CDvip_bbeNh9LEEwnxlmAWBMhv2-hoUdDY9qitQ")' }}
                ></div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-xl">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#6b7780] text-sm font-normal leading-normal text-left">Sports</p>
                    <p className="text-[#131516] text-base font-bold leading-tight text-left">Campus Athletics Club</p>
                    <p className="text-[#6b7780] text-sm font-normal leading-normal text-left">
                      Promoting sports and fitness at City College, organizing tournaments and training sessions for various sports.
                    </p>
                  </div>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#f1f2f3] text-[#131516] text-sm font-medium leading-normal w-fit">
                    <span className="truncate">View Profile</span>
                  </button>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCcXMq4PY2Wcnx17NcdZh0auOr7PBqYzblPQzAxbj68OQ4XjLGhyG2jHRWHGwwng3a1bdoHLoKIHlTiYaQhxEuKdze-T7o43RTZ_37XWPBPCzM-2TMFLPSs0Qt0ALa80F8p4XVHLp53GT6duC6oT4a5nHOgaDc6eb9lmJAmbXSuaXDVu_Pc4DNfDiymvZpgGG79xYq80eAyxjLg8kEmboEcAj76g_e-ZL8mHDKlZEc1oZJPWrEf1IT9_Go6Nhn6htlaM6q4c4CvxEE")' }}
                ></div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-xl">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#6b7780] text-sm font-normal leading-normal text-left">Community</p>
                    <p className="text-[#131516] text-base font-bold leading-tight text-left">Volunteer United</p>
                    <p className="text-[#6b7780] text-sm font-normal leading-normal text-left">
                      Dedicated to community service at Metro University, organizing volunteer events and social impact initiatives.
                    </p>
                  </div>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#f1f2f3] text-[#131516] text-sm font-medium leading-normal w-fit">
                    <span className="truncate">View Profile</span>
                  </button>
                </div>
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdmk-Nzz88oPPCM7Z7FGF2LnMB81ngQIVanTghdwvYqhdaF6-vl4M4mLrKTx8HaeYv9dA0PuxY6rJQFFtY2zVBbGaB9XquQG9r21zPX_UlXdgsSz3vrjH9_eTybZ16doKyQVDAv5mviKmh7JAY1sw9Y858CGKpQA4sHM_bd447CLjeLAI-zxOEPVjQ5XWoRUaOZZWhXX-o7cVuguGofASRepvNsnjSOgu1mCHZcHik2bM-FB_G37bVYMwFXyYPsBgdcI3-Da2Rw-M")' }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-center p-4">
              <a href="#" className="flex size-10 items-center justify-center">
                <div className="text-[#131516]" data-icon="CaretLeft" data-size="18px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                  </svg>
                </div>
              </a>
              <a className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-[#131516] rounded-full bg-[#f1f2f3]" href="#">1</a>
              <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#131516] rounded-full" href="#">2</a>
              <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#131516] rounded-full" href="#">3</a>
              <span className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#131516] rounded-full">...</span>
              <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#131516] rounded-full" href="#">10</a>
              <a href="#" className="flex size-10 items-center justify-center">
                <div className="text-[#131516]" data-icon="CaretRight" data-size="18px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindClubsPage;
