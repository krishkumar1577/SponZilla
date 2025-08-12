import React from 'react';
import { SmartNavbar } from '../../components/layout/Navbar';

const BrandProfilePage: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <SmartNavbar />

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
