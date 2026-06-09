import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SmartNavbar } from '../../components/layout/Navbar';
import { adminAPI } from '../../services/api';
import type { AdminStats, User } from '../../services/api/admin';
import type { ClubProfile, BrandProfile } from '../../services/api/profiles';
import type { Event } from '../../services/api/events';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'clubs' | 'brands' | 'events'>('overview');
  
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [clubs, setClubs] = useState<ClubProfile[]>([]);
  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getStats();
      setStats(res.stats);
    } catch (err: any) {
      if (err.message?.includes('403') || err.message?.includes('Access denied')) {
        navigate('/'); // Redirect non-admins
      }
      setError('Failed to load dashboard stats.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getUsers();
      setUsers(res.users);
    } catch (err) {
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getClubs();
      setClubs(res.clubs);
    } catch (err) {
      setError('Failed to load clubs.');
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getBrands();
      setBrands(res.brands);
    } catch (err) {
      setError('Failed to load brands.');
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getEvents();
      setEvents(res.events);
    } catch (err) {
      setError('Failed to load events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
    if (activeTab === 'overview') fetchStats();
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'clubs') fetchClubs();
    if (activeTab === 'brands') fetchBrands();
    if (activeTab === 'events') fetchEvents();
  }, [activeTab]);

  const handleVerifyClub = async (id: string) => {
    try {
      const res = await adminAPI.verifyClub(id);
      setClubs(clubs.map(c => c._id === id ? { ...c, verified: res.verified } : c));
    } catch (err) {
      alert('Failed to verify club.');
    }
  };

  const handleVerifyBrand = async (id: string) => {
    try {
      const res = await adminAPI.verifyBrand(id);
      setBrands(brands.map(b => b._id === id ? { ...b, verified: res.verified } : b));
    } catch (err) {
      alert('Failed to verify brand.');
    }
  };

  const handleFeatureEvent = async (id: string) => {
    try {
      const res = await adminAPI.featureEvent(id);
      setEvents(events.map(e => e._id === id ? { ...e, featured: res.featured } : e));
    } catch (err) {
      alert('Failed to feature event.');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user and all associated data?')) return;
    try {
      await adminAPI.deleteUser(id);
      setUsers(users.filter(u => u._id !== id));
      alert('User deleted successfully.');
    } catch (err: any) {
      alert(err.message || 'Failed to delete user.');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <SmartNavbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
            <p className="text-gray-500 mt-1">Manage users, verification, and platform content.</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'users', 'clubs', 'brands', 'events'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize
                  ${activeTab === tab 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Users', value: stats.totalUsers },
                  { label: 'Total Clubs', value: stats.totalClubs },
                  { label: 'Total Brands', value: stats.totalBrands },
                  { label: 'Total Events', value: stats.totalEvents },
                  { label: 'Published Events', value: stats.publishedEvents },
                  { label: 'Verified Clubs', value: stats.verifiedClubs },
                  { label: 'Verified Brands', value: stats.verifiedBrands },
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'club' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.verified ? '✅ Yes' : '❌ No'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt || '').toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {user.role !== 'admin' && (
                            <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* CLUBS TAB */}
            {activeTab === 'clubs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map((club) => (
                  <div key={club._id} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{club.clubName}</h3>
                        <p className="text-sm text-gray-500">{club.university}</p>
                      </div>
                      {club.verified && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold">VERIFIED</span>}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{club.description}</p>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => handleVerifyClub(club._id)}
                        className={`w-full py-2 rounded-lg font-medium transition ${
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
            )}

            {/* BRANDS TAB */}
            {activeTab === 'brands' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brands.map((brand) => (
                  <div key={brand._id} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{brand.brandName}</h3>
                        <p className="text-sm text-gray-500">{brand.industry}</p>
                      </div>
                      {brand.verified && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold">VERIFIED</span>}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{brand.description}</p>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => handleVerifyBrand(brand._id)}
                        className={`w-full py-2 rounded-lg font-medium transition ${
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
            )}

            {/* EVENTS TAB */}
            {activeTab === 'events' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event._id} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        event.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                      {event.featured && <span className="text-yellow-500 font-bold text-sm">⭐ FEATURED</span>}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mt-2">{event.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{new Date(event.eventDate).toLocaleDateString()}</p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => handleFeatureEvent(event._id)}
                        className={`w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
                          event.featured 
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                            : 'bg-yellow-500 text-white hover:bg-yellow-600'
                        }`}
                      >
                        {event.featured ? 'Unfeature Event' : '⭐ Feature on Homepage'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
