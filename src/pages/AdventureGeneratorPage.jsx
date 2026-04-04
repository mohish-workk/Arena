import AdventureGenerator from '../components/AdventureGenerator';

const AdventureGeneratorPage = () => {
    return (
        <div className="bg-cream min-h-screen pt-32 pb-24 px-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-16 text-center">
                    <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-primary mb-4 block underline underline-offset-8">Neural Intelligence</span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-secondary uppercase italic">
                        Adventure Architect.
                    </h1>
                </header>

                <div className="bg-white/40 backdrop-blur-sm border border-white/20 p-4 md:p-8 rounded-[40px] shadow-2xl">
                    <AdventureGenerator />
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Precision Mapping</h3>
                        <p className="text-xs text-secondary/50 leading-relaxed">Our AI analyzes regional topography and climate data to suggest the most optimal coordinates for your specific skill level.</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Market Intelligence</h3>
                        <p className="text-xs text-secondary/50 leading-relaxed">Whether you want to buy new, save with pre-owned, or rent for the weekend, we scan the entire Arena ecosystem for availability.</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Logistics Engine</h3>
                        <p className="text-xs text-secondary/50 leading-relaxed">The generator identifies exactly what you need, ensuring you don't over-pack or under-prepare for the mission ahead.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdventureGeneratorPage;
