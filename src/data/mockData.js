// Mock Companies Data - Enhanced for Multi-Tenant Demo with Full SaaS Features
export const companies = [
  { 
    id: 1, 
    name: "Tech Solutions Ltd", 
    code: "TECH001",
    address: "123 Business Park, Cape Town, 8001",
    phone: "+27 21 555 0123",
    email: "admin@techsolutions.co.za",
    currency: "ZAR",
    taxRate: 0.15,
    warehouse: "Main Warehouse",
    subscription: "Enterprise",
    userLimit: 100,
    currentUsers: 35,
    deviceLimit: 25,
    currentDevices: 12,
    status: "Active",
    licenseExpiry: "2025-12-31",
    features: {
      multiWarehouse: true,
      giftCards: true,
      loyaltyProgram: true,
      whiteLabel: true,
      advancedReporting: true,
      paymentGateways: ["Adumo", "Yoco", "PayFast"]
    },
    warehouses: [
      { id: 'main', name: 'Main Warehouse', location: 'Cape Town', capacity: '95%' },
      { id: 'secondary', name: 'Secondary Store', location: 'Stellenbosch', capacity: '67%' },
      { id: 'online', name: 'Online Fulfillment', location: 'Cape Town', capacity: '45%' }
    ],
    branding: {
      logo: "/tech-solutions-logo.png",
      primaryColor: "#2a843f",
      secondaryColor: "#004089",
      companyName: "Tech Solutions POS"
    }
  },
  { 
    id: 2, 
    name: "Retail Dynamics", 
    code: "RET002",
    address: "456 Shopping District, Johannesburg, 2001",
    phone: "+27 11 444 5678",
    email: "info@retaildynamics.co.za",
    currency: "ZAR",
    taxRate: 0.15,
    warehouse: "Distribution Center",
    subscription: "Premium",
    userLimit: 50,
    currentUsers: 23,
    deviceLimit: 15,
    currentDevices: 8,
    status: "Active",
    licenseExpiry: "2025-09-15",
    features: {
      multiWarehouse: true,
      giftCards: true,
      loyaltyProgram: true,
      whiteLabel: false,
      advancedReporting: true,
      paymentGateways: ["Adumo", "Yoco"]
    },
    warehouses: [
      { id: 'main', name: 'Main Store', location: 'Johannesburg', capacity: '85%' },
      { id: 'branch', name: 'Branch Store', location: 'Pretoria', capacity: '72%' }
    ],
    branding: {
      logo: "/sage-logo.png",
      primaryColor: "#2a843f",
      secondaryColor: "#004089",
      companyName: "Sage POS"
    }
  },
  { 
    id: 3, 
    name: "Boutique Stores", 
    code: "BOU003",
    address: "789 Fashion Street, Durban, 4001",
    phone: "+27 31 333 9999",
    email: "contact@boutiquestores.co.za",
    currency: "ZAR",
    taxRate: 0.15,
    warehouse: "Fashion Hub",
    subscription: "Standard",
    userLimit: 15,
    currentUsers: 7,
    deviceLimit: 8,
    currentDevices: 4,
    status: "Active",
    licenseExpiry: "2025-07-20",
    features: {
      multiWarehouse: false,
      giftCards: true,
      loyaltyProgram: false,
      whiteLabel: false,
      advancedReporting: false,
      paymentGateways: ["Yoco"]
    },
    warehouses: [
      { id: 'main', name: 'Fashion Hub', location: 'Durban', capacity: '78%' }
    ],
    branding: {
      logo: "/sage-logo.png",
      primaryColor: "#2a843f",
      secondaryColor: "#004089",
      companyName: "Sage POS"
    }
  },
  { 
    id: 4, 
    name: "Service Excellence Co", 
    code: "SER004",
    address: "321 Service Drive, Port Elizabeth, 6001",
    phone: "+27 41 777 8888",
    email: "support@serviceexcellence.co.za",
    currency: "ZAR",
    taxRate: 0.15,
    warehouse: "Service Center",
    subscription: "Basic",
    userLimit: 5,
    currentUsers: 5,
    deviceLimit: 3,
    currentDevices: 3,
    status: "Warning - User Limit Reached",
    licenseExpiry: "2025-06-30",
    features: {
      multiWarehouse: false,
      giftCards: false,
      loyaltyProgram: false,
      whiteLabel: false,
      advancedReporting: false,
      paymentGateways: ["Yoco"]
    },
    warehouses: [
      { id: 'main', name: 'Service Center', location: 'Port Elizabeth', capacity: '60%' }
    ],
    branding: {
      logo: "/sage-logo.png",
      primaryColor: "#2a843f",
      secondaryColor: "#004089",
      companyName: "Sage POS"
    }
  }
]

// Enhanced Products Data with Categories and Stock Levels
export const products = [
  { 
    id: 1, 
    sku: "LAP001", 
    name: "Business Laptop", 
    description: "Dell Latitude 5520 - 16GB RAM, 512GB SSD", 
    price: 1299.99, 
    cost: 999.00,
    category: "Electronics",
    subcategory: "Computers",
    stockLevel: 15,
    minStock: 5,
    supplier: "Dell SA",
    barcode: "123456789012"
  },
  { 
    id: 2, 
    sku: "MOU001", 
    name: "Wireless Mouse", 
    description: "Logitech MX Master 3 - Ergonomic Design", 
    price: 89.99, 
    cost: 65.00,
    category: "Electronics",
    subcategory: "Accessories",
    stockLevel: 45,
    minStock: 10,
    supplier: "Logitech",
    barcode: "234567890123"
  },
  { 
    id: 3, 
    sku: "KEY001", 
    name: "Mechanical Keyboard", 
    description: "Corsair K95 RGB Platinum - Cherry MX Switches", 
    price: 199.99, 
    cost: 150.00,
    category: "Electronics",
    subcategory: "Accessories",
    stockLevel: 8,
    minStock: 5,
    supplier: "Corsair",
    barcode: "345678901234"
  },
  { 
    id: 4, 
    sku: "MON001", 
    name: "4K Monitor", 
    description: "Dell UltraSharp 27\" 4K USB-C Monitor", 
    price: 649.99, 
    cost: 500.00,
    category: "Electronics",
    subcategory: "Displays",
    stockLevel: 12,
    minStock: 3,
    supplier: "Dell SA",
    barcode: "456789012345"
  },
  { 
    id: 5, 
    sku: "DES001", 
    name: "Office Desk", 
    description: "Adjustable Height Standing Desk - 48\" x 30\"", 
    price: 449.99, 
    cost: 320.00,
    category: "Furniture",
    subcategory: "Desks",
    stockLevel: 6,
    minStock: 2,
    supplier: "Office Furniture Co",
    barcode: "567890123456"
  },
  { 
    id: 6, 
    sku: "CHA001", 
    name: "Ergonomic Chair", 
    description: "Herman Miller Aeron - Size B, Graphite", 
    price: 1395.00, 
    cost: 1100.00,
    category: "Furniture",
    subcategory: "Seating",
    stockLevel: 3,
    minStock: 1,
    supplier: "Herman Miller SA",
    barcode: "678901234567"
  },
  { 
    id: 7, 
    sku: "PRI001", 
    name: "Laser Printer", 
    description: "HP LaserJet Pro M404n - Monochrome", 
    price: 229.99, 
    cost: 180.00,
    category: "Office Equipment",
    subcategory: "Printers",
    stockLevel: 20,
    minStock: 5,
    supplier: "HP SA",
    barcode: "789012345678"
  },
  { 
    id: 8, 
    sku: "SCA001", 
    name: "Document Scanner", 
    description: "Fujitsu ScanSnap iX1600 - Desktop Scanner", 
    price: 495.00, 
    cost: 390.00,
    category: "Office Equipment",
    subcategory: "Scanners",
    stockLevel: 7,
    minStock: 2,
    supplier: "Fujitsu",
    barcode: "890123456789"
  },
  { 
    id: 9, 
    sku: "TAB001", 
    name: "Business Tablet", 
    description: "iPad Pro 12.9\" - 256GB, Wi-Fi + Cellular", 
    price: 1199.00, 
    cost: 950.00,
    category: "Electronics",
    subcategory: "Tablets",
    stockLevel: 10,
    minStock: 3,
    supplier: "Apple SA",
    barcode: "901234567890"
  },
  { 
    id: 10, 
    sku: "HEA001", 
    name: "Noise-Canceling Headphones", 
    description: "Sony WH-1000XM4 - Wireless Over-Ear", 
    price: 349.99, 
    cost: 280.00,
    category: "Electronics",
    subcategory: "Audio",
    stockLevel: 25,
    minStock: 8,
    supplier: "Sony SA",
    barcode: "012345678901"
  },
  { 
    id: 11, 
    sku: "SOF001", 
    name: "Office Software License", 
    description: "Microsoft Office 365 Business - Annual License", 
    price: 1299.00, 
    cost: 999.00,
    category: "Software",
    subcategory: "Productivity",
    stockLevel: 100,
    minStock: 20,
    supplier: "Microsoft SA",
    barcode: "012345678912"
  },
  { 
    id: 12, 
    sku: "CAB001", 
    name: "USB-C Cable", 
    description: "Thunderbolt 4 USB-C Cable - 2m", 
    price: 49.99, 
    cost: 25.00,
    category: "Electronics",
    subcategory: "Cables",
    stockLevel: 200,
    minStock: 50,
    supplier: "Apple SA",
    barcode: "123456789013"
  },
  { 
    id: 13, 
    sku: "STO001", 
    name: "External Storage", 
    description: "Samsung T7 Portable SSD - 1TB", 
    price: 199.99, 
    cost: 140.00,
    category: "Electronics",
    subcategory: "Storage",
    stockLevel: 25,
    minStock: 8,
    supplier: "Samsung SA",
    barcode: "234567890124"
  },
  { 
    id: 14, 
    sku: "WEB001", 
    name: "Webcam HD", 
    description: "Logitech C920 HD Pro Webcam", 
    price: 159.99, 
    cost: 110.00,
    category: "Electronics",
    subcategory: "Accessories",
    stockLevel: 30,
    minStock: 10,
    supplier: "Logitech",
    barcode: "345678901235"
  },
  { 
    id: 15, 
    sku: "SPK001", 
    name: "Bluetooth Speaker", 
    description: "JBL Charge 5 - Portable Bluetooth Speaker", 
    price: 249.99, 
    cost: 180.00,
    category: "Electronics",
    subcategory: "Audio",
    stockLevel: 15,
    minStock: 5,
    supplier: "JBL SA",
    barcode: "456789012346"
  },
  { 
    id: 16, 
    sku: "BAG001", 
    name: "Laptop Bag", 
    description: "Targus 15.6\" Laptop Backpack - Professional", 
    price: 89.99, 
    cost: 55.00,
    category: "Accessories",
    subcategory: "Bags",
    stockLevel: 40,
    minStock: 15,
    supplier: "Targus SA",
    barcode: "567890123457"
  },
  { 
    id: 17, 
    sku: "POW001", 
    name: "Power Bank", 
    description: "Anker PowerCore 20000mAh - Fast Charging", 
    price: 129.99, 
    cost: 85.00,
    category: "Electronics",
    subcategory: "Power",
    stockLevel: 50,
    minStock: 20,
    supplier: "Anker",
    barcode: "678901234568"
  },
  { 
    id: 18, 
    sku: "FIL001", 
    name: "Filing Cabinet", 
    description: "4-Drawer Steel Filing Cabinet - Grey", 
    price: 599.99, 
    cost: 420.00,
    category: "Furniture",
    subcategory: "Storage",
    stockLevel: 8,
    minStock: 2,
    supplier: "Office Furniture Co",
    barcode: "789012345679"
  },
  { 
    id: 19, 
    sku: "BOO001", 
    name: "Bookshelf", 
    description: "5-Tier Wooden Bookshelf - Oak Finish", 
    price: 299.99, 
    cost: 200.00,
    category: "Furniture",
    subcategory: "Storage",
    stockLevel: 6,
    minStock: 2,
    supplier: "Furniture Plus",
    barcode: "890123456780"
  },
  { 
    id: 20, 
    sku: "WHI001", 
    name: "Whiteboard", 
    description: "Magnetic Whiteboard - 120cm x 90cm", 
    price: 149.99, 
    cost: 95.00,
    category: "Office Equipment",
    subcategory: "Presentation",
    stockLevel: 12,
    minStock: 4,
    supplier: "Office Supplies Co",
    barcode: "901234567891"
  }
]

// Mock Sales Data for Dashboard
export const salesData = {
  today: {
    totalSales: 45750.00,
    transactionCount: 127,
    averageTransaction: 360.24,
    topProduct: "Business Laptop"
  },
  thisWeek: {
    totalSales: 287650.00,
    transactionCount: 842,
    averageTransaction: 341.55
  },
  thisMonth: {
    totalSales: 1145230.00,
    transactionCount: 3456,
    averageTransaction: 331.42
  }
}

// Enhanced Customer Data with Loyalty Program
export const customers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+27 11 123 4567",
    address: "123 Main Street, Johannesburg",
    loyaltyPoints: 1250,
    membershipTier: "Gold",
    totalSpent: 15890.50,
    lastVisit: "2025-06-23",
    transactions: 47,
    averageOrderValue: 338.10,
    preferences: ["Electronics", "Software"],
    birthDate: "1985-03-15",
    joinDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@businessmail.co.za",
    phone: "+27 21 987 6543",
    address: "456 Business Ave, Cape Town",
    loyaltyPoints: 890,
    membershipTier: "Silver",
    totalSpent: 8750.00,
    lastVisit: "2025-06-24",
    transactions: 23,
    averageOrderValue: 380.43,
    preferences: ["Furniture", "Office Equipment"],
    birthDate: "1990-08-22",
    joinDate: "2023-06-10"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@techcorp.co.za",
    phone: "+27 31 555 0198",
    address: "789 Corporate Plaza, Durban",
    loyaltyPoints: 2150,
    membershipTier: "Platinum",
    totalSpent: 25670.25,
    lastVisit: "2025-06-22",
    transactions: 68,
    averageOrderValue: 377.50,
    preferences: ["Electronics", "Software", "Accessories"],
    birthDate: "1982-12-03",
    joinDate: "2022-09-20"
  },
  {
    id: 4,
    name: "Lisa Davis",
    email: "lisa.davis@gmail.com",
    phone: "+27 41 777 2468",
    address: "321 Residential Road, Port Elizabeth",
    loyaltyPoints: 450,
    membershipTier: "Bronze",
    totalSpent: 3200.00,
    lastVisit: "2025-06-20",
    transactions: 12,
    averageOrderValue: 266.67,
    preferences: ["Accessories", "Audio"],
    birthDate: "1995-05-18",
    joinDate: "2024-02-28"
  },
  {
    id: 5,
    name: "Tech Solutions Ltd",
    email: "procurement@techsolutions.co.za",
    phone: "+27 11 234 5678",
    address: "555 Business Park, Johannesburg",
    loyaltyPoints: 5680,
    membershipTier: "Corporate",
    totalSpent: 89500.00,
    lastVisit: "2025-06-24",
    transactions: 156,
    averageOrderValue: 573.72,
    preferences: ["Electronics", "Software", "Office Equipment"],
    birthDate: null,
    joinDate: "2022-01-10",
    isBusinessCustomer: true,
    vatNumber: "4123456789",
    creditLimit: 50000.00
  }
]

// Gift Card System Data
export const giftCards = [
  {
    id: "GC001234567890",
    balance: 500.00,
    originalAmount: 500.00,
    status: "Active",
    issueDate: "2025-06-01",
    expiryDate: "2026-06-01",
    issuedBy: "John Smith",
    customerId: 1
  },
  {
    id: "GC001234567891",
    balance: 150.00,
    originalAmount: 200.00,
    status: "Active",
    issueDate: "2025-05-15",
    expiryDate: "2026-05-15",
    issuedBy: "Store Manager",
    customerId: 2
  },
  {
    id: "GC001234567892",
    balance: 0.00,
    originalAmount: 100.00,
    status: "Used",
    issueDate: "2025-04-10",
    expiryDate: "2026-04-10",
    issuedBy: "Sarah Johnson",
    customerId: 3
  }
]

// Payment Gateway Integration Data
export const paymentGateways = [
  {
    id: "adumo",
    name: "Adumo",
    isActive: true,
    supportedMethods: ["Card", "Contactless", "Mobile"],
    fees: {
      card: 2.95,
      contactless: 2.75,
      mobile: 2.50
    },
    settlementTime: "T+1",
    description: "Professional payment processing for businesses"
  },
  {
    id: "yoco",
    name: "Yoco",
    isActive: true,
    supportedMethods: ["Card", "Tap", "QR Code"],
    fees: {
      card: 2.85,
      tap: 2.65,
      qr: 2.35
    },
    settlementTime: "T+1",
    description: "Simple, transparent payment solutions"
  },
  {
    id: "payfast",
    name: "PayFast",
    isActive: true,
    supportedMethods: ["EFT", "Card", "Instant EFT"],
    fees: {
      eft: 1.95,
      card: 2.85,
      instant: 2.45
    },
    settlementTime: "T+2",
    description: "Secure online payment gateway"
  }
]

// Picking Slip and Order Fulfillment Data
export const pickingSlips = [
  {
    id: "PS-001",
    orderNumber: "ORD-2025-001",
    createdDate: "2025-06-24",
    status: "Pending",
    warehouse: "Main Warehouse",
    assignedTo: "Warehouse Staff",
    priority: "Normal",
    items: [
      { sku: "LAP001", name: "Business Laptop", quantity: 2, location: "A1-15" },
      { sku: "MOU001", name: "Wireless Mouse", quantity: 3, location: "B2-08" }
    ],
    totalItems: 5,
    estimatedTime: "15 minutes"
  },
  {
    id: "PS-002",
    orderNumber: "ORD-2025-002",
    createdDate: "2025-06-24",
    status: "In Progress",
    warehouse: "Secondary Store",
    assignedTo: "John Picker",
    priority: "High",
    items: [
      { sku: "KEY001", name: "Mechanical Keyboard", quantity: 1, location: "C3-22" },
      { sku: "MON001", name: "4K Monitor", quantity: 1, location: "D1-05" }
    ],
    totalItems: 2,
    estimatedTime: "10 minutes"
  }
]

// Device and License Management Data
export const deviceManagement = {
  activeSessions: [
    {
      deviceId: "POS-TERMINAL-001",
      deviceName: "Main Counter Terminal",
      location: "Store Front",
      user: "John Smith",
      loginTime: "2025-06-24 08:30:00",
      lastActivity: "2025-06-24 14:25:00",
      status: "Active",
      ipAddress: "192.168.1.101"
    },
    {
      deviceId: "TABLET-002",
      deviceName: "Manager Tablet",
      location: "Back Office",
      user: "Sarah Manager",
      loginTime: "2025-06-24 09:15:00",
      lastActivity: "2025-06-24 14:20:00",
      status: "Active",
      ipAddress: "192.168.1.102"
    },
    {
      deviceId: "MOBILE-003",
      deviceName: "Floor Assistant Mobile",
      location: "Sales Floor",
      user: "Mike Assistant",
      loginTime: "2025-06-24 10:00:00",
      lastActivity: "2025-06-24 14:15:00",
      status: "Idle",
      ipAddress: "192.168.1.103"
    }
  ],
  licenseStatus: {
    totalLicenses: 50,
    usedLicenses: 35,
    availableLicenses: 15,
    expiryDate: "2025-12-31",
    warningThreshold: 5,
    suspendedUsers: 0,
    lastSyncTime: "2025-06-24 14:30:00"
  }
}

// Subscription and SaaS Management Data
export const subscriptionPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 299,
    currency: "ZAR",
    billing: "monthly",
    userLimit: 5,
    deviceLimit: 3,
    features: {
      multiWarehouse: false,
      giftCards: false,
      loyaltyProgram: false,
      whiteLabel: false,
      advancedReporting: false,
      paymentGateways: 1,
      supportLevel: "Email"
    },
    description: "Perfect for small businesses getting started"
  },
  {
    id: "standard",
    name: "Standard", 
    price: 599,
    currency: "ZAR",
    billing: "monthly",
    userLimit: 15,
    deviceLimit: 8,
    features: {
      multiWarehouse: false,
      giftCards: true,
      loyaltyProgram: false,
      whiteLabel: false,
      advancedReporting: false,
      paymentGateways: 2,
      supportLevel: "Phone & Email"
    },
    description: "Ideal for growing businesses with multiple staff"
  },
  {
    id: "premium",
    name: "Premium",
    price: 999,
    currency: "ZAR", 
    billing: "monthly",
    userLimit: 50,
    deviceLimit: 15,
    features: {
      multiWarehouse: true,
      giftCards: true,
      loyaltyProgram: true,
      whiteLabel: false,
      advancedReporting: true,
      paymentGateways: 3,
      supportLevel: "Priority Phone & Email"
    },
    description: "Advanced features for established businesses"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 1999,
    currency: "ZAR",
    billing: "monthly", 
    userLimit: 200,
    deviceLimit: 50,
    features: {
      multiWarehouse: true,
      giftCards: true,
      loyaltyProgram: true,
      whiteLabel: true,
      advancedReporting: true,
      paymentGateways: "unlimited",
      supportLevel: "Dedicated Account Manager"
    },
    description: "Complete solution for large enterprises"
  }
]

// Helper function to search products
export const searchProducts = (query) => {
  // If no query provided, return all products (for dropdown when clicking)
  if (!query || query.trim() === '') {
    return products
  }
  
  // If query is too short, return empty array
  if (query.length < 2) {
    return []
  }
  
  const lowercaseQuery = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.sku.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery)
  )
}

// Helper function to get product by SKU or ID
export const getProduct = (identifier) => {
  return products.find(product => 
    product.sku === identifier || 
    product.id === parseInt(identifier)
  )
}
