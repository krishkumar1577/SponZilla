import React, { useState, useEffect } from 'react';
import { SmartNavbar } from '../../components/layout/Navbar';
import { analyticsAPI, type BrandAnalytics } from '../../services/api';

const BrandDashboardPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<BrandAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await analyticsAPI.getBrandAnalytics();
        setAnalytics(response.data);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error('Analytics error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Format numbers for display
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const formatCurrency = (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatGrowth = (growth: number): { text: string; color: string } => {
    const sign = growth >= 0 ? '+' : '';
    const color = growth >= 0 ? '#078838' : '#e73908';
    return { text: `${sign}${growth}%`, color };
  };

  if (loading) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
          <SmartNavbar />
          <div className="flex items-center justify-center flex-1">
            <p className="text-[#617989] text-lg">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
          <SmartNavbar />
          <div className="flex items-center justify-center flex-1">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Brand Dashboard Header */}
        <SmartNavbar />        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Dashboard Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">Dashboard</p>
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">Track your sponsorship performance and optimize your campaigns.</p>
              </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f3f4]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Total Reach</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">
                  {formatNumber(analytics.performance.totalReach)}+
                </p>
                <p className="text-base font-medium leading-normal text-left" style={{ color: formatGrowth(analytics.growth.reachGrowth).color }}>
                  {formatGrowth(analytics.growth.reachGrowth).text}
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f3f4]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Engagement Rate</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">
                  {analytics.performance.engagementRate}%
                </p>
                <p className="text-base font-medium leading-normal text-left" style={{ color: formatGrowth(analytics.growth.engagementGrowth).color }}>
                  {formatGrowth(analytics.growth.engagementGrowth).text}
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f3f4]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">ROI</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">
                  {analytics.performance.roi}%
                </p>
                <p className="text-base font-medium leading-normal text-left" style={{ color: formatGrowth(analytics.growth.roiGrowth).color }}>
                  {formatGrowth(analytics.growth.roiGrowth).text}
                </p>
              </div>
            </div>

            {/* Investment Overview Section - NEW */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Investment Overview</h2>
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Total Investment</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">
                  {formatCurrency(analytics.investment.totalInvestment)}
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Active Campaigns</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">
                  {analytics.investment.activeCampaigns}
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Pending Proposals</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">
                  {analytics.investment.pendingProposals}
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe1e6]">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Total Sponsored</p>
                <p className="text-[#111518] tracking-light text-2xl font-bold leading-tight text-left">
                  {analytics.investment.totalSponsored}
                </p>
              </div>
            </div>

            {/* Performance Overview */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Performance Overview</h2>
            <div className="flex flex-wrap gap-4 px-4 py-6">
              {/* Reach Over Time Chart */}
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#dbe1e6] p-6">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Reach Over Time</p>
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight truncate text-left">
                  {formatGrowth(analytics.growth.reachGrowth).text} from last month
                </p>
                <div className="flex gap-1">
                  <p className="text-[#617989] text-base font-normal leading-normal text-left">Last 3 Months</p>
                  <p className="text-base font-medium leading-normal text-left" style={{ color: formatGrowth(analytics.growth.reachGrowth).color }}>
                    {formatGrowth(analytics.growth.reachGrowth).text}
                  </p>
                </div>
                <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
                  <svg width="100%" height="148" viewBox="-3 0 478 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                      fill="url(#paint0_linear_1131_5935)"
                    ></path>
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                      stroke="#617989"
                      strokeWidth="3"
                      strokeLinecap="round"
                    ></path>
                    <defs>
                      <linearGradient id="paint0_linear_1131_5935" x1="236" y1="1" x2="236" y2="149" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#f0f3f4"></stop>
                        <stop offset="1" stopColor="#f0f3f4" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="flex justify-around">
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Jan</p>
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Feb</p>
                    <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left">Mar</p>
                  </div>
                </div>
              </div>

              {/* Top Performing Categories - UPDATED */}
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#dbe1e6] p-6">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Top Performing Categories</p>
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight truncate text-left">
                  {formatGrowth(analytics.growth.engagementGrowth).text} from last month
                </p>
                <div className="flex gap-1">
                  <p className="text-[#617989] text-base font-normal leading-normal text-left">Last 3 Months</p>
                  <p className="text-base font-medium leading-normal text-left" style={{ color: formatGrowth(analytics.growth.engagementGrowth).color }}>
                    {formatGrowth(analytics.growth.engagementGrowth).text}
                  </p>
                </div>
                <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3">
                  {analytics.categories.slice(0, 3).map((category, index) => (
                    <React.Fragment key={category.name}>
                      <div 
                        className="border-[#617989] bg-[#f0f3f4] border-t-2 w-full" 
                        style={{ height: `${category.performance}%` }}
                      ></div>
                      <p className="text-[#617989] text-[13px] font-bold leading-normal tracking-[0.015em] text-left truncate max-w-full">
                        {category.name}
                      </p>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Audience Demographics - NEW */}
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Audience Demographics</h2>
            <div className="flex flex-wrap gap-4 px-4 py-6">
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#dbe1e6] p-6">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Age Distribution</p>
                <div className="flex flex-col gap-4 py-4">
                  {analytics.demographics.ageGroups.map((group) => (
                    <div key={group.range} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-[#111518] text-sm font-medium">{group.range}</span>
                          <span className="text-[#617989] text-sm">{group.percentage}%</span>
                        </div>
                        <div className="w-full bg-[#f0f3f4] rounded-full h-2">
                          <div 
                            className="bg-[#617989] h-2 rounded-full" 
                            style={{ width: `${group.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#dbe1e6] p-6">
                <p className="text-[#111518] text-base font-medium leading-normal text-left">Target Audience</p>
                <div className="flex flex-col gap-3 py-4">
                  {analytics.demographics.primaryAudience.map((audience, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-[#617989] rounded-full"></div>
                      <span className="text-[#111518] text-base capitalize">{audience}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-[#dbe1e6]">
                  <p className="text-[#111518] text-sm font-medium mb-2">Engagement Rate by Category:</p>
                  <div className="space-y-2">
                    {analytics.categories.slice(0, 2).map((category) => (
                      <div key={category.name} className="flex justify-between">
                        <span className="text-[#617989] text-sm capitalize">{category.name}</span>
                        <span className="text-[#111518] text-sm font-medium">{category.performance}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a className="text-[#617989] text-base font-normal leading-normal min-w-40 text-left" href="#">Terms of Service</a>
                <a className="text-[#617989] text-base font-normal leading-normal min-w-40 text-left" href="#">Privacy Policy</a>
              </div>
              <p className="text-[#617989] text-base font-normal leading-normal text-left">@2025 SponZilla. All rights reserved.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BrandDashboardPage;
