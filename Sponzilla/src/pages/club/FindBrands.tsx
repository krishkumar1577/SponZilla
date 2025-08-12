import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SmartNavbar } from '../../components/layout/Navbar';

const FindBrands: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <SmartNavbar />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">Find Brands</p>
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">Explore brands that align with your club's mission and values.</p>
              </div>
            </div>
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div
                    className="text-[#617989] flex border-none bg-[#f0f3f4] items-center justify-center pl-4 rounded-l-xl border-r-0"
                    data-icon="MagnifyingGlass"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Search for brands"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f3f4] focus:border-none h-full placeholder:text-[#617989] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </label>
            </div>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f3f4] pl-4 pr-2">
                <p className="text-[#111518] text-sm font-medium leading-normal text-left">Industry</p>
                <div className="text-[#111518]" data-icon="CaretDown" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </div>
              </button>
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f3f4] pl-4 pr-2">
                <p className="text-[#111518] text-sm font-medium leading-normal text-left">Values</p>
                <div className="text-[#111518]" data-icon="CaretDown" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </div>
              </button>
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f3f4] pl-4 pr-2">
                <p className="text-[#111518] text-sm font-medium leading-normal text-left">Sponsorship History</p>
                <div className="text-[#111518]" data-icon="CaretDown" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </div>
              </button>
            </div>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Featured Brands</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZ_wjm0d2FYTuzgQBZVHMvvAhlee2P3dqDOMmF1zW9Oskt6sefuIGpEOuv4ujdR6Th38ij-JGymOafq9Z-NDhl2LJF1iUWLTNJx7MU_GI-hzOy9H0t-4YNqBSLYoLVv56x8tMmgdMa7wW1pD1SNLEkKBqsMw6_uS7Du6Q_0a3yfvrugbcK5qF9yOJLTlnkVcCWvkpab4dfVSZ22VGp_Uz3zPrZ80YHnhCzhxRmdKi6ZuRL2uxoBfktGndzsBGzC-CRWo6Q4Eybao0")' }}
                ></div>
                <div>
                  <p className="text-[#111518] text-base font-medium leading-normal text-left">Tech Innovators Inc.</p>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">Leading tech company focused on innovation.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAIjmIicJfVoQrUsJmReOEZIWaF_sywqDBZbKYC5_nSpW25rg7wcGMbD7sY0dGMPdoO0o6Wb7vWKmBciSAvcsVvmK8UvA1KHxnriEtLqliPTnpoN-ItyFZ5Ek56mXyBhE3Xl5DooBtm3Hhb9ItvgS-lqM9kh2BiLgFAUnj4t7Kwb3BtmBpoIbWD7y8SV7xaRNzsw2vXIBDkkKeWwvNIT5G2VISgqpBVq1IjRzsT0cM42YJOG5fZ-KOBcu8I4pRMvSS0OxVhgVlULHo")' }}
                ></div>
                <div>
                  <p className="text-[#111518] text-base font-medium leading-normal text-left">EcoSolutions Co.</p>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">Sustainable solutions for a greener future.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDBftH1P3qPOqO2C-BGmThU0Vvxia4kYNNOQyfUF2uw-0FTlWeVmnOKmRZp91-SCzjN0GA0L2sPIezK8jskGAG70NvTs4LAUhta_frAv66TmzXJcYSD0BYmMM3QZq_RFydoAWsl7tnkoSAnWctsNonLrMWRag8FoaOIC_5cTHU-dfsLWyutN_nUcx3spUWvt-14fz9pl6pYXyESAYZGZTgWX0UhLBC_Je3mvxDT0IJ9L_Zh7hFuSacdmpaesjPVBFe3IY0CC0KYlao")' }}
                ></div>
                <div>
                  <p className="text-[#111518] text-base font-medium leading-normal text-left">Creative Minds Ltd.</p>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">Agency specializing in creative marketing.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCy9Y76wLUlAt_SFpJVOodatwoWIHRe8eAPLCGPcC7GihA0cVf8sG-8dj0XqbSa1lhIcQi8MADr5k9QMKM597MTC-tf4-EJJvXgY7L77nipMRxTRNtRlh9BZ-SCNIJXT3bb4HKYYhFRPGxyOMumS_JKu8awbBN0s3jGc7PZ0NBj6G2nK5mW0UEoAcQRsxKZ7QKtAWgTYeyIUWjVumtrAaJKfGY5bPUth7orTQALw_zuxATV3mh3t7Vl9TGGM0sfjPzBMVfK9ipQuWM")' }}
                ></div>
                <div>
                  <p className="text-[#111518] text-base font-medium leading-normal text-left">Global Reach Corp.</p>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">International corporation with a global presence.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAPk_1z23Nyhg5MDT5WggM9eZLo3Sm96nOJ7Lm0HBOkOFS_9_mCd40r-ie9Zh1cos_T2kaR2eCGDfkt7mt2_cPExL1UCQCBq26lRdzUgC6JYsfe2BMozSfpNz1nayvt3j_Eu8UzxMLFwJEPpVlMaf4F-pfEkmUKTm3jtMwwpyX1UjIofrgq69sIX1X2W9Cj93q5noyjtghVkAK3seBPV1AGnyZKNmWwUsvZrgQPQBWnl6kkqw_jq8po4ACLV7U_Uyes6UDvsMHp7RA")' }}
                ></div>
                <div>
                  <p className="text-[#111518] text-base font-medium leading-normal text-left">Health & Wellness Group</p>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">Promoting health and wellness initiatives.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDqa42RUMF03VCB01CLRkNiKnYown9zLkOmsSyN8081TBBnDIcAqU0MXispyd2RjAx9ClGvdfXQC0ycw9O_PgRdKIPgyXFGwUMrueBN8hTyQ6UorbiInLKcM2nH6gzx9QdZPSaBl105H1ANGzsHqiQDTga9ijSeVMB19NtolBVV3F708xyduaZxQ8iCTXDvSD6vfSGlVnOM9MmAJ5ROgp6m3ZBKbug8jRLLYFYIsre4BtftaHQQFKUlAWS2M-MbshxXbWMda62KVJA")' }}
                ></div>
                <div>
                  <p className="text-[#111518] text-base font-medium leading-normal text-left">Community Builders Inc.</p>
                  <p className="text-[#617989] text-sm font-normal leading-normal text-left">Organization dedicated to community development.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center p-4">
              <Link to="#" className="flex size-10 items-center justify-center">
                <div className="text-[#111518]" data-icon="CaretLeft" data-size="18px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                  </svg>
                </div>
              </Link>
              <Link className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-[#111518] rounded-full bg-[#f0f3f4]" to="#">1</Link>
              <Link className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111518] rounded-full" to="#">2</Link>
              <Link className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111518] rounded-full" to="#">3</Link>
              <Link className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111518] rounded-full" to="#">4</Link>
              <Link className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#111518] rounded-full" to="#">5</Link>
              <Link to="#" className="flex size-10 items-center justify-center">
                <div className="text-[#111518]" data-icon="CaretRight" data-size="18px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindBrands;
