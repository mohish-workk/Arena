import React, { useState, useEffect } from 'react';
import { useErpCrm } from '../context/ErpCrmContext';
import { 
  Users, Package, ArrowRightLeft, 
  TrendingUp, Box, IndianRupee, 
  AlertTriangle, LayoutDashboard, MessageSquareWarning, Search, Bell, Menu, CheckCircle2, Clock
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function ErpCrmIntegration() {
  const { 
    crmUsers: users, 
    erpProducts: products, 
    transactions: logs, 
    crmComplaints: complaints,
    executeManualOrder,
    restockProduct,
    resolveComplaint
  } = useErpCrm();
  
  const [activeTab, setActiveTab] = useState('Analytics');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const tabs = ['Analytics', 'Users', 'Inventory', 'Orders', 'Support'];

  useEffect(() => {
    if (users.length > 0 && !selectedUserId) setSelectedUserId(users[0].id);
    if (products.length > 0 && !selectedProductId) setSelectedProductId(products[0].id);
  }, [users, products, selectedUserId, selectedProductId]);

  const handleExecuteOrder = () => {
    if (!selectedUserId || !selectedProductId || orderQuantity < 1) return;
    const success = executeManualOrder(selectedUserId, selectedProductId, Number(orderQuantity));
    if (!success) {
      alert("Product is out of stock or invalid selection!");
    } else {
      setOrderQuantity(1);
      alert("Order successfully executed!");
    }
  };

  // Metrics
  const totalRevenue = users.reduce((acc, user) => acc + user.total_spent, 0);
  const totalInventoryValue = products.reduce((acc, p) => acc + (p.price * p.stock_count), 0);
  const lowStockItems = products.filter(p => p.stock_count < 10).length;

  // Chart Data Preparation
  const dummySalesData = [
    { name: 'Mon', revenue: 12000 },
    { name: 'Tue', revenue: 19000 },
    { name: 'Wed', revenue: 15000 },
    { name: 'Thu', revenue: 22000 },
    { name: 'Fri', revenue: 45000 },
    { name: 'Sat', revenue: 38000 },
    { name: 'Sun', revenue: 52000 },
  ];

  const salesData = logs.length > 3 
    ? logs.filter(l => l.amount > 0).slice(-7).map((log, i) => ({ name: `Log ${i+1}`, revenue: log.amount })) 
    : dummySalesData;

  const inventoryData = products.slice(0, 5).map(p => ({
    name: p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name,
    value: p.stock_count
  })).sort((a,b) => b.value - a.value);
  const PIE_COLORS = ['#3B82F6', '#10B981', '#6366F1', '#F59E0B', '#8B5CF6'];

  return (
    <div className="flex bg-gray-50/50 font-sans text-slate-900 h-screen overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-64 border-r border-gray-200' : 'w-0 overflow-hidden'} flex-shrink-0 bg-white transition-all duration-300 hidden md:flex flex-col z-20 h-full`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold mr-3 shadow-sm">
                A
            </div>
            <div>
                <h1 className="text-sm font-semibold tracking-tight text-gray-900">Arena Systems</h1>
                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Enterprise Console</p>
            </div>
        </div>
        
        <div className="flex-1 py-6 flex flex-col gap-1 px-4 overflow-y-auto custom-scrollbar">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2 mt-2">Workspace</p>
          {tabs.map(tab => {
            const isActive = activeTab === tab;
            return (
                <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                    isActive 
                    ? 'bg-blue-50 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                >
                {tab === 'Analytics' && <LayoutDashboard size={18} className={isActive ? 'text-blue-700' : 'text-gray-400'} />}
                {tab === 'Users' && <Users size={18} className={isActive ? 'text-blue-700' : 'text-gray-400'} />}
                {tab === 'Inventory' && <Package size={18} className={isActive ? 'text-blue-700' : 'text-gray-400'} />}
                {tab === 'Orders' && <ArrowRightLeft size={18} className={isActive ? 'text-blue-700' : 'text-gray-400'} />}
                {tab === 'Support' && <MessageSquareWarning size={18} className={isActive ? 'text-blue-700' : 'text-gray-400'} />}
                {tab}
                </button>
            )
          })}
        </div>
        
        <div className="p-4 border-t border-gray-200 mt-auto shrink-0 bg-gray-50/50">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors cursor-pointer border border-transparent hover:border-gray-200 hover:shadow-sm">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm border border-blue-300/50">
                    AD
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-900 leading-tight">Admin User</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                </div>
            </div>
        </div>
      </aside>

      {/* MOBILE TOP NAV */}
      <nav className="md:hidden flex overflow-x-auto w-full border-b border-gray-200 bg-white absolute top-0 z-30 pt-4 custom-scrollbar shadow-sm text-sm font-medium">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-6 py-3 border-b-2 transition-all ${
                activeTab === tab 
                  ? 'border-blue-600 text-blue-700' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
      </nav>

      {/* MAIN CONTENT PORTAL */}
      <div className="flex-1 flex flex-col h-full overflow-hidden pt-14 md:pt-0 relative bg-[#FDFDFD]">
        
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-10 z-10 shrink-0">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-gray-900 hidden md:flex items-center justify-center transition-colors">
                    <Menu size={20} />
                </button>
                <div className="text-sm font-medium text-gray-400 hidden sm:block">
                    Dashboard <span className="mx-2 text-gray-300">/</span> <span className="text-gray-900">{activeTab}</span>
                </div>
            </div>
            <div className="flex items-center gap-5">
                <div className="relative hidden lg:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search records, users, products..." 
                        className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none w-72 placeholder-gray-400 shadow-sm"
                    />
                </div>
                <button className="text-gray-400 hover:text-gray-900 relative transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto w-full custom-scrollbar">
            <div className="max-w-[1400px] mx-auto p-6 md:p-10 space-y-8 pb-32">
                
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{activeTab} Overview</h2>
                        <p className="text-sm text-gray-500 mt-1.5 font-medium">Manage and monitor your business metrics efficiently.</p>
                    </div>
                    {activeTab === 'Analytics' && (
                        <button className="bg-white border border-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm hover:bg-gray-50 shadow-sm transition-all focus:ring-2 focus:ring-gray-100 active:bg-gray-100">
                            Download Report
                        </button>
                    )}
                </header>

                <div className="animate-in slide-in-from-bottom-2 fade-in duration-300">
                
                {/* ============================== */}
                {/* TAB: ANALYTICS */}
                {/* ============================== */}
                {activeTab === 'Analytics' && (
                    <div className="space-y-6">
                        {/* High-Level Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-110"></div>
                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <h3 className="text-sm font-semibold text-gray-500">Gross Revenue</h3>
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100/50">
                                        <IndianRupee size={18} />
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2 relative z-10">
                                    <h4 className="text-3xl font-bold text-gray-900 tracking-tight">₹{(totalRevenue / 1000).toFixed(1)}k</h4>
                                </div>
                                <div className="mt-4 flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 w-fit px-2.5 py-1 rounded-full relative z-10">
                                    <TrendingUp size={14} className="mr-1.5" /> +12.5% from last month
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-110"></div>
                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <h3 className="text-sm font-semibold text-gray-500">Inventory Valuation</h3>
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/50">
                                        <Package size={18} />
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2 relative z-10">
                                    <h4 className="text-3xl font-bold text-gray-900 tracking-tight">₹{(totalInventoryValue / 1000).toFixed(1)}k</h4>
                                </div>
                                <div className="mt-4 flex items-center text-xs font-medium text-gray-500 relative z-10">
                                    Stable logistics capacity reported
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-110"></div>
                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <h3 className="text-sm font-semibold text-gray-500">Restock Alerts</h3>
                                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100/50">
                                        <AlertTriangle size={18} />
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2 relative z-10">
                                    <h4 className="text-3xl font-bold text-gray-900 tracking-tight">{lowStockItems}</h4>
                                </div>
                                <div className="mt-4 flex items-center text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-100 w-fit px-2.5 py-1 rounded-full cursor-pointer hover:bg-rose-100 transition-colors relative z-10" onClick={() => setActiveTab('Inventory')}>
                                    <ArrowRightLeft size={14} className="mr-1.5" /> Requires immediate attention
                                </div>
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:col-span-2 flex flex-col h-[400px]">
                                <h3 className="text-base font-bold text-gray-900 mb-1">Revenue Trajectory</h3>
                                <p className="text-sm text-gray-500 mb-8 font-medium">Daily sales overview across systems</p>
                                <div className="flex-1 w-full relative">
                                    <div className="absolute inset-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={salesData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} dy={10} fontWeight={500} />
                                                <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} fontWeight={500} />
                                                <RechartsTooltip 
                                                    cursor={{ stroke: '#E5E7EB', strokeWidth: 1, strokeDasharray: '4 4' }}
                                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', fontSize: '13px', padding: '12px' }}
                                                    formatter={(value) => [<span className="font-semibold text-blue-600">₹{value}</span>, <span className="text-gray-500">Gross Volume</span>]}
                                                    labelStyle={{ fontWeight: '700', color: '#111827', marginBottom: '8px' }}
                                                />
                                                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: '#fff', stroke: '#3B82F6', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col h-[400px]">
                                <h3 className="text-base font-bold text-gray-900 mb-1">Top Inventory</h3>
                                <p className="text-sm text-gray-500 mb-8 font-medium">Volume allocations by SKU</p>
                                <div className="flex-1 w-full relative -mt-4">
                                    <div className="absolute inset-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={inventoryData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={65}
                                                    outerRadius={95}
                                                    paddingAngle={3}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {inventoryData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <RechartsTooltip 
                                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '13px', padding: '12px' }}
                                                    formatter={(value) => [<span className="font-semibold text-gray-900">{value} Units</span>, <span className="text-gray-500">Available</span>]}
                                                />
                                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: '500', color: '#4B5563' }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================== */}
                {/* TAB: USERS (CRM) */}
                {/* ============================== */}
                {activeTab === 'Users' && (
                    <div className="space-y-6">
                        
                        {/* Admin Action Bar */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col xl:flex-row gap-6 xl:items-center">
                            <div className="xl:w-1/4 shrink-0">
                                <h3 className="text-sm font-bold text-gray-900 mb-1">Execute Manual Order</h3>
                                <p className="text-xs text-gray-500 font-medium">Trigger backend purchasing sync directly from the console.</p>
                            </div>
                            <div className="flex-1 flex flex-col sm:flex-row gap-4">
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</label>
                                    <select 
                                        value={selectedUserId} 
                                        onChange={(e) => setSelectedUserId(e.target.value)}
                                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer shadow-sm"
                                    >
                                        {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">SKU</label>
                                    <select 
                                        value={selectedProductId} 
                                        onChange={(e) => setSelectedProductId(e.target.value)}
                                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer shadow-sm"
                                    >
                                        {products.map(p => <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5 w-full sm:w-24 shrink-0">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</label>
                                    <input 
                                        type="number" 
                                        min="1"
                                        value={orderQuantity}
                                        onChange={(e) => setOrderQuantity(Math.max(1, e.target.value))}
                                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                                    />
                                </div>
                                <button 
                                    onClick={handleExecuteOrder}
                                    className="bg-black hover:bg-gray-800 text-white rounded-lg px-6 py-2 text-sm font-medium transition-all shadow-sm focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 self-end sm:self-end h-[38px] mt-2 sm:mt-0 active:scale-[0.98]"
                                >
                                    Fulfill
                                </button>
                            </div>
                        </div>

                        {/* Customer Table */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="text-base font-bold text-gray-900">Registered Accounts</h3>
                                <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-semibold">{users.length} Users</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left align-middle whitespace-nowrap">
                                    <thead className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Customer</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Lifetime Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-700">
                                        {users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50/80 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm border border-indigo-100/50">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-gray-900">{user.name}</div>
                                                            <div className="text-xs text-gray-500">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
                                                        Active
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="font-semibold text-gray-900">₹{user.total_spent.toLocaleString()}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================== */}
                {/* TAB: INVENTORY (ERP) */}
                {/* ============================== */}
                {activeTab === 'Inventory' && (
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-gray-900">Warehouse Inventory</h3>
                                <p className="text-sm text-gray-500 mt-0.5 font-medium">Real-time sync containing ERP master records.</p>
                            </div>
                            <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-semibold">{products.length} SKUs</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left align-middle whitespace-nowrap">
                                <thead className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Product Name</th>
                                        <th className="px-6 py-4">Unit Price</th>
                                        <th className="px-6 py-4 text-right">Available Stock</th>
                                        <th className="px-6 py-4 text-right w-32">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700">
                                    {products.map((product) => {
                                        const isCritical = product.stock_count < 10;
                                        return (
                                        <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900">{product.name}</div>
                                                <div className="text-xs text-gray-400 font-mono mt-0.5">{product.id.toUpperCase()}</div>
                                            </td>
                                            <td className="px-6 py-4 font-medium">
                                                ₹{product.price.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                                                    isCritical 
                                                    ? 'bg-rose-50 text-rose-700 border-rose-200/80' 
                                                    : 'bg-white text-gray-700 border-gray-200 shadow-sm'
                                                }`}>
                                                    <Box size={14} className={`mr-1.5 ${isCritical ? 'opacity-80' : 'opacity-50'}`} /> {product.stock_count} 
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => restockProduct(product.id, 10)}
                                                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-medium transition-all shadow-sm focus:ring-2 focus:ring-gray-200 active:scale-[0.97]"
                                                >
                                                    Restock (10)
                                                </button>
                                            </td>
                                        </tr>
                                    )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ============================== */}
                {/* TAB: ORDERS / LOGS */}
                {/* ============================== */}
                {activeTab === 'Orders' && (
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                        <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div>
                                <h3 className="text-base font-bold text-gray-900">System Logs</h3>
                                <p className="text-sm text-gray-500 mt-0.5 font-medium">Cross-system validation ledger.</p>
                            </div>
                            <div className="bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-semibold flex items-center justify-center border border-blue-100/50">
                                <Clock size={14} className="mr-1.5 opacity-70"/> {logs.length} Network Events
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto min-h-[400px]">
                            {logs.length === 0 ? (
                                <div className="p-16 text-center flex flex-col items-center justify-center h-full">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 mb-4 shadow-sm">
                                        <Clock size={24} className="text-gray-400" />
                                    </div>
                                    <p className="text-base font-semibold text-gray-900 mb-1">Ledger is Empty</p>
                                    <p className="text-sm text-gray-500 font-medium">Executions will be recorded here intrinsically.</p>
                                </div>
                            ) : (
                                <table className="w-full text-sm text-left align-middle whitespace-nowrap">
                                    <thead className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Timestamp</th>
                                            <th className="px-6 py-4">Action Hook</th>
                                            <th className="px-6 py-4">Initiator</th>
                                            <th className="px-6 py-4">Payload Target</th>
                                            <th className="px-6 py-4 text-right">Financial Net</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
                                        {logs.map((log) => (
                                            <tr key={log.id} className="hover:bg-gray-50/80 transition-colors">
                                                <td className="px-6 py-4 font-mono text-xs text-gray-400">
                                                    {log.timestamp}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border shadow-sm ${
                                                        log.action.includes('Restock') 
                                                            ? 'bg-blue-50 text-blue-700 border-blue-200/50' 
                                                            : 'bg-emerald-50 text-emerald-700 border-emerald-200/50'
                                                    }`}>
                                                        {log.action}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-gray-900">{log.user}</td>
                                                <td className="px-6 py-4 text-gray-500 truncate max-w-[200px]">{log.product}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className={`font-semibold ${log.amount > 0 ? 'text-gray-900' : 'text-gray-400'}`}>
                                                        {log.amount > 0 ? `+₹${log.amount.toLocaleString()}` : '--'}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}

                {/* ============================== */}
                {/* TAB: SUPPORT / COMPLAINTS */}
                {/* ============================== */}
                {activeTab === 'Support' && (
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-gray-900">Support Center</h3>
                                <p className="text-sm text-gray-500 mt-0.5 font-medium">Review and manage generated help tickets.</p>
                            </div>
                            <span className="bg-orange-50 text-orange-700 rounded-full px-3 py-1 text-xs font-semibold flex items-center justify-center border border-orange-100/50">
                                {complaints.filter(c => c.status !== 'Resolved').length} Active
                            </span>
                        </div>
                        <div className="overflow-x-auto min-h-[400px]">
                            {complaints.length === 0 ? (
                                <div className="p-16 text-center flex flex-col items-center justify-center h-full">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 mb-4 shadow-sm">
                                        <CheckCircle2 size={24} className="text-gray-400" />
                                    </div>
                                    <p className="text-base font-semibold text-gray-900 mb-1">Inbox Zero</p>
                                    <p className="text-sm text-gray-500 font-medium">All support tickets have been resolved.</p>
                                </div>
                            ) : (
                                <table className="w-full text-left align-middle text-sm min-w-[700px]">
                                    <thead className="bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4 w-1/4">Requester</th>
                                            <th className="px-6 py-4 w-1/2">Request Description</th>
                                            <th className="px-6 py-4 text-center">Status</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-700">
                                        {complaints.map((ticket) => (
                                            <tr key={ticket.id} className="hover:bg-gray-50/80 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-semibold text-gray-900 mb-0.5">{ticket.user}</div>
                                                    <div className="text-xs text-gray-500">{ticket.email}</div>
                                                    <div className="text-[10px] text-gray-400 mt-1 font-mono uppercase tracking-wider">{ticket.date}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-700 leading-relaxed font-medium">{ticket.issue}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm ${
                                                        ticket.status === 'Resolved' 
                                                            ? 'bg-gray-50 text-gray-600 border-gray-200/60'
                                                        : ticket.status === 'In Progress'
                                                            ? 'bg-blue-50 text-blue-700 border-blue-200/50'
                                                            : 'bg-orange-50 text-orange-700 border-orange-200/50'
                                                    }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                                            ticket.status === 'Resolved' ? 'bg-gray-400' : ticket.status === 'In Progress' ? 'bg-blue-500' : 'bg-orange-500'
                                                        }`}></span>
                                                        {ticket.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    {ticket.status !== 'Resolved' ? (
                                                        <button 
                                                            onClick={() => resolveComplaint(ticket.id)}
                                                            className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-50 transition-all shadow-sm focus:ring-2 focus:ring-gray-200 active:scale-[0.97]"
                                                        >
                                                            Resolve
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-transparent mr-1">Closed</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}
                </div>
            </div>
        </main>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #D1D5DB; }
      `}</style>
    </div>
  );
}
