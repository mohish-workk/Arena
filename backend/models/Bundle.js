const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    targetAudience: {
        type: String,
    },
    includedProducts: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // References Product collection
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    coverImageUrl: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

bundleSchema.virtual('basePrice').get(function() {
    if (!this.includedProducts || this.includedProducts.length === 0) return 0;
    if (!this.includedProducts[0].product || !this.includedProducts[0].product.dailyRate) return 0;

    return this.includedProducts.reduce((total, item) => {
        return total + (item.product.dailyRate * item.quantity);
    }, 0);
});

bundleSchema.virtual('bundlePrice').get(function() {
    const base = this.basePrice;
    return base - (base * (this.discountPercentage / 100));
});

module.exports = mongoose.model('Bundle', bundleSchema);
