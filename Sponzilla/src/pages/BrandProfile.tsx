import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileDropdown } from '../components/ui';

const BrandProfilePage: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111518]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] text-left">SponZilla</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link to="/browse-events" className="text-[#111518] text-sm font-medium leading-normal text-left">Event Browser</Link>
              <Link to="/brand-dashboard" className="text-[#111518] text-sm font-medium leading-normal text-left">Analytics Dashboard</Link>
              <Link to="/find-clubs" className="text-[#111518] text-sm font-medium leading-normal text-left">Find Clubs</Link>
            </div>
            <div className="flex gap-2">
              <Link to="/messages" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f0f3f4] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                <div className="text-[#111518]" data-icon="ChatCircleDots" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              </Link>
              <Link to="/help" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f0f3f4] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                <div className="text-[#111518]" data-icon="Question" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              </Link>
            </div>
            <ProfileDropdown />
          </div>
        </header>

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Hero Section */}
            <div className="@container">
              <div className="@[480px]:px-4 @[480px]:py-3">
                <div
                  className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded-xl min-h-[218px]"
                  style={{
                    backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDu2YzSnph_D_t-Lh7tTcjgyCd7s11hztitPMFNE6FiiY3UbX2lME17QE9um35AmbQFJ89jBkkL5jgykC0ZGtqUS0O8AfnSamOXdDQHO-SK7I6njkSFXB1U-zmAWQy6-sNNIPwaLpN8I_88W3B0DbFMDuObZX5LvohyWY_vHcQMwUWpCkHgUxDEeMlD0gxSfCSEHMEgGOdGrLebmQxFtAJsbdCFWA7jluVTx8tl8tl2C4KdicNfm-343QoZcobwQCR9ZDf64m6OBO4")'
                  }}
                >
                  <div className="flex p-4">
                    <p className="text-white tracking-light text-[28px] font-bold leading-tight text-left">Tech Innovators Inc.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="flex p-4 @container">
              <div className="flex w-full flex-col gap-4 items-start">
                <div className="flex gap-4 flex-col items-start">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl min-h-32 w-32"
                    style={{
                      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAGUhxgmU5JfbQ9qOGXCKJag2XapzLLPW4F3-eD4YOj9CadMNsNVEIEeaaFp4EutHDSvxBLRgpKcUedxVyB39uW0LE0-tb6WlDfF9BdYukGjQKD5gcykc2RJHXyHcLBJRpruLZGjsy4RPz5xFLuTuS5w-E-cnC4ay7c0-OUPa_NbIqJIYqbKiOJ3uGTtYSuyczDDIqh8lEGYtbUnZFppO0pxD2ED0ZhTdyAS0EU1JRTEDCYj2C8wJicArIqXPjSRAbXx1uVtT_rw3Y")'
                    }}
                  ></div>
                  <div className="flex flex-col">
                    <p className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] text-left">Tech Innovators Inc.</p>
                    <p className="text-[#617989] text-base font-normal leading-normal text-left">Industry: Technology</p>
                    <p className="text-[#617989] text-base font-normal leading-normal text-left">
                      Tech Innovators Inc. is a leading technology company specializing in software solutions for education. We partner with student organizations to provide
                      resources and support for their events and initiatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Sponsorships */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Current Sponsorships</h2>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="table-current-sponsorships-column-120 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Sponsorship
                      </th>
                      <th className="table-current-sponsorships-column-240 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        University
                      </th>
                      <th className="table-current-sponsorships-column-360 px-4 py-3 text-left text-[#111518] w-60 text-sm font-medium leading-normal">Status</th>
                      <th className="table-current-sponsorships-column-480 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-current-sponsorships-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">
                        Hackathon 2023
                      </td>
                      <td className="table-current-sponsorships-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                        State University
                      </td>
                      <td className="table-current-sponsorships-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Active</span>
                        </button>
                      </td>
                      <td className="table-current-sponsorships-column-480 h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                        <div className="flex items-center gap-3">
                          <div className="w-[88px] overflow-hidden rounded-sm bg-[#dbe1e6]">
                            <div className="h-1 rounded-full bg-[#111518]" style={{ width: '85.2273%' }}></div>
                          </div>
                          <p className="text-[#111518] text-sm font-medium leading-normal text-left">75</p>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-current-sponsorships-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">
                        Innovation Challenge
                      </td>
                      <td className="table-current-sponsorships-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                        City College
                      </td>
                      <td className="table-current-sponsorships-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Active</span>
                        </button>
                      </td>
                      <td className="table-current-sponsorships-column-480 h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                        <div className="flex items-center gap-3">
                          <div className="w-[88px] overflow-hidden rounded-sm bg-[#dbe1e6]">
                            <div className="h-1 rounded-full bg-[#111518]" style={{ width: '56.8182%' }}></div>
                          </div>
                          <p className="text-[#111518] text-sm font-medium leading-normal text-left">50</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Past Sponsorships */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Past Sponsorships</h2>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#dbe1e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="table-past-sponsorships-column-120 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Sponsorship
                      </th>
                      <th className="table-past-sponsorships-column-240 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        University
                      </th>
                      <th className="table-past-sponsorships-column-360 px-4 py-3 text-left text-[#111518] w-60 text-sm font-medium leading-normal">Status</th>
                      <th className="table-past-sponsorships-column-480 px-4 py-3 text-left text-[#111518] w-[400px] text-sm font-medium leading-normal">
                        Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-past-sponsorships-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">
                        Tech Fair 2022
                      </td>
                      <td className="table-past-sponsorships-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                        State University
                      </td>
                      <td className="table-past-sponsorships-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Completed</span>
                        </button>
                      </td>
                      <td className="table-past-sponsorships-column-480 h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                        <div className="flex items-center gap-3">
                          <div className="w-[88px] overflow-hidden rounded-sm bg-[#dbe1e6]">
                            <div className="h-1 rounded-full bg-[#111518]" style={{ width: '100%' }}></div>
                          </div>
                          <p className="text-[#111518] text-sm font-medium leading-normal text-left">90</p>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-past-sponsorships-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">
                        Coding Workshop
                      </td>
                      <td className="table-past-sponsorships-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                        City College
                      </td>
                      <td className="table-past-sponsorships-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Completed</span>
                        </button>
                      </td>
                      <td className="table-past-sponsorships-column-480 h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                        <div className="flex items-center gap-3">
                          <div className="w-[88px] overflow-hidden rounded-sm bg-[#dbe1e6]">
                            <div className="h-1 rounded-full bg-[#111518]" style={{ width: '90.9091%' }}></div>
                          </div>
                          <p className="text-[#111518] text-sm font-medium leading-normal text-left">80</p>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-t border-t-[#dbe1e6]">
                      <td className="table-past-sponsorships-column-120 h-[72px] px-4 py-2 w-[400px] text-[#111518] text-sm font-normal leading-normal text-left">
                        Startup Pitch Competition
                      </td>
                      <td className="table-past-sponsorships-column-240 h-[72px] px-4 py-2 w-[400px] text-[#617989] text-sm font-normal leading-normal text-left">
                        Regional University
                      </td>
                      <td className="table-past-sponsorships-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-medium leading-normal w-full">
                          <span className="truncate">Completed</span>
                        </button>
                      </td>
                      <td className="table-past-sponsorships-column-480 h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                        <div className="flex items-center gap-3">
                          <div className="w-[88px] overflow-hidden rounded-sm bg-[#dbe1e6]">
                            <div className="h-1 rounded-full bg-[#111518]" style={{ width: '68.1818%' }}></div>
                          </div>
                          <p className="text-[#111518] text-sm font-medium leading-normal text-left">60</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @container(max-width:120px){.table-current-sponsorships-column-120{display: none;}}
        @container(max-width:240px){.table-current-sponsorships-column-240{display: none;}}
        @container(max-width:360px){.table-current-sponsorships-column-360{display: none;}}
        @container(max-width:480px){.table-current-sponsorships-column-480{display: none;}}
        @container(max-width:120px){.table-past-sponsorships-column-120{display: none;}}
        @container(max-width:240px){.table-past-sponsorships-column-240{display: none;}}
        @container(max-width:360px){.table-past-sponsorships-column-360{display: none;}}
        @container(max-width:480px){.table-past-sponsorships-column-480{display: none;}}
      `}</style>
    </div>
  );
};

export default BrandProfilePage;
