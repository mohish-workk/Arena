// src/pages/admin/AdminDashboard.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminOrders from './AdminOrders';
import AdminInventory from './AdminInventory';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const { user } = useAuth();

    return (
        <div className="bg-cream min-h-screen pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-8">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-secondary">Admin Portal</h1>
                    <p className="text-secondary/50 mt-2">Welcome back, {user?.name}. Manage orders and inventory.</p>
                </header>

                {/* Tabs */}
                <div className="flex border-b border-secondary/5 mb-8">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'orders' ? 'text-primary border-b-2 border-primary' : 'text-secondary/30 hover:text-secondary'}`}
                    >
                        Order Management
                    </button>
                    <button
                        onClick={() => setActiveTab('inventory')}
                        className={`px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'inventory' ? 'text-primary border-b-2 border-primary' : 'text-secondary/30 hover:text-secondary'}`}
                    >
                        Inventory System
                    </button>
                </div>

                {/* Tab Content */}
                <div className="mt-8">
                    {activeTab === 'orders' && <AdminOrders />}
                    {activeTab === 'inventory' && <AdminInventory />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;