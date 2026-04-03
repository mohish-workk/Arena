import React from 'react';
import { Sparkles, Mountain, Wrench, CheckCircle2, History } from 'lucide-react';

const GearPassportTimeline = ({ logs = [] }) => {
    
    const getIcon = (type) => {
        switch (type) {
            case 'Cleaned': return <Sparkles size={16} className="text-blue-400" />;
            case 'Trip': return <Mountain size={16} className="text-emerald-400" />;
            case 'Repaired': return <Wrench size={16} className="text-orange-400" />;
            default: return <CheckCircle2 size={16} className="text-primary" />;
        }
    };

    const stats = {
        trips: logs.filter(l => l.eventType === 'Trip').length,
        cleanings: logs.filter(l => l.eventType === 'Cleaned').length
    };

    return (
        <div className="bg-secondary/5 border border-secondary/10 p-8 rounded-none mt-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <History size={120} />
            </div>

            <div className="relative z-10">
                <div className="mb-10">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-2">Asset Intelligence</p>
                    <h3 className="text-2xl font-bold uppercase tracking-tight italic">Gear Passport</h3>
                    <p className="text-sm opacity-60 mt-4 max-w-lg leading-relaxed">
                        This specific unit has survived <span className="text-secondary font-bold">{stats.trips} trips</span> and has been <span className="text-secondary font-bold">cleaned {stats.cleanings} times</span>. Our data-driven maintenance ensures your safety and gear performance.
                    </p>
                </div>

                <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-secondary/10">
                    {logs.length > 0 ? logs.map((log, index) => (
                        <div key={log._id || index} className="flex gap-6 relative group">
                            <div className="w-6 h-6 rounded-full bg-cream border border-secondary/20 flex items-center justify-center z-10 group-hover:border-primary transition-colors">
                                {getIcon(log.eventType)}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-sm font-bold uppercase tracking-widest">{log.eventType}</span>
                                    <span className="text-[10px] opacity-40 font-bold">{new Date(log.eventDate || log.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-xs opacity-60 italic leading-relaxed">"{log.description}"</p>
                            </div>
                        </div>
                    )) : (
                        <p className="text-xs opacity-40 italic">New unit. Ready for its first adventure.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GearPassportTimeline;
