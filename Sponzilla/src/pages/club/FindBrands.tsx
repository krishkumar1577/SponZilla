import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SmartNavbar } from '../../components/layout/Navbar';
import { profilesAPI } from '../../services/api';
import type { BrandProfile } from '../../services/api';

const FindBrands: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<BrandProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedBudgetRange, setSelectedBudgetRange] = useState<string>('');
  const [selectedEventType] = useState<string>('');
  const [selectedAudience, setSelectedAudience] = useState<string>('');
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showValuesDropdown, setShowValuesDropdown] = useState(false);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedIndustry, selectedBudgetRange, selectedEventType, selectedAudience, brands]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowIndustryDropdown(false);
      setShowValuesDropdown(false);
      setShowHistoryDropdown(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await profilesAPI.getAllBrands();
      const brandsData = response.brands || [];
      setBrands(brandsData);
    } catch (err: any) {
      setError(err.message || 'Failed to load brands');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = brands;
    
    // Search term filtering
    if (searchTerm) {
      filtered = filtered.filter(brand => 
        brand.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (brand.description && brand.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Industry filtering
    if (selectedIndustry) {
      filtered = filtered.filter(brand => 
        brand.industry.toLowerCase().includes(selectedIndustry.toLowerCase())
      );
    }
    
    // Budget range filtering
    if (selectedBudgetRange) {
      filtered = filtered.filter(brand => {
        if (!brand.sponsorshipBudget || typeof brand.sponsorshipBudget.max !== 'number') {
          return false;
        }
        const maxBudget = brand.sponsorshipBudget.max;
        switch (selectedBudgetRange) {
          case 'Small ($1-$5K)':
            return maxBudget >= 1000 && maxBudget <= 5000;
          case 'Medium ($5K-$20K)':
            return maxBudget >= 5000 && maxBudget <= 20000;
          case 'Large ($20K-$50K)':
            return maxBudget >= 20000 && maxBudget <= 50000;
          case 'Very Large ($50K+)':
            return maxBudget > 50000;
          default:
            return true;
        }
      });
    }
    
    // Event type filtering
    if (selectedEventType) {
      filtered = filtered.filter(brand => 
        brand.preferredEventTypes && brand.preferredEventTypes.length > 0 &&
        brand.preferredEventTypes.some(type => 
          type.toLowerCase().includes(selectedEventType.toLowerCase())
        )
      );
    }
    
    // Audience filtering
    if (selectedAudience) {
      filtered = filtered.filter(brand => 
        brand.targetAudience && brand.targetAudience.length > 0 &&
        brand.targetAudience.some(audience => 
          audience.toLowerCase().includes(selectedAudience.toLowerCase())
        )
      );
    }
    
    setFilteredBrands(filtered);
  };

  // Get unique values for filter options
  const getUniqueIndustries = () => {
    const industries = brands.map(brand => brand.industry).filter(Boolean);
    return [...new Set(industries)].sort();
  };

  const getTargetAudiences = () => {
    return ['Students', 'Professionals', 'General Public', 'Tech Community', 'Business Leaders'];
  };

  const getBudgetRanges = () => {
    return ['Small ($1-$5K)', 'Medium ($5K-$20K)', 'Large ($20K-$50K)', 'Very Large ($50K+)'];
  };

  const handleBrandClick = (brandId: string) => {
    navigate(`/brand-profile/${brandId}`);
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
              {/* Industry Filter */}
              <div className="relative">
                <button 
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f3f4] pl-4 pr-2 hover:bg-[#e8ebec]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowIndustryDropdown(!showIndustryDropdown);
                    setShowValuesDropdown(false);
                    setShowHistoryDropdown(false);
                  }}
                >
                  <p className="text-[#111518] text-sm font-medium leading-normal text-left">
                    {selectedIndustry || 'Industry'}
                  </p>
                  <div className="text-[#111518]" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                </button>
                {showIndustryDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10" onClick={(e) => e.stopPropagation()}>
                    <div className="p-2">
                      <button
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                        onClick={() => {
                          setSelectedIndustry('');
                          setShowIndustryDropdown(false);
                        }}
                      >
                        All Industries
                      </button>
                      {getUniqueIndustries().map((industry) => (
                        <button
                          key={industry}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                          onClick={() => {
                            setSelectedIndustry(industry);
                            setShowIndustryDropdown(false);
                          }}
                        >
                          {industry}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Values (Target Audience) Filter */}
              <div className="relative">
                <button 
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f3f4] pl-4 pr-2 hover:bg-[#e8ebec]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowValuesDropdown(!showValuesDropdown);
                    setShowIndustryDropdown(false);
                    setShowHistoryDropdown(false);
                  }}
                >
                  <p className="text-[#111518] text-sm font-medium leading-normal text-left">
                    {selectedAudience || 'Target Audience'}
                  </p>
                  <div className="text-[#111518]" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                </button>
                {showValuesDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10" onClick={(e) => e.stopPropagation()}>
                    <div className="p-2">
                      <button
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                        onClick={() => {
                          setSelectedAudience('');
                          setShowValuesDropdown(false);
                        }}
                      >
                        All Audiences
                      </button>
                      {getTargetAudiences().map((audience) => (
                        <button
                          key={audience}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                          onClick={() => {
                            setSelectedAudience(audience);
                            setShowValuesDropdown(false);
                          }}
                        >
                          {audience}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sponsorship Budget Filter */}
              <div className="relative">
                <button 
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f3f4] pl-4 pr-2 hover:bg-[#e8ebec]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHistoryDropdown(!showHistoryDropdown);
                    setShowIndustryDropdown(false);
                    setShowValuesDropdown(false);
                  }}
                >
                  <p className="text-[#111518] text-sm font-medium leading-normal text-left">
                    {selectedBudgetRange || 'Budget Range'}
                  </p>
                  <div className="text-[#111518]" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                </button>
                {showHistoryDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10" onClick={(e) => e.stopPropagation()}>
                    <div className="p-2">
                      <button
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                        onClick={() => {
                          setSelectedBudgetRange('');
                          setShowHistoryDropdown(false);
                        }}
                      >
                        All Budgets
                      </button>
                      {getBudgetRanges().map((budget) => (
                        <button
                          key={budget}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                          onClick={() => {
                            setSelectedBudgetRange(budget);
                            setShowHistoryDropdown(false);
                          }}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-left">Featured Brands</h2>
            
            {loading ? (
              <div className="p-4 text-center">
                <p className="text-[#617989]">Loading brands...</p>
              </div>
            ) : error ? (
              <div className="p-4 text-center">
                <p className="text-red-500">Error: {error}</p>
              </div>
            ) : filteredBrands.length === 0 ? (
              <div className="p-4 text-center">
                <p className="text-[#617989]">No brands found. Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                {filteredBrands.map((brand) => (
                  <div 
                    key={brand._id} 
                    className="flex flex-col gap-3 pb-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                    onClick={() => handleBrandClick(brand._id)}
                  >
                    <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                      style={{ 
                        backgroundImage: `url("${brand.logo || `https://placehold.co/200x200?text=${encodeURIComponent(brand.brandName.charAt(0))}`}")` 
                      }}
                    ></div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[#111518] text-base font-medium leading-normal text-left">{brand.brandName}</p>
                        {brand.verified && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <p className="text-green-700 text-xs font-medium">Verified</p>
                          </div>
                        )}
                      </div>
                      <p className="text-[#617989] text-sm font-normal leading-normal text-left">
                        {brand.description && brand.description.length > 50 
                          ? brand.description.substring(0, 50) + '...' 
                          : brand.description || 'No description available'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#617989] mt-1">
                        <span>🏢 {brand.industry || 'Industry not specified'}</span>
                      </div>
                      {brand.sponsorshipBudget && brand.sponsorshipBudget.min && brand.sponsorshipBudget.max ? (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-[#617989]">💰 ${brand.sponsorshipBudget.min.toLocaleString()} - ${brand.sponsorshipBudget.max.toLocaleString()}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-[#617989]">💰 Budget available</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
