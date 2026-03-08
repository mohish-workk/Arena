export const retailProducts = [
    {
        id: 'r1',
        name: 'Pro Performance Cricket Bat',
        category: 'Cricket',
        price: 450,
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800',
        description: 'Grade 1 English Willow, handcrafted for extreme power and balance.'
    },
    {
        id: 'r2',
        name: 'Signature Surf Wax - Tropical',
        category: 'Surfing',
        price: 15,
        image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800',
        description: 'Eco-friendly, long-lasting grip for warm water surfing.'
    },
    {
        id: 'r3',
        name: 'Alpine Explorer Tent',
        category: 'Camping',
        price: 320,
        image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800',
        description: 'Ultra-lightweight 4-season tent with advanced ventilation.'
    },
    {
        id: 'r4',
        name: 'Precision Climbing Harness',
        category: 'Climbing',
        price: 120,
        image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=800',
        description: 'Ergonomic design for maximum comfort during long climbs.'
    }
];

export const loopProducts = [
    {
        id: 'l1',
        name: 'Vintage Leather Cricket Ball',
        originalPrice: 40,
        depreciatedPrice: 15,
        condition: 'Good',
        sellerName: 'Alex J.',
        trustScore: 4.8,
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800',
        description: 'Slightly used in one match. Excellent seam.'
    },
    {
        id: 'l2',
        name: 'Carbon Fiber Road Bike',
        originalPrice: 2500,
        depreciatedPrice: 1800,
        condition: 'Mint',
        sellerName: 'Sarah K.',
        trustScore: 5.0,
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800',
        description: 'Only ridden twice. Lightweight and incredibly fast.'
    },
    {
        id: 'l3',
        name: 'Premium Yoga Mat',
        originalPrice: 80,
        depreciatedPrice: 35,
        condition: 'Fair',
        sellerName: 'Mike T.',
        trustScore: 4.2,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
        description: 'Visible wear but still provides great grip and cushioning.'
    }
];

export const rentalProducts = [
    {
        id: 'rt1',
        name: 'GoPro Hero 11 Black',
        dailyRate: 25,
        securityDeposit: 200,
        features: ['5.3K Video', 'HyperSmooth 5.0', 'Waterproof'],
        image: 'https://images.unsplash.com/photo-1526170315873-3a56162824cf?auto=format&fit=crop&q=80&w=800',
        description: 'The ultimate action camera for your adventures.'
    },
    {
        id: 'rt2',
        name: 'Heavy Duty Expedition Pack',
        dailyRate: 15,
        securityDeposit: 100,
        features: ['75L Capacity', 'Weather Resistant', 'Adjustable Frame'],
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800',
        description: 'Ideal for multi-day treks and high-volume gear.'
    },
    {
        id: 'rt3',
        name: 'Portable Solar Power Station',
        dailyRate: 40,
        securityDeposit: 300,
        features: ['500Wh Capacity', 'Multiple Ports', 'Fast Charging'],
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800',
        description: 'Keep your devices charged anywhere in the wild.'
    }
];

// src/data/dummyData.js (append to existing)
export const orders = [
    {
        id: 'ORD-001',
        customer: 'Rahul Sharma',
        date: '2026-03-01',
        status: 'Delivered',
        total: 4500,
        items: ['Pro Performance Cricket Bat'],
        paymentMethod: 'Card'
    },
    {
        id: 'ORD-002',
        customer: 'Sneha Patel',
        date: '2026-03-02',
        status: 'Processing',
        total: 1200,
        items: ['Eco-Grip Yoga Mat'],
        paymentMethod: 'Credits'
    },
    {
        id: 'ORD-003',
        customer: 'Aman Verma',
        date: '2026-03-03',
        status: 'Shipped',
        total: 3200,
        items: ['Alpine Explorer Tent'],
        paymentMethod: 'UPI'
    },
    {
        id: 'ORD-004',
        customer: 'Priya Singh',
        date: '2026-03-04',
        status: 'Pending',
        total: 1500,
        items: ['Premium Climbing Harness'],
        paymentMethod: 'Card'
    },
    {
        id: 'ORD-005',
        customer: 'Karan Mehta',
        date: '2026-03-05',
        status: 'Cancelled',
        total: 800,
        items: ['Vintage Leather Cricket Ball'],
        paymentMethod: 'Credits'
    }
];

export const inventory = [
    {
        id: 'INV-001',
        name: 'Pro Performance Cricket Bat',
        category: 'Cricket',
        stock: 15,
        threshold: 5,
        status: 'In Stock'
    },
    {
        id: 'INV-002',
        name: 'Signature Surf Wax - Tropical',
        category: 'Surfing',
        stock: 3,
        threshold: 5,
        status: 'Low Stock'
    },
    {
        id: 'INV-003',
        name: 'Alpine Explorer Tent',
        category: 'Camping',
        stock: 0,
        threshold: 2,
        status: 'Out of Stock'
    },
    {
        id: 'INV-004',
        name: 'Precision Climbing Harness',
        category: 'Climbing',
        stock: 8,
        threshold: 3,
        status: 'In Stock'
    },
    {
        id: 'INV-005',
        name: 'Carbon Fiber Road Bike',
        category: 'Cycling',
        stock: 1,
        threshold: 2,
        status: 'Low Stock'
    },
    {
        id: 'INV-006',
        name: 'GoPro Hero 11 Black',
        category: 'Electronics',
        stock: 0,
        threshold: 1,
        status: 'Out of Stock'
    }
];