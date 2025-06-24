import { useState, useEffect } from 'react'
import { LogOut, Search, Plus, Trash2, Calculator } from 'lucide-react'
import { companies, searchProducts, getProduct } from '../data/mockData'
import CompanySelector from './CompanySelector'
import ProductSearch from './ProductSearch'
import LineItem from './LineItem'

const POSScreen = ({ selectedCompany, setSelectedCompany, onLogout }) => {
  const [lineItems, setLineItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)

  // Set default company on mount
  useEffect(() => {
    if (!selectedCompany) {
      setSelectedCompany(companies[0])
    }
  }, [selectedCompany, setSelectedCompany])

  // Calculate totals whenever line items change
  useEffect(() => {
    const newSubtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    const newTax = newSubtotal * 0.1 // 10% tax rate
    const newTotal = newSubtotal + newTax
    
    setSubtotal(newSubtotal)
    setTax(newTax)
    setTotal(newTotal)
  }, [lineItems])

  const addLineItem = (product) => {
    const newItem = {
      id: Date.now(), // Simple ID generation
      productId: product.id,
      sku: product.sku,
      name: product.name,
      description: product.description,
      quantity: 1,
      price: product.price
    }
    setLineItems([...lineItems, newItem])
    setSearchQuery('')
    setShowSearch(false)
  }

  const updateLineItem = (id, updates) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }

  const removeLineItem = (id) => {
    setLineItems(lineItems.filter(item => item.id !== id))
  }

  const clearTransaction = () => {
    setLineItems([])
  }

  const processPayment = () => {
    alert(`Transaction processed for ${selectedCompany?.name}\nTotal: $${total.toFixed(2)}`)
    clearTransaction()
  }

  return (
    <div className="min-h-screen bg-sage-bg">      {/* Header */}
      <header className="bg-sage-green shadow-lg" style={{ height: '40px' }}>
        <div className="px-20 h-full flex items-center justify-between">          <div className="flex items-center space-x-4">
            <img 
              src="/logo.png" 
              alt="Sage Logo" 
              className="h-6 w-auto"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <CompanySelector 
              companies={companies}
              selectedCompany={selectedCompany}
              onSelectCompany={setSelectedCompany}
            />
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 text-white hover:text-white/80 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-menu font-menu">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-20">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-title font-title text-sage-text mb-2">
            Point of Sale - {selectedCompany?.name}
          </h2>
          <p className="text-body text-sage-text/80">
            Company Code: {selectedCompany?.code}
          </p>
        </div>

        {/* Transaction Interface */}
        <div className="bg-sage-text rounded-lg shadow-lg overflow-hidden">
          {/* Product Search Bar */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-bg/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products by name, SKU, or description..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSearch(e.target.value.length >= 2)
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sage-bg focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent"
                />
                {showSearch && (
                  <ProductSearch 
                    query={searchQuery}
                    onSelectProduct={addLineItem}
                    onClose={() => setShowSearch(false)}
                  />
                )}
              </div>
              <button
                onClick={clearTransaction}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-button">Clear</span>
              </button>
            </div>
          </div>

          {/* Excel-Style Line Items Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 p-4 text-body font-medium text-sage-bg">
              <div className="col-span-2">SKU</div>
              <div className="col-span-3">Product</div>
              <div className="col-span-3">Description</div>
              <div className="col-span-1 text-center">Qty</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-1 text-right">Total</div>
            </div>
          </div>

          {/* Line Items */}
          <div className="max-h-96 overflow-y-auto">
            {lineItems.length === 0 ? (
              <div className="p-8 text-center text-sage-bg/60">
                <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-body">No items added yet. Search and select products to begin transaction.</p>
              </div>
            ) : (
              lineItems.map((item, index) => (
                <LineItem
                  key={item.id}
                  item={item}
                  index={index}
                  onUpdate={updateLineItem}
                  onRemove={removeLineItem}
                />
              ))
            )}
          </div>

          {/* Totals Section */}
          {lineItems.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50">
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-body text-sage-bg">
                  <span>Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-body text-sage-bg">
                  <span>Tax (10%):</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-title font-title text-sage-bg border-t border-gray-300 pt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Section */}
          {lineItems.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex space-x-4">
                <button
                  onClick={processPayment}
                  className="flex-1 bg-sage-green text-white py-3 px-6 rounded-md hover:bg-sage-green/90 transition-colors text-button font-medium"
                >
                  Process Payment - ${total.toFixed(2)}
                </button>
                <button
                  onClick={clearTransaction}
                  className="px-6 py-3 border border-gray-300 text-sage-bg rounded-md hover:bg-gray-50 transition-colors text-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default POSScreen
