import React, { useState, useEffect } from 'react';
import { Package, Search, Filter, Plus, CheckCircle2, AlertTriangle, PenTool, XCircle } from 'lucide-react';

const AdminInventoryLedger = () => {
    const [inventory, setInventory] = useState([]);
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [eventData, setEventData] = useState({ eventType: 'Cleaned', description: '' });

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/inventory/crm/ledger');
            const data = await res.json();
            if (data.success) {
                setInventory(data.data);
                setFilteredInventory(data.data);
            }
        } catch (error) {
            console.error('Error fetching inventory:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let results = inventory;
        if (filter !== 'All') {
            results = results.filter(item => item.status === filter);
        }
        if (searchTerm) {
            results = results.filter(item => 
                item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.product?.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredInventory(results);
    }, [filter, searchTerm, inventory]);

    const handleLogEvent = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/inventory/crm/${selectedItem._id}/log`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData)
            });
            const data = await res.json();
            if (data.success) {
                setShowModal(false);
                setEventData({ eventType: 'Cleaned', description: '' });
                fetchInventory(); // Refresh ledger
            }
        } catch (error) {
            console.error('Error logging event:', error);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Available': return <CheckCircle2 size={14} className="text-emerald-500" />;
            case 'Maintenance': return <PenTool size={14} className="text-orange-500" />;
            case 'Rented': return <Package size={14} className="text-blue-500" />;
            case 'Retired': return <XCircle size={14} className="text-red-500" />;
            default: return null;
        }
    };

    return (
        <div className="bg-white border border-secondary/5 h-full flex flex-col p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-2">Internal Operations</p>
                    <h2 className="text-3xl font-bold uppercase tracking-tight italic">Asset Ledger</h2>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search Serial/Product..."
                            className="pl-10 pr-4 py-2 bg-cream/50 border border-secondary/10 outline-none text-sm w-64 focus:border-primary transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
                {['All', 'Available', 'Rented', 'Maintenance', 'Retired'].map(f => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest border transition-all ${filter === f ? 'bg-secondary text-cream border-secondary' : 'bg-transparent text-secondary/40 border-secondary/10 hover:border-secondary/30'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto border border-secondary/5">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-cream z-20">
                        <tr className="border-b border-secondary/10 text-[10px] uppercase tracking-[0.2em] font-bold text-secondary/50">
                            <th className="p-4">Serial Number</th>
                            <th className="p-4">Product Name</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Trips</th>
                            <th className="p-4">Last Maint.</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {loading ? (
                            <tr><td colSpan="6" className="p-12 text-center opacity-30 italic">Loading ledger...</td></tr>
                        ) : filteredInventory.length > 0 ? filteredInventory.map(item => (
                            <tr key={item._id} className="border-b border-secondary/5 hover:bg-cream/30 transition-colors">
                                <td className="p-4 font-mono font-bold text-xs">{item.serialNumber}</td>
                                <td className="p-4">
                                    <div className="font-bold">{item.product?.name || 'N/A'}</div>
                                    <div className="text-[10px] opacity-40 uppercase font-bold">{item.product?.category}</div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(item.status)}
                                        <span className="font-bold uppercase text-[10px]">{item.status}</span>
                                    </div>
                                </td>
                                <td className="p-4 opacity-60 font-bold">{item.totalTrips}</td>
                                <td className="p-4 opacity-60 text-xs">{item.lastMaintenanceDate ? new Date(item.lastMaintenanceDate).toLocaleDateString() : 'Never'}</td>
                                <td className="p-4 text-right">
                                    <button 
                                        onClick={() => { setSelectedItem(item); setShowModal(true); }}
                                        className="text-[10px] uppercase font-bold text-primary hover:underline"
                                    >
                                        Log Event
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" className="p-12 text-center opacity-30 italic">No matching assets found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
                    <div className="bg-cream p-12 max-w-lg w-full relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 opacity-40 hover:opacity-100 transition-opacity">
                            <XCircle size={24} />
                        </button>
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-8 italic">New Maintenance Event</h3>
                        <p className="text-sm opacity-60 mb-8">Logging event for <span className="font-bold text-secondary uppercase">{selectedItem.serialNumber}</span> ({selectedItem.product?.name})</p>
                        <form onSubmit={handleLogEvent}>
                            <div className="mb-6">
                                <label className="block text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2">Event Type</label>
                                <select 
                                    className="w-full bg-transparent border-b border-secondary/20 py-2 outline-none font-bold"
                                    value={eventData.eventType}
                                    onChange={(e) => setEventData({...eventData, eventType: e.target.value})}
                                >
                                    <option value="Cleaned">Professionally Cleaned</option>
                                    <option value="Repaired">Repair Conducted</option>
                                    <option value="Inspection">Safety Inspection</option>
                                    <option value="Trip">Customer Trip</option>
                                </select>
                            </div>
                            <div className="mb-10">
                                <label className="block text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2">Description</label>
                                <textarea 
                                    className="w-full bg-white/50 border border-secondary/10 p-4 outline-none focus:border-primary transition-colors text-sm"
                                    placeholder="Enter details about the maintenance or trip..."
                                    rows="4"
                                    required
                                    value={eventData.description}
                                    onChange={(e) => setEventData({...eventData, description: e.target.value})}
                                />
                            </div>
                            <button type="submit" className="w-full bg-primary text-cream py-4 uppercase tracking-[0.2em] font-bold hover:bg-primary/90 transition-all shadow-xl">
                                Commit to Ledger
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminInventoryLedger;
