// src/pages/admin/AdminOrders.jsx
import { useState, useMemo } from 'react';
import { orders as initialOrders } from '../../data/dummyData';
import { Search, SlidersHorizontal, Grid3x3, Table, Eye, Trash2, Download, X, ChevronDown, Check } from 'lucide-react';

const AdminOrders = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc', 'date-asc', 'total-desc', 'total-asc'
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [detailsOrder, setDetailsOrder] = useState(null);

    const statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    // Filtered & sorted orders
    const filteredOrders = useMemo(() => {
        let filtered = orders.filter(order =>
            (statusFilter === 'All' || order.status === statusFilter) &&
            (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'date-asc': return new Date(a.date) - new Date(b.date);
                case 'date-desc': return new Date(b.date) - new Date(a.date);
                case 'total-asc': return a.total - b.total;
                case 'total-desc': return b.total - a.total;
                default: return 0;
            }
        });
        return filtered;
    }, [orders, statusFilter, searchTerm, sortBy]);

    // Handlers
    const handleDelete = (orderId) => {
        if (window.confirm('Delete this order?')) {
            setOrders(orders.filter(o => o.id !== orderId));
            setSelectedOrders(selectedOrders.filter(id => id !== orderId));
        }
    };

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    const toggleSelectOrder = (orderId) => {
        setSelectedOrders(prev =>
            prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedOrders.length === filteredOrders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(filteredOrders.map(o => o.id));
        }
    };

    const handleBulkDelete = () => {
        if (selectedOrders.length === 0) return;
        if (window.confirm(`Delete ${selectedOrders.length} orders?`)) {
            setOrders(orders.filter(o => !selectedOrders.includes(o.id)));
            setSelectedOrders([]);
        }
    };

    const handleBulkStatusChange = (newStatus) => {
        if (selectedOrders.length === 0) return;
        setOrders(orders.map(o => selectedOrders.includes(o.id) ? { ...o, status: newStatus } : o));
        setSelectedOrders([]);
    };

    const handleExport = () => {
        console.log('Exporting orders:', filteredOrders);
        alert('Export started (mock). Check console.');
    };

    return (
        <div>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    {/* View toggle */}
                    <button
                        onClick={() => setViewMode('table')}
                        className={`p-2 border ${viewMode === 'table' ? 'bg-primary text-cream border-primary' : 'border-secondary/10 text-secondary/40 hover:text-secondary'}`}
                        title="Table view"
                    >
                        <Table size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 border ${viewMode === 'grid' ? 'bg-primary text-cream border-primary' : 'border-secondary/10 text-secondary/40 hover:text-secondary'}`}
                        title="Grid view"
                    >
                        <Grid3x3 size={18} />
                    </button>

                    {/* Search */}
                    <div className="relative ml-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/30" size={16} />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-secondary/5 bg-white text-sm focus:outline-none focus:border-primary w-64"
                        />
                    </div>

                    {/* Status filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-secondary/5 bg-white px-4 py-2 text-sm focus:outline-none focus:border-primary"
                    >
                        {statuses.map(s => <option key={s}>{s}</option>)}
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-secondary/5 bg-white px-4 py-2 text-sm focus:outline-none focus:border-primary"
                    >
                        <option value="date-desc">Date (newest)</option>
                        <option value="date-asc">Date (oldest)</option>
                        <option value="total-desc">Total (high-low)</option>
                        <option value="total-asc">Total (low-high)</option>
                    </select>
                </div>

                <div className="flex items-center gap-3">
                    {/* Bulk actions */}
                    {selectedOrders.length > 0 && (
                        <>
                            <button
                                onClick={handleBulkDelete}
                                className="flex items-center gap-1 px-4 py-2 bg-red-500 text-cream text-[10px] font-bold uppercase tracking-widest hover:bg-red-600"
                            >
                                <Trash2 size={14} /> Delete Selected ({selectedOrders.length})
                            </button>
                            <select
                                onChange={(e) => handleBulkStatusChange(e.target.value)}
                                className="border border-secondary/5 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest"
                                defaultValue=""
                            >
                                <option value="" disabled>Change Status</option>
                                {statuses.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}
                            </select>
                        </>
                    )}
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-1 px-4 py-2 border border-secondary/10 text-secondary/60 hover:text-secondary text-[10px] font-bold uppercase tracking-widest"
                    >
                        <Download size={14} /> Export
                    </button>
                </div>
            </div>

            {/* Orders Display */}
            {viewMode === 'table' ? (
                <div className="bg-white border border-secondary/5 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-cream border-b border-secondary/5">
                            <tr>
                                <th className="p-4 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                                        onChange={toggleSelectAll}
                                        className="accent-primary"
                                    />
                                </th>
                                <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-secondary/40">Order ID</th>
                                <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-secondary/40">Customer</th>
                                <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-secondary/40">Date</th>
                                <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-secondary/40">Status</th>
                                <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-secondary/40">Total</th>
                                <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-secondary/40">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order.id} className="border-b border-secondary/5 hover:bg-cream/50">
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrders.includes(order.id)}
                                            onChange={() => toggleSelectOrder(order.id)}
                                            className="accent-primary"
                                        />
                                    </td>
                                    <td className="p-4 font-medium">{order.id}</td>
                                    <td className="p-4">{order.customer}</td>
                                    <td className="p-4">{order.date}</td>
                                    <td className="p-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className="border border-secondary/5 bg-transparent px-2 py-1 text-xs focus:outline-none"
                                        >
                                            {statuses.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </td>
                                    <td className="p-4 font-bold">₹{order.total}</td>
                                    <td className="p-4 flex items-center gap-2">
                                        <button onClick={() => setDetailsOrder(order)} className="text-secondary/40 hover:text-secondary">
                                            <Eye size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(order.id)} className="text-secondary/40 hover:text-red-500">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                // Grid view
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOrders.map(order => (
                        <div key={order.id} className="bg-white border border-secondary/5 p-6 hover:shadow-lg transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-sm font-bold text-secondary">{order.id}</h3>
                                    <p className="text-xs text-secondary/60">{order.customer}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setDetailsOrder(order)} className="text-secondary/40 hover:text-secondary">
                                        <Eye size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(order.id)} className="text-secondary/40 hover:text-red-500">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2 text-xs">
                                <p><span className="text-secondary/40">Date:</span> {order.date}</p>
                                <p><span className="text-secondary/40">Total:</span> ₹{order.total}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-secondary/40">Status:</span>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="border border-secondary/5 bg-transparent px-2 py-1 text-xs"
                                    >
                                        {statuses.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Order Details Modal */}
            {detailsOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg p-8 relative">
                        <button onClick={() => setDetailsOrder(null)} className="absolute top-4 right-4 text-secondary/40 hover:text-secondary">
                            <X size={20} />
                        </button>
                        <h2 className="text-2xl font-bold text-secondary mb-6">Order Details</h2>
                        <div className="space-y-4">
                            <p><span className="text-secondary/40 text-sm">Order ID:</span> {detailsOrder.id}</p>
                            <p><span className="text-secondary/40 text-sm">Customer:</span> {detailsOrder.customer}</p>
                            <p><span className="text-secondary/40 text-sm">Date:</span> {detailsOrder.date}</p>
                            <p><span className="text-secondary/40 text-sm">Status:</span> {detailsOrder.status}</p>
                            <p><span className="text-secondary/40 text-sm">Total:</span> ₹{detailsOrder.total}</p>
                            <p><span className="text-secondary/40 text-sm">Payment:</span> {detailsOrder.paymentMethod}</p>
                            <div>
                                <span className="text-secondary/40 text-sm">Items:</span>
                                <ul className="list-disc list-inside mt-2 text-sm">
                                    {detailsOrder.items.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;