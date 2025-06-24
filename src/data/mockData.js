// Mock Companies Data
export const companies = [
  { id: 1, name: "Acme Corp Ltd", code: "ACM001" },
  { id: 2, name: "TechStart Solutions", code: "TSS002" },
  { id: 3, name: "Global Retail Inc", code: "GRI003" },
  { id: 4, name: "Service Excellence Co", code: "SEC004" }
]

// Mock Products Data
export const products = [
  { id: 1, sku: "LAP001", name: "Business Laptop", description: "Dell Latitude 5520 - 16GB RAM, 512GB SSD", price: 1299.99, category: "Electronics" },
  { id: 2, sku: "MOU001", name: "Wireless Mouse", description: "Logitech MX Master 3 - Ergonomic Design", price: 89.99, category: "Electronics" },
  { id: 3, sku: "KEY001", name: "Mechanical Keyboard", description: "Corsair K95 RGB Platinum - Cherry MX Switches", price: 199.99, category: "Electronics" },
  { id: 4, sku: "MON001", name: "4K Monitor", description: "Dell UltraSharp 27\" 4K USB-C Monitor", price: 649.99, category: "Electronics" },
  { id: 5, sku: "DES001", name: "Office Desk", description: "Adjustable Height Standing Desk - 48\" x 30\"", price: 449.99, category: "Furniture" },
  { id: 6, sku: "CHA001", name: "Ergonomic Chair", description: "Herman Miller Aeron - Size B, Graphite", price: 1395.00, category: "Furniture" },
  { id: 7, sku: "PRI001", name: "Laser Printer", description: "HP LaserJet Pro M404n - Monochrome", price: 229.99, category: "Office Equipment" },
  { id: 8, sku: "SCA001", name: "Document Scanner", description: "Fujitsu ScanSnap iX1600 - Desktop Scanner", price: 495.00, category: "Office Equipment" },
  { id: 9, sku: "TAB001", name: "Business Tablet", description: "iPad Pro 12.9\" - 256GB, Wi-Fi + Cellular", price: 1199.00, category: "Electronics" },
  { id: 10, sku: "HEA001", name: "Noise-Canceling Headphones", description: "Sony WH-1000XM4 - Wireless Over-Ear", price: 349.99, category: "Electronics" },
  { id: 11, sku: "STO001", name: "External Storage", description: "Samsung T7 Portable SSD - 2TB", price: 299.99, category: "Electronics" },
  { id: 12, sku: "CAM001", name: "Webcam", description: "Logitech Brio 4K Pro - Ultra HD", price: 199.99, category: "Electronics" },
  { id: 13, sku: "DOC001", name: "Document Holder", description: "Adjustable Desktop Document Stand", price: 34.99, category: "Office Equipment" },
  { id: 14, sku: "LAM001", name: "Desk Lamp", description: "LED Task Lamp - Adjustable Brightness", price: 79.99, category: "Office Equipment" },
  { id: 15, sku: "SHR001", name: "Paper Shredder", description: "Cross-Cut Shredder - 12 Sheet Capacity", price: 149.99, category: "Office Equipment" },
  { id: 16, sku: "WHI001", name: "Whiteboard", description: "Magnetic Dry Erase Board - 36\" x 24\"", price: 89.99, category: "Office Equipment" },
  { id: 17, sku: "SUP001", name: "Office Supplies Kit", description: "Complete Starter Kit - Pens, Paper, Clips", price: 49.99, category: "Supplies" },
  { id: 18, sku: "COF001", name: "Coffee Machine", description: "Keurig K-Elite - Single Serve Pod Coffee Maker", price: 169.99, category: "Office Equipment" },
  { id: 19, sku: "WAT001", name: "Water Cooler", description: "Bottleless Water Cooler - Hot & Cold", price: 399.99, category: "Office Equipment" },
  { id: 20, sku: "PLN001", name: "Office Plant", description: "Snake Plant in Ceramic Pot - Low Maintenance", price: 24.99, category: "Office Decor" }
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
