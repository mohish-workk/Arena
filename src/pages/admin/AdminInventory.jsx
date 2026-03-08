// src/pages/admin/AdminInventory.jsx
import { useState, useMemo } from 'react';
import { inventory as initialInventory } from '../../data/dummyData';
import { Search, Edit, AlertTriangle, Plus, Download, Save, X, Trash2 } from 'lucide-react';

const AdminInventory = () => {
    const [inventory, setInventory] = useState(initialInventory);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [editingItem, setEditingItem] = useState(null); // { id, stock }
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', category: '', stock: 0, threshold: 5 });

    const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

    // Filtered inventory
    const filteredInventory = useMemo(() => {
        return inventory.filter(item =>
            (statusFilter === 'All' || item.status === statusFilter) &&
            (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.id.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [inventory, searchTerm, statusFilter]);

    // Update stock and recalc status
    const updateStock = (id, newStock) => {
        setInventory(inventory.map(item => {
            if (item.id === id) {
                const stock = Math.max(0, newStock);
                let status = 'In Stock';
                if (stock === 0) status = 'Out of Stock';
                else if (stock < item.threshold) status = 'Low Stock';
                return { ...item, stock, status };
            }
            return item;
        }));
        setEditingItem(null);
    };

    const handleToggleOutOfStock = (id) => {
        setInventory(inventory.map(item => {
            if (item.id === id) {
                const newStock = item.stock > 0 ? 0 : (item.threshold + 2); // mock restore to some stock
                let status = newStock === 0 ? 'Out of Stock' : (newStock < item.threshold ? 'Low Stock' : 'In Stock');
                return { ...item, stock: newStock, status };
            }
            return item;
        }));
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this item?')) {
            setInventory(inventory.filter(item => item.id !== id));
        }
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        const newId = `INV-${String(inventory.length + 1).padStart(3, '0')}`;
        let status = 'In Stock';
        if (newItem.stock === 0) status = 'Out of Stock';
        else if (newItem.stock < newItem.threshold) status = 'Low Stock';
        setInventory([...inventory, { ...newItem, id: newId, status }]);
        setShowAddModal(false);
        setNewItem({ name: '', category: '', stock: 0, threshold: 5 });
    };

    const handleExport = () => {
        console.log('Exporting inventory:', filteredInventory);
        alert('Export started (mock). Check console.');
    };

    return (
        <div>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/30" size={16} />
                        <input
                            type="text"
                            placeholder="Search inventory..."
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
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-1 px-4 py-2 bg-primary text-cream text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90"
                    >
                        <Plus size={14} /> Add Item
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-1 px-4 py-2 border border-secondary/10 text-secondary/60 hover:text-secondary text-[10px] font-bold uppercase tracking-widest"
                    >
                        <Download size={14} /> Export
                    </button>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white border border-secondary/5 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-cream border-b border-secondary/5">
                        <tr>
                            <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-secondary/40">ID</th>
                            <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-secondary/40">Name</th>
                            <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-secondary/40">Category</th>
                            <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-secondary/40">Stock</th>
                            <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-secondary/40">Threshold</th>
                            <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-secondary/40">Status</th>
                            <th className="p-4 text-left text-[10px] font-bold uppercase tracking-widest text-secondary/40">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInventory.map(item => {
                            const isLow = item.stock < item.threshold && item.stock > 0;
                            const isOut = item.stock === 0;
                            return (
                                <tr key={item.id} className={`border-b border-secondary/5 hover:bg-cream/50 ${isLow ? 'bg-yellow-50' : ''} ${isOut ? 'bg-red-50' : ''}`}>
                                    <td className="p-4 font-medium">{item.id}</td>
                                    <td className="p-4">{item.name}</td>
                                    <td className="p-4">{item.category}</td>
                                    <td className="p-4">
                                        {editingItem === item.id ? (
                                            <input
                                                type="number"
                                                min="0"
                                                value={item.stock}
                                                onChange={(e) => updateStock(item.id, parseInt(e.target.value) || 0)}
                                                className="w-20 border border-primary px-2 py-1 text-sm"
                                                autoFocus
                                                onBlur={() => setEditingItem(null)}
                                                onKeyDown={(e) => e.key === 'Enter' && setEditingItem(null)}
                                            />
                                        ) : (
                                            <span className="cursor-pointer hover:text-primary" onClick={() => setEditingItem(item.id)}>
                                                {item.stock}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4">{item.threshold}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-[10px] font-bold uppercase ${item.status === 'In Stock' ? 'text-green-600 bg-green-50' :
                                            item.status === 'Low Stock' ? 'text-yellow-600 bg-yellow-50' :
                                                'text-red-600 bg-red-50'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 flex items-center gap-2">
                                        <button
                                            onClick={() => handleToggleOutOfStock(item.id)}
                                            className="text-[10px] px-2 py-1 border border-secondary/10 hover:bg-secondary hover:text-cream transition-colors"
                                            title={item.stock > 0 ? 'Mark Out of Stock' : 'Restock'}
                                        >
                                            {item.stock > 0 ? 'Out' : 'In'}
                                        </button>
                                        <button onClick={() => setEditingItem(item.id)} className="text-secondary/40 hover:text-secondary">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="text-secondary/40 hover:text-red-500">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Add Item Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md p-8 relative">
                        <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-secondary/40 hover:text-secondary">
                            <X size={20} />
                        </button>
                        <h2 className="text-2xl font-bold text-secondary mb-6">Add New Inventory Item</h2>
                        <form onSubmit={handleAddItem} className="space-y-4">
                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary/40 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    className="w-full border border-secondary/5 p-3 text-sm focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary/40 mb-1">Category</label>
                                <input
                                    type="text"
                                    required
                                    value={newItem.category}
                                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                    className="w-full border border-secondary/5 p-3 text-sm focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary/40 mb-1">Initial Stock</label>
                                <input
                                    type="number"
                                    min="0"
                                    required
                                    value={newItem.stock}
                                    onChange={(e) => setNewItem({ ...newItem, stock: parseInt(e.target.value) || 0 })}
                                    className="w-full border border-secondary/5 p-3 text-sm focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary/40 mb-1">Low Stock Threshold</label>
                                <input
                                    type="number"
                                    min="1"
                                    required
                                    value={newItem.threshold}
                                    onChange={(e) => setNewItem({ ...newItem, threshold: parseInt(e.target.value) || 5 })}
                                    className="w-full border border-secondary/5 p-3 text-sm focus:outline-none focus:border-primary"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-cream py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 flex items-center justify-center gap-2 mt-6"
                            >
                                <Plus size={16} /> Add Item
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminInventory;