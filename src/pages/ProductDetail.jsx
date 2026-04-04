import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { retailProducts, loopProducts, rentalProducts } from '../data/dummyData';
import { ShoppingCart, Star, ShieldCheck, Truck, RefreshCcw, Calendar, History } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Breadcrumbs from '../components/Breadcrumbs';
import GearPassportTimeline from '../components/GearPassportTimeline';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [added, setAdded] = useState(false);
    
    // Personalization for Retail items
    const [isPersonalized, setIsPersonalized] = useState(false);
    const [personalizationName, setPersonalizationName] = useState('');

    const [recommendedProducts, setRecommendedProducts] = useState([]);

    const breadcrumbLinks = useMemo(() => {
        if (!product) return [];
        const links = [];
        if (product.id.startsWith('r')) {
            links.push({ name: 'Retail', path: '/retail' });
        } else if (product.id.startsWith('l')) {
            links.push({ name: 'Loop', path: '/loop' });
        } else if (product.id.startsWith('rt')) {
            links.push({ name: 'Access', path: '/access' });
        }
        
        if (product.category) {
            links.push({ name: product.category, path: product.id.startsWith('r') ? '/retail' : product.id.startsWith('l') ? '/loop' : '/access' });
        }
        return links;
    }, [product]);

    useEffect(() => {
        const allProducts = [...retailProducts, ...loopProducts, ...rentalProducts];
        const foundProduct = allProducts.find(p => p.id === id);
        if (foundProduct) {
            setProduct(foundProduct);
            setMainImage(foundProduct.image);

            // Calculate Recommendations
            const recs = allProducts.filter(p => p.id !== id && p.category === foundProduct.category).slice(0, 4);
            if (recs.length < 4) {
                const others = allProducts.filter(p => p.id !== id && !recs.find(r => r.id === p.id)).slice(0, 4 - recs.length);
                setRecommendedProducts([...recs, ...others]);
            } else {
                setRecommendedProducts(recs);
            }
        } else {
            navigate('/retail');
        }
    }, [id, navigate]);

    if (!product) return null;

    const thumbnails = [
        product.image,
        product.image + '&auto=format&fit=crop&q=80&w=800&exp=1',
        product.image + '&auto=format&fit=crop&q=80&w=800&exp=2',
        product.image + '&auto=format&fit=crop&q=80&w=800&exp=3',
    ];

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    // Mock Gear Passport Data for the demo
    const mockLogs = [
        { _id: '1', eventType: 'Cleaned', eventDate: '2024-03-15', description: 'Deep sanitized using hospital-grade UV-C and eco-detergents.' },
        { _id: '2', eventType: 'Trip', eventDate: '2024-02-10', description: 'Successfully survived a 3-day trek in the Sahyadri mountains.' },
        { _id: '3', eventType: 'Repaired', eventDate: '2024-01-05', description: 'Minor stitching reinforcement on the shoulder straps.' },
        { _id: '4', eventType: 'Cleaned', eventDate: '2023-12-20', description: 'Post-monsoon professional dry cleaning.' }
    ];

    return (
        <div className="bg-cream min-h-screen pt-32 pb-24 px-8">
            <div className="max-w-7xl mx-auto">
                <Breadcrumbs links={breadcrumbLinks} active={product.name} />
                
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left: Image Gallery */}
                    <div className="lg:w-1/2 flex gap-6 h-[600px]">
                        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar w-20 shrink-0">
                            {thumbnails.map((img, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={`aspect-square border-2 transition-all ${mainImage === img ? 'border-primary' : 'border-transparent hover:border-secondary/20'}`}
                                >
                                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                        <div className="flex-1 bg-white border border-secondary/5 overflow-hidden">
                            <img src={mainImage} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 cursor-zoom-in" alt={product.name} />
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="lg:w-1/2 flex flex-col pt-4">
                        <div className="mb-2 uppercase tracking-widest text-primary font-bold text-xs">
                            {product.category || 'Gear'}
                        </div>
                        <h1 className="text-4xl font-bold text-secondary mb-4 tracking-tight leading-tight">
                            {product.name}
                        </h1>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex text-primary">
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                            </div>
                            <span className="text-sm opacity-60 font-medium">124 Reviews</span>
                        </div>

                        <div className="text-3xl font-medium text-secondary mb-8">
                            ₹{product.price || product.depreciatedPrice || product.dailyRate}
                            {product.dailyRate && <span className="text-sm opacity-50 font-normal">/day</span>}
                        </div>

                        <p className="text-secondary/70 leading-relaxed mb-6">
                            {product.description} Built for performance and designed with premium quiet luxury aesthetics. Elevate your game with this top-tier gear.
                        </p>

                        <div className="mb-8">
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-3 text-secondary">Key Highlights</h4>
                            <ul className="space-y-2 text-sm text-secondary/80">
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full shrink-0"></div> {product.features?.[0] || 'Professional Grade Materials'}</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full shrink-0"></div> {product.features?.[1] || 'Eco-Friendly Manufacturing'}</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full shrink-0"></div> {product.features?.[2] || '1 Year Comprehensive Warranty'}</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full shrink-0"></div> {product.features?.[3] || 'Campus-Exclusive Support'}</li>
                            </ul>
                        </div>

                        {/* Personalization Section (Retail only) */}
                        {product.id.startsWith('r') && (
                            <div className="mb-8 p-6 bg-secondary/5 border border-secondary/10 relative overflow-hidden group transition-all duration-500 hover:border-primary/20">
                                <label className="flex items-center gap-4 cursor-pointer">
                                    <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${isPersonalized ? 'border-primary bg-primary' : 'border-secondary/20'}`}>
                                        {isPersonalized && <div className="w-2 h-2 bg-cream"></div>}
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        className="hidden" 
                                        checked={isPersonalized}
                                        onChange={(e) => setIsPersonalized(e.target.checked)}
                                    />
                                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary group-hover:text-primary transition-colors">
                                        Personalize with your name for free?
                                    </span>
                                </label>
                                
                                {isPersonalized && (
                                    <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <p className="text-[9px] uppercase font-bold tracking-widest text-secondary/40 mb-3">One Word Name Preference</p>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. MOHISH"
                                            className="w-full bg-white border border-secondary/10 p-4 text-xs outline-none focus:border-primary transition-colors uppercase font-bold tracking-[0.2em] placeholder:opacity-30"
                                            value={personalizationName}
                                            onChange={(e) => {
                                                // Limit to one word
                                                const word = e.target.value.trim().split(' ')[0] || '';
                                                setPersonalizationName(word.toUpperCase());
                                            }}
                                        />
                                        <p className="mt-2 text-[8px] italic opacity-40 uppercase font-bold tracking-tighter">Precision laser engraved on specific gear surfaces.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <button 
                            onClick={handleAdd}
                            className="bg-primary text-cream py-5 px-8 font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-3 w-full max-w-md shadow-xl mb-12"
                        >
                            {product.dailyRate ? <Calendar size={20} /> : <ShoppingCart size={20} />}
                            {added ? 'Action Completed' : (product.dailyRate ? 'Check Availability' : 'Add to Cart')}
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-secondary/10">
                            <div className="flex gap-4 items-start">
                                <Truck className="text-primary shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-sm uppercase">Elite Delivery</h4>
                                    <p className="text-xs opacity-60 mt-1">Under 2 hours for campus locations.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <ShieldCheck className="text-primary shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-sm uppercase">Quality Verified</h4>
                                    <p className="text-xs opacity-60 mt-1">100% authentic premium gear.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start md:col-span-2">
                                <RefreshCcw className="text-primary shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-sm uppercase">7-Day Return</h4>
                                    <p className="text-xs opacity-60 mt-1">Hassle-free campus pickup for any returns.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gear Passport Integration for Rentals */}
                {product.dailyRate && (
                    <div className="mt-24">
                        <GearPassportTimeline logs={mockLogs} />
                    </div>
                )}

                {/* Customer Reviews Section */}
                <div className="mt-32 pt-16 border-t border-secondary/10">
                    <h2 className="text-2xl font-bold uppercase tracking-tight mb-12 flex items-center gap-4">
                        Customer Reviews <span className="text-primary font-medium text-lg text-opacity-50">(4.8/5)</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { name: "Rahul S.", rating: 5, date: "2 weeks ago", text: "Incredible quality. Ordered and got it to my dorm in 45 mins!" },
                            { name: "Neha M.", rating: 5, date: "1 month ago", text: "The balance on this product is perfect. Looks very premium too." },
                            { name: "Aryan P.", rating: 4, date: "3 months ago", text: "Great gear. Highly recommended for anyone serious about their sport." }
                        ].map((rev, i) => (
                            <div key={i} className="p-8 bg-white border border-secondary/5">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-bold text-sm">{rev.name}</h4>
                                        <p className="text-[10px] uppercase opacity-40 mt-1">{rev.date}</p>
                                    </div>
                                    <div className="flex text-primary/80">
                                        {[...Array(rev.rating)].map((_, idx) => <Star key={idx} fill="currentColor" size={12} />)}
                                    </div>
                                </div>
                                <p className="text-sm opacity-70 leading-relaxed italic">"{rev.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommended Products */}
                {recommendedProducts.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-secondary/10">
                        <h2 className="text-2xl font-bold uppercase tracking-tight mb-12">
                            Recommended For You
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {recommendedProducts.map(rec => (
                                <Link 
                                    key={rec.id} 
                                    to={`/product/${rec.id}`}
                                    className="group block bg-white border border-secondary/5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="aspect-[4/5] overflow-hidden bg-cream">
                                        <img 
                                            src={rec.image} 
                                            alt={rec.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <div className="text-[9px] uppercase tracking-widest text-primary font-bold mb-1">{rec.category || 'Gear'}</div>
                                        <h4 className="font-bold text-sm text-secondary line-clamp-1 mb-2">{rec.name}</h4>
                                        <div className="text-sm font-medium text-secondary">
                                           ₹{rec.price || rec.depreciatedPrice || rec.dailyRate}{rec.dailyRate ? <span className="opacity-50 text-xs">/day</span> : ''}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
