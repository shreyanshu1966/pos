// Mock Companies Data - Enhanced for Multi-Tenant Demo
export const companies = [
  { 
    id: 1, 
    name: "Acme Corp Ltd", 
    code: "ACM001",
    address: "123 Business Park, Cape Town, 8001",
    phone: "+27 21 123 4567",
    email: "admin@acmecorp.co.za",
    currency: "ZAR",
    taxRate: 0.15,
    warehouse: "Main Warehouse",
    subscription: "Premium",
    userLimit: 25,
    currentUsers: 12,
    status: "Active",
    licenseExpiry: "2025-12-31"
  },
  { 
    id: 2, 
    name: "TechStart Solutions", 
    code: "TSS002",
    address: "456 Innovation Hub, Johannesburg, 2001",
    phone: "+27 11 987 6543",
    email: "info@techstart.co.za",
    currency: "ZAR",
    taxRate: 0.15,
    warehouse: "Tech Warehouse",
    subscription: "Standard",
    userLimit: 10,
    currentUsers: 8,
    status: "Active",
    licenseExpiry: "2025-08-15"
  },
  { 
    id: 3, 
    name: "Global Retail Inc", 
    code: "GRI003",
    address: "789 Retail Complex, Durban, 4001",
    phone: "+27 31 555 0123",
    email: "operations@globalretail.co.za",
    currency: "ZAR",
    taxRate: 0.15,
    warehouse: "Multi-Location",
    subscription: "Enterprise",
    userLimit: 50,
    currentUsers: 35,
    status: "Active",
    licenseExpiry: "2026-03-20"
  },
  { 
    id: 4, 
    name: "Service Excellence Co", 
    code: "SEC004",
    address: "321 Service Drive, Port Elizabeth, 6001",
    phone: "+27 41 777 8888",
    email: "support@serviceexcellence.co.za",
    currency: "ZAR",
    taxRate: 0.15,
    warehouse: "Service Center",
    subscription: "Basic",
    userLimit: 5,
    currentUsers: 5,
    status: "Warning - Near Limit",
    licenseExpiry: "2025-06-30"
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

// Mock Customers Data
export const customers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+27 82 123 4567",
    company: "Smith & Associates",
    loyaltyPoints: 1250,
    totalSpent: 15750.00,
    lastPurchase: "2025-06-23"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@techcorp.co.za",
    phone: "+27 83 987 6543",
    company: "TechCorp Solutions",
    loyaltyPoints: 890,
    totalSpent: 8900.00,
    lastPurchase: "2025-06-22"
  }
]

// Mock Gift Cards
export const giftCards = [
  {
    id: "GC001",
    code: "GIFT-2025-001",
    balance: 500.00,
    originalAmount: 500.00,
    issuedDate: "2025-06-01",
    expiryDate: "2026-06-01",
    status: "Active"
  }
]

// Helper function to search products
export const searchProducts = (query) => {
  if (!query || query.length < 2) return []
  
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
