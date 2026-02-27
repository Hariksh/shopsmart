import { useState, useEffect, useContext } from 'react';
import { User, Package, Settings, Camera } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Profile = () => {
    const { user, login } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('details');

    // Form state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');

                // Fetch user details
                const profileRes = await fetch('http://localhost:5005/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    setFormData(prev => ({
                        ...prev,
                        username: profileData.username || '',
                        email: profileData.email || '',
                        phone: profileData.phone || ''
                    }));
                }

                // Fetch orders
                const ordersRes = await fetch('http://localhost:5005/api/orders/myorders', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (ordersRes.ok) {
                    const ordersData = await ordersRes.json();
                    setOrders(ordersData);
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching profile data", err);
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (formData.password && formData.password !== formData.confirmPassword) {
            return setMessage({ type: 'error', text: 'Passwords do not match' });
        }

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5005/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: formData.username,
                    phone: formData.phone,
                    password: formData.password || undefined
                })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                login(data); // Update global user state
                setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
            } else {
                setMessage({ type: 'error', text: data.msg || 'Update failed' });
            }
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: 'An error occurred' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            My Account
                        </h2>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
                            {/* User Info Header */}
                            <div className="p-6 text-center border-b border-gray-100 bg-gradient-to-b from-yellow-50 to-white">
                                <div className="relative inline-block">
                                    <div className="h-24 w-24 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 border-4 border-white shadow-sm mx-auto">
                                        <span className="text-3xl font-bold uppercase">
                                            {user?.username?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                    <button className="absolute bottom-0 right-0 h-8 w-8 bg-white rounded-full shadow border border-gray-200 flex items-center justify-center text-gray-500 hover:text-yellow-600 transition-colors">
                                        <Camera className="h-4 w-4" />
                                    </button>
                                </div>
                                <h3 className="mt-4 text-lg font-bold text-gray-900">{user?.username || 'User'}</h3>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>

                            {/* Nav Links */}
                            <nav className="p-4 space-y-1">
                                <button
                                    onClick={() => setActiveTab('details')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'details'
                                            ? 'bg-yellow-50 text-yellow-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <User className="h-5 w-5" />
                                    Profile Details
                                </button>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'orders'
                                            ? 'bg-yellow-50 text-yellow-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Package className="h-5 w-5" />
                                    Order History
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'settings'
                                            ? 'bg-yellow-50 text-yellow-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Settings className="h-5 w-5" />
                                    Settings
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                            {loading ? (
                                <div className="text-center py-12 text-gray-500">Loading profile data...</div>
                            ) : (
                                <>
                                    {/* --- PROFILE DETAILS TAB --- */}
                                    {activeTab === 'details' && (
                                        <div className="animate-fadeIn">
                                            <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-4">Personal Information</h3>

                                            {message && (
                                                <div className={`mb-6 p-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                                    {message.text}
                                                </div>
                                            )}

                                            <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-2xl">
                                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            value={formData.username}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-colors"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                                        <input
                                                            type="email"
                                                            value={formData.email}
                                                            disabled
                                                            className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-500 cursor-not-allowed"
                                                        />
                                                        <p className="mt-1 text-xs text-gray-500">Email cannot be changed directly.</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-colors"
                                                        />
                                                    </div>
                                                </div>

                                                <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4 border-b pb-4">Change Password</h3>
                                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            value={formData.password}
                                                            onChange={handleInputChange}
                                                            placeholder="Leave blank to keep current"
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-colors"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                                        <input
                                                            type="password"
                                                            name="confirmPassword"
                                                            value={formData.confirmPassword}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-colors"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="pt-6 flex justify-end">
                                                    <button
                                                        type="submit"
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2.5 px-6 rounded-md transition-colors shadow-sm"
                                                    >
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}

                                    {/* --- ORDER HISTORY TAB --- */}
                                    {activeTab === 'orders' && (
                                        <div className="animate-fadeIn">
                                            <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-4">Order History</h3>

                                            {orders.length === 0 ? (
                                                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                                    <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                                                    <p className="mt-1 text-gray-500">When you place an order, it will appear here.</p>
                                                    <button className="mt-4 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-md transition-colors shadow-sm">
                                                        Start Shopping
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="space-y-6">
                                                    {orders.map((order) => (
                                                        <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col sm:flex-row">
                                                            <div className="bg-gray-50 p-4 sm:w-1/3 border-b sm:border-b-0 sm:border-r border-gray-200 flex flex-col justify-center">
                                                                <div className="text-sm font-semibold text-gray-900">Order #{order._id.substring(4, 10).toUpperCase()}</div>
                                                                <div className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</div>
                                                                <div className="mt-3 text-lg font-bold text-gray-900">${order.totalPrice.toFixed(2)}</div>
                                                                <div className="mt-2 flex gap-2">
                                                                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                                        {order.isPaid ? 'Paid' : 'Unpaid'}
                                                                    </span>
                                                                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${order.isDelivered ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                                                        {order.isDelivered ? 'Delivered' : 'Processing'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="p-4 flex-1">
                                                                <div className="text-sm font-medium text-gray-900 mb-3">Items</div>
                                                                <ul className="space-y-3">
                                                                    {order.orderItems.map((item, idx) => (
                                                                        <li key={idx} className="flex justify-between items-center text-sm">
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                                                                                    <Package className="h-5 w-5" />
                                                                                </div>
                                                                                <span className="text-gray-700">{item.name} <span className="text-gray-400 ml-1">x{item.qty}</span></span>
                                                                            </div>
                                                                            <span className="font-medium text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                                                    <button className="text-xs font-medium text-yellow-600 hover:text-yellow-700">View Details &rarr;</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* --- LABELS TAB --- */}
                                    {activeTab === 'settings' && (
                                        <div className="animate-fadeIn">
                                            <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-4">Account Settings</h3>
                                            <p className="text-gray-500 text-sm">Communication preferences and account management options will live here.</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
