import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { bundleProducts, retailProducts, loopProducts, rentalProducts } from '../data/dummyData';
import { ShoppingBag, Star, ShieldCheck, Truck, RefreshCcw, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Breadcrumbs from '../components/Breadcrumbs';

const BundleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, showToast } = useCart();
    
    const [bundle, setBundle] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [added, setAdded] = useState(false);
    const [recommendedBundles, setRecommendedBundles] = useState([]);
    const [populatedItems, setPopulatedItems] = useState([]);

    useEffect(() => {
        const foundBundle = bundleProducts.find(b => b.id === id);
        
        if (foundBundle) {
            setBundle(foundBundle);
            setMainImage(foundBundle.coverImage);
            
            // Populate the items with real product images by searching all product arrays
            const allProducts = [...retailProducts, ...loopProducts, ...rentalProducts];
            const populated = foundBundle.items.map(item => {
                const fullProduct = allProducts.find(p => p.id === item.id) || {};
                return { ...item, image: fullProduct.image || foundBundle.coverImage }; 
            });
            setPopulatedItems(populated);

            // Recommendations (other bundles)
            const recs = bundleProducts.filter(b => b.id !== id).slice(0, 4);
            setRecommendedBundles(recs);
            
        } else {
            navigate('/access');
        }
    }, [id, navigate]);

    if (!bundle) return null;

    // The thumbnails array starts with the main cover, then loops over included item images.
    // To prevent duplicate images in a row visually, we can use a Set, but let's just map them safely.
    const thumbnails = [
        bundle.coverImage,
        ...populatedItems.map(item => item.image)
    ];

    const handleAdd = () => {
        // Adding a bundle adds its individual items with a bundle discount flag potentially
        // For now, we'll iterate through the items and add them.
        populatedItems.forEach(item => {
            addToCart({
                ...item,
                bundleInfo: {
                    name: bundle.name,
                    discount: bundle.discountPercentage
                }
            }, item.quantity);
        });
        
        showToast(`${bundle.name} added to config`);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-cream min-h-screen pt-32 pb-24 px-8">
            <div className="max-w-7xl mx-auto">
                <Breadcrumbs links={[{ name: 'Access', path: '/access' }]} active={bundle.name} />

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left: Image Gallery */}
                    <div className="lg:w-1/2 flex gap-6 h-[600px]">
                        {/* Thumbnails */}
                        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar w-20 shrink-0">
                            {thumbnails.map((img, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={`aspect-square border-2 transition-all overflow-hidden ${mainImage === img ? 'border-primary' : 'border-transparent hover:border-secondary/20'}`}
                                >
                                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="flex-1 bg-white border border-secondary/5 overflow-hidden">
                            <img src={mainImage} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-zoom-in" alt={bundle.name} />
                        </div>
                    </div>

                    {/* Right: Bundle Details */}
                    <div className="lg:w-1/2 flex flex-col pt-4">
                        <h1 className="text-4xl font-bold text-secondary mb-4 tracking-tight leading-tight">
                            {bundle.name}
                        </h1>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex text-primary">
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                                <Star fill="currentColor" size={16} />
                            </div>
                            <span className="text-sm opacity-60 font-medium">98 Reviews</span>
                        </div>

                        {/* Pricing Box emphasizing savings */}
                        <div className="bg-primary/5 p-6 border border-primary/10 mb-8 flex items-end justify-between">
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2">Original Aggregate Price</h4>
                                <div className="text-lg font-medium text-secondary/40 line-through">
                                    ₹{bundle.originalTotal}<span className="text-xs">/day</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Bundle Rate</h4>
                                <div className="text-4xl font-bold text-primary">
                                    ₹{bundle.bundlePrice}<span className="text-sm font-normal opacity-60">/day</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-secondary/70 leading-relaxed mb-8">
                            {bundle.description} Designed for: <strong>{bundle.targetAudience}</strong>
                        </p>

                        <div className="mb-8">
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-secondary flex items-center gap-2">
                                <Package size={16} /> Kit Includes
                            </h4>
                            <ul className="space-y-3 bg-white p-6 border border-secondary/5">
                                {populatedItems.map((item, idx) => (
                                    <li key={idx} className="flex justify-between items-center text-sm font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded overflow-hidden shadow-sm shrink-0 bg-cream">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span><span className="opacity-50 mr-2">{item.quantity}x</span>{item.name}</span>
                                        </div>
                                        <span className="text-secondary/40">₹{item.dailyRate}/day</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button 
                            onClick={handleAdd}
                            className="bg-secondary text-cream py-5 px-8 font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center justify-center gap-3 w-full shadow-xl mb-12"
                        >
                            <ShoppingBag size={20} />
                            {added ? 'Kit Added to Configurator' : 'Rent This Kit'}
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
                                    <h4 className="font-bold text-sm uppercase">Group Insured</h4>
                                    <p className="text-xs opacity-60 mt-1">Damage protection included for all items.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom: Customer Reviews Section */}
                <div className="mt-32 pt-16 border-t border-secondary/10">
                    <h2 className="text-2xl font-bold uppercase tracking-tight mb-12 flex items-center gap-4">
                        Community Field Notes <span className="text-primary font-medium text-lg text-opacity-50">(4.9/5)</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { name: "Aditya R.", rating: 5, date: "1 week ago", text: "Renting this bundle was the smartest thing we did for our trip. Everything fits together perfectly and works flawlessly." },
                            { name: "Priya M.", rating: 5, date: "3 weeks ago", text: "Saved us so much time not having to piece together the gear list individually. And the discount is solid." },
                            { name: "Karan T.", rating: 4, date: "1 month ago", text: "Great condition equipment. Would highly recommend this kit over buying for one-off weekend trips." }
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

                {/* Bottom: Recommended Bundles */}
                {recommendedBundles.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-secondary/10">
                        <h2 className="text-2xl font-bold uppercase tracking-tight mb-12">
                            Other Recommended Kits
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {recommendedBundles.map(rec => (
                                <Link 
                                    key={rec.id} 
                                    to={`/bundle/${rec.id}`}
                                    className="group block bg-white border border-secondary/5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="aspect-video overflow-hidden bg-cream relative">
                                        <img 
                                            src={rec.coverImage} 
                                            alt={rec.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <div className="text-[9px] uppercase tracking-widest text-primary font-bold mb-1">Save {rec.discountPercentage}%</div>
                                        <h4 className="font-bold text-sm text-secondary line-clamp-1 mb-2">{rec.name}</h4>
                                        <div className="text-sm font-medium text-primary">
                                           ₹{rec.bundlePrice}<span className="opacity-50 text-xs">/day</span>
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

export default BundleDetail;
