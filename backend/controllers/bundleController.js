const Bundle = require('../models/Bundle');

// GET /api/bundles
exports.getAllBundles = async (req, res) => {
    try {
        const bundles = await Bundle.find({ isActive: true })
            .populate({
                path: 'includedProducts.product',
                select: 'name dailyRate image category'
            });

        const responseData = bundles.map(bundle => {
            let originalTotal = 0;
            const items = bundle.includedProducts.map(item => {
                const subtotal = item.product.dailyRate * item.quantity;
                originalTotal += subtotal;
                return {
                    id: item.product._id,
                    name: item.product.name,
                    quantity: item.quantity,
                    dailyRate: item.product.dailyRate,
                    image: item.product.image
                };
            });

            const discountAmount = originalTotal * (bundle.discountPercentage / 100);
            const bundlePrice = originalTotal - discountAmount;

            return {
                id: bundle._id,
                name: bundle.name,
                description: bundle.description,
                targetAudience: bundle.targetAudience,
                coverImage: bundle.coverImageUrl,
                discountPercentage: bundle.discountPercentage,
                originalTotal: Math.round(originalTotal),
                bundlePrice: Math.round(bundlePrice),
                items: items
            };
        });

        res.status(200).json({ success: true, count: responseData.length, data: responseData });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error fetching bundles.' });
    }
};
