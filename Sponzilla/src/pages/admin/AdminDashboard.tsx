import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SmartNavbar } from '../../components/layout/Navbar';
import { adminAPI, analyticsAPI } from '../../services/api';
import type {
  ActivityItem,
  AdminSponsorship,
  AdminStats,
  PlatformAnalytics,
  ProofOfWorkAdminItem,
  User
} from '../../services/api/admin';
import type { Event } from '../../services/api/events';
import type { BrandProfile, ClubProfile } from '../../services/api/profiles';

type AdminTab =
  | 'overview'
  | 'users'
  | 'clubs'
  | 'brands'
  | 'events'
  | 'sponsorships'
  | 'proof-of-work';

const tabs: AdminTab[] = [
  'overview',
  'users',
  'clubs',
  'brands',
  'events',
  'sponsorships',
  'proof-of-work'
];

const formatCurrency = (value?: number) => `₹${(value || 0).toLocaleString()}`;

const formatDate = (value?: string) => {
  if (!value) return 'N/A';
  return new Date(value).toLocaleDateString();
};

const activityStyles: Record<string, string> = {
  accepted: 'bg-green-100 text-green-800',
  verified: 'bg-blue-100 text-blue-800',
  funded: 'bg-emerald-100 text-emerald-800',
  disputed: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800',
  published: 'bg-sky-100 text-sky-800',
  new: 'bg-gray-100 text-gray-700'
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [platformAnalytics, setPlatformAnalytics] = useState<PlatformAnalytics | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [clubs, setClubs] = useState<ClubProfile[]>([]);
  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [sponsorships, setSponsorships] = useState<AdminSponsorship[]>([]);
  const [proofOfWork, setProofOfWork] = useState<ProofOfWorkAdminItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleForbidden = (err: any) => {
    if (err?.message?.includes('403') || err?.message?.includes('Access denied')) {
      navigate('/');
      return true;
    }
    return false;
  };

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const [statsRes, analyticsRes] = await Promise.all([
        adminAPI.getStats(),
        analyticsAPI.getPlatformAnalytics()
      ]);
      setStats(statsRes.stats);
      setPlatformAnalytics(analyticsRes.data);
    } catch (err: any) {
      if (!handleForbidden(err)) {
        setError('Failed to load admin overview.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getUsers();
      setUsers(res.users);
    } catch (err: any) {
      if (!handleForbidden(err)) {
        setError('Failed to load users.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getClubs();
      setClubs(res.clubs);
    } catch (err: any) {
      if (!handleForbidden(err)) {
        setError('Failed to load clubs.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getBrands();
      setBrands(res.brands);
    } catch (err: any) {
      if (!handleForbidden(err)) {
        setError('Failed to load brands.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getEvents();
      setEvents(res.events);
    } catch (err: any) {
      if (!handleForbidden(err)) {
        setError('Failed to load events.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSponsorships = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getSponsorships();
      setSponsorships(res.sponsorships);
    } catch (err: any) {
      if (!handleForbidden(err)) {
        setError('Failed to load sponsorships.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchProofOfWork = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getProofOfWork();
      setProofOfWork(res.proofOfWork);
    } catch (err: any) {
      if (!handleForbidden(err)) {
        setError('Failed to load proof-of-work records.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
    if (activeTab === 'overview') fetchOverview();
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'clubs') fetchClubs();
    if (activeTab === 'brands') fetchBrands();
    if (activeTab === 'events') fetchEvents();
    if (activeTab === 'sponsorships') fetchSponsorships();
    if (activeTab === 'proof-of-work') fetchProofOfWork();
  }, [activeTab]);

  const handleVerifyClub = async (id: string) => {
    try {
      const res = await adminAPI.verifyClub(id);
      setClubs((current) => current.map((club) => (
        club._id === id ? { ...club, verified: res.verified } : club
      )));
    } catch {
      alert('Failed to verify club.');
    }
  };

  const handleVerifyBrand = async (id: string) => {
    try {
      const res = await adminAPI.verifyBrand(id);
      setBrands((current) => current.map((brand) => (
        brand._id === id ? { ...brand, verified: res.verified } : brand
      )));
    } catch {
      alert('Failed to verify brand.');
    }
  };

  const handleFeatureEvent = async (id: string) => {
    try {
      const res = await adminAPI.featureEvent(id);
      setEvents((current) => current.map((event) => (
        event._id === id ? { ...event, featured: res.featured } : event
      )));
    } catch {
      alert('Failed to feature event.');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user and all associated data?')) {
      return;
    }

    try {
      await adminAPI.deleteUser(id);
      setUsers((current) => current.filter((user) => user._id !== id));
      alert('User deleted successfully.');
    } catch (err: any) {
      alert(err.message || 'Failed to delete user.');
    }
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const includesQuery = (...values: Array<string | undefined>) =>
    values.some((value) => (value || '').toLowerCase().includes(normalizedQuery));

  const filteredUsers = users.filter((user) => {
    const matchesSearch = includesQuery(user.name, user.email);
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = includesQuery(club.clubName, club.university);
    const matchesStatus = filterStatus === 'all'
      || (filterStatus === 'verified' && club.verified)
      || (filterStatus === 'unverified' && !club.verified);
    return matchesSearch && matchesStatus;
  });

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = includesQuery(brand.brandName, brand.industry);
    const matchesStatus = filterStatus === 'all'
      || (filterStatus === 'verified' && brand.verified)
      || (filterStatus === 'unverified' && !brand.verified);
    return matchesSearch && matchesStatus;
  });

  const filteredEvents = events.filter((event) => {
    const matchesSearch = includesQuery(event.title);
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredSponsorships = sponsorships.filter((sponsorship) => {
    const matchesSearch = includesQuery(
      sponsorship.eventId?.title,
      sponsorship.brandId?.brandName,
      sponsorship.clubId?.clubName,
      sponsorship.tierName
    );
    const matchesStatus = filterStatus === 'all' || sponsorship.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredProofOfWork = proofOfWork.filter((escrow) => {
    const matchesSearch = includesQuery(
      escrow.eventId?.title,
      escrow.brandId?.brandName,
      escrow.clubId?.clubName
    );
    const matchesStatus = filterStatus === 'all' || escrow.escrowStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const overviewStats = stats ? [
    { label: 'Total Users', value: stats.totalUsers, tone: 'text-slate-900' },
    { label: 'Total Clubs', value: stats.totalClubs, tone: 'text-slate-900' },
    { label: 'Total Brands', value: stats.totalBrands, tone: 'text-slate-900' },
    { label: 'Total Events', value: stats.totalEvents, tone: 'text-slate-900' },
    { label: 'Pipeline Value', value: formatCurrency(stats.totalSponsorshipValue), tone: 'text-indigo-700' },
    { label: 'Accepted Revenue', value: formatCurrency(stats.acceptedSponsorshipValue), tone: 'text-emerald-700' },
    { label: 'Accepted Deals', value: stats.acceptedSponsorshipCount, tone: 'text-slate-900' },
    { label: 'Pending Deals', value: stats.pendingSponsorshipCount, tone: 'text-amber-700' },
    { label: 'Proof Of Work', value: stats.proofOfWorkCount, tone: 'text-slate-900' },
    { label: 'Funded Escrows', value: stats.fundedEscrowCount, tone: 'text-emerald-700' },
    { label: 'Disputed Escrows', value: stats.disputedEscrowCount, tone: 'text-red-700' },
    { label: 'Published Events', value: stats.publishedEvents, tone: 'text-sky-700' }
  ] : [];

  const renderActivity = (item: ActivityItem) => (
    <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">{item.title}</p>
          <p className="mt-1 text-sm text-gray-500">{item.subtitle}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${activityStyles[item.status] || 'bg-gray-100 text-gray-700'}`}>
          {item.status.replace(/_/g, ' ')}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <span>{formatDate(item.occurredAt)}</span>
        {item.amount ? <span className="font-semibold text-gray-800">{formatCurrency(item.amount)}</span> : null}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      <SmartNavbar />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
            <p className="mt-1 text-gray-500">Manage users, sponsorship revenue, platform analytics, and escrow visibility.</p>
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
            {error}
          </div>
        ) : null}

        {activeTab !== 'overview' ? (
          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {activeTab === 'users' ? (
                <select
                  value={filterRole}
                  onChange={(event) => setFilterRole(event.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="club">Clubs</option>
                  <option value="brand">Brands</option>
                  <option value="admin">Admins</option>
                </select>
              ) : null}
              {['clubs', 'brands'].includes(activeTab) ? (
                <select
                  value={filterStatus}
                  onChange={(event) => setFilterStatus(event.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="verified">Verified</option>
                  <option value="unverified">Unverified</option>
                </select>
              ) : null}
              {activeTab === 'events' ? (
                <select
                  value={filterStatus}
                  onChange={(event) => setFilterStatus(event.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                </select>
              ) : null}
              {activeTab === 'sponsorships' ? (
                <select
                  value={filterStatus}
                  onChange={(event) => setFilterStatus(event.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="negotiating">Negotiating</option>
                </select>
              ) : null}
              {activeTab === 'proof-of-work' ? (
                <select
                  value={filterStatus}
                  onChange={(event) => setFilterStatus(event.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Escrow Statuses</option>
                  <option value="pending_signatures">Pending Signatures</option>
                  <option value="unfunded">Unfunded</option>
                  <option value="funded">Funded</option>
                  <option value="partially_released">Partially Released</option>
                  <option value="fully_released">Fully Released</option>
                  <option value="disputed">Disputed</option>
                </select>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex flex-wrap gap-x-8 gap-y-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {tab.replace(/-/g, ' ')}
              </button>
            ))}
          </nav>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
          </div>
        ) : (
          <div>
            {activeTab === 'overview' && stats ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {overviewStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <p className={`mt-3 text-3xl font-bold ${stat.tone}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                        <p className="text-sm text-gray-500">What changed across users, deals, events, and escrow.</p>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      {stats.recentActivity.length > 0 ? stats.recentActivity.map(renderActivity) : (
                        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-500">
                          No recent activity to show yet.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                      <h2 className="text-xl font-bold text-gray-900">Platform Analytics</h2>
                      <p className="mt-1 text-sm text-gray-500">Existing analytics endpoint surfaced for admins.</p>
                      <div className="mt-5 grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-blue-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Published</p>
                          <p className="mt-2 text-2xl font-bold text-blue-900">{platformAnalytics?.events?.published ?? 0}</p>
                        </div>
                        <div className="rounded-xl bg-slate-100 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-700">Draft</p>
                          <p className="mt-2 text-2xl font-bold text-slate-900">{platformAnalytics?.events?.draft ?? 0}</p>
                        </div>
                        <div className="rounded-xl bg-emerald-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Completed</p>
                          <p className="mt-2 text-2xl font-bold text-emerald-900">{platformAnalytics?.events?.completed ?? 0}</p>
                        </div>
                        <div className="rounded-xl bg-amber-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Users</p>
                          <p className="mt-2 text-2xl font-bold text-amber-900">{platformAnalytics?.overview?.totalUsers ?? stats.totalUsers}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                      <h2 className="text-xl font-bold text-gray-900">Revenue Snapshot</h2>
                      <div className="mt-4 space-y-4 text-sm">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                          <span className="text-gray-500">Total sponsorship pipeline</span>
                          <span className="font-semibold text-gray-900">{formatCurrency(stats.totalSponsorshipValue)}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                          <span className="text-gray-500">Accepted revenue</span>
                          <span className="font-semibold text-emerald-700">{formatCurrency(stats.acceptedSponsorshipValue)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Active escrow records</span>
                          <span className="font-semibold text-gray-900">{stats.proofOfWorkCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === 'users' ? (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name / Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Verified</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Joined</th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredUsers.map((user) => (
                      <tr key={user._id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : user.role === 'club'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {user.verified ? 'Yes' : 'No'}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          {user.role !== 'admin' ? (
                            <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {activeTab === 'clubs' ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredClubs.map((club) => (
                  <div key={club._id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{club.clubName}</h3>
                        <p className="text-sm text-gray-500">{club.university}</p>
                      </div>
                      {club.verified ? <span className="rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800">VERIFIED</span> : null}
                    </div>
                    <p className="mb-4 line-clamp-3 text-sm text-gray-600">{club.description}</p>
                    <div className="mt-auto border-t border-gray-100 pt-4">
                      <button
                        onClick={() => handleVerifyClub(club._id)}
                        className={`w-full rounded-lg py-2 font-medium transition ${
                          club.verified
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {club.verified ? 'Remove Verification' : 'Verify Club'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === 'brands' ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBrands.map((brand) => (
                  <div key={brand._id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{brand.brandName}</h3>
                        <p className="text-sm text-gray-500">{brand.industry}</p>
                      </div>
                      {brand.verified ? <span className="rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-800">VERIFIED</span> : null}
                    </div>
                    <p className="mb-4 line-clamp-3 text-sm text-gray-600">{brand.description}</p>
                    <div className="mt-auto border-t border-gray-100 pt-4">
                      <button
                        onClick={() => handleVerifyBrand(brand._id)}
                        className={`w-full rounded-lg py-2 font-medium transition ${
                          brand.verified
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {brand.verified ? 'Remove Verification' : 'Verify Brand'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === 'events' ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event) => (
                  <div key={event._id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-2 flex items-start justify-between">
                      <span className={`rounded px-2 py-1 text-xs font-medium ${
                        event.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                      {event.featured ? <span className="text-sm font-bold text-yellow-500">FEATURED</span> : null}
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-gray-900">{event.title}</h3>
                    <p className="mb-4 text-sm text-gray-500">{formatDate(event.eventDate)}</p>
                    <div className="mt-auto border-t border-gray-100 pt-4">
                      <button
                        onClick={() => handleFeatureEvent(event._id)}
                        className={`flex w-full items-center justify-center rounded-lg py-2 font-medium transition ${
                          event.featured
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-yellow-500 text-white hover:bg-yellow-600'
                        }`}
                      >
                        {event.featured ? 'Unfeature Event' : 'Feature On Homepage'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === 'sponsorships' ? (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Event</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Brand</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Club</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Tier</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredSponsorships.map((sponsorship) => (
                      <tr key={sponsorship._id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{sponsorship.eventId?.title || 'N/A'}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-900">{sponsorship.brandId?.brandName || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{sponsorship.brandId?.industry || ''}</div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-900">{sponsorship.clubId?.clubName || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{sponsorship.clubId?.university || ''}</div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{sponsorship.tierName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(sponsorship.amount)}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            sponsorship.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : sponsorship.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : sponsorship.status === 'negotiating'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {sponsorship.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(sponsorship.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {activeTab === 'proof-of-work' ? (
              <div className="space-y-4">
                {filteredProofOfWork.map((escrow) => (
                  <div key={escrow._id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-bold text-gray-900">{escrow.eventId?.title || 'Untitled Event'}</h3>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${activityStyles[escrow.escrowStatus] || 'bg-gray-100 text-gray-700'}`}>
                            {escrow.escrowStatus.replace(/_/g, ' ')}
                          </span>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            escrow.agreementSigned ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {escrow.agreementSigned ? 'Agreement Signed' : 'Agreement Pending'}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          {escrow.clubId?.clubName || 'Unknown Club'} with {escrow.brandId?.brandName || 'Unknown Brand'}
                        </p>
                        <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-600 md:grid-cols-4">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">Escrow Amount</p>
                            <p className="mt-1 font-semibold text-gray-900">{formatCurrency(escrow.escrowAmount)}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">Request Status</p>
                            <p className="mt-1 font-semibold text-gray-900">{escrow.sponsorshipRequestId?.status || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">Event Date</p>
                            <p className="mt-1 font-semibold text-gray-900">{formatDate(escrow.eventId?.eventDate)}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">Last Updated</p>
                            <p className="mt-1 font-semibold text-gray-900">{formatDate(escrow.updatedAt)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="min-w-[180px] rounded-xl bg-gray-50 p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-400">Milestones</p>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{escrow.milestones.length}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          {escrow.milestones.filter((milestone) => milestone.status === 'verified').length} verified
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {escrow.milestones.map((milestone, index) => (
                        <div key={`${escrow._id}-${milestone.title}-${index}`} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-gray-900">{milestone.title}</p>
                              <p className="mt-1 text-sm text-gray-500">{formatCurrency(milestone.payoutAmount)}</p>
                            </div>
                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${activityStyles[milestone.status] || 'bg-gray-100 text-gray-700'}`}>
                              {milestone.status}
                            </span>
                          </div>
                          <div className="mt-3 space-y-1 text-xs text-gray-500">
                            <p>Submitted: {formatDate(milestone.submittedAt)}</p>
                            <p>Verified: {formatDate(milestone.verifiedAt)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {filteredProofOfWork.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                    No escrow records matched the current filters.
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
