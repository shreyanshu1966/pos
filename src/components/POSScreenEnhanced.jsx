import { useState, useEffect } from 'react'
import { 
  LogOut, Search, Plus, Trash2, Calculator, Settings, BarChart3, 
  Package, Users, FileText, CreditCard, Gift, RotateCcw, Printer,
  Monitor, Home, ShoppingCart, TrendingUp, AlertTriangle
} from 'lucide-react'
import { companies, products, searchProducts } from '../data/mockData'
import CompanySelector from './CompanySelector'
import ProductSearch from './ProductSearch'
import LineItem from './LineItem'
import Dashboard from './Dashboard'
import InventoryManagement from './InventoryManagement'
import ReportsPage from './ReportsPage'
import SettingsPage from './SettingsPage'
import PaymentModal from './PaymentModal'
import ReturnRefundModal from './ReturnRefundModal'

const POSScreenEnhanced = ({ selectedCompany, setSelectedCompany, onLogout }) => {
  const [activeModule, setActiveModule] = useState('pos')
  const [lineItems, setLineItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showReturnModal, setShowReturnModal] = useState(false)
  const [giftCardAmount, setGiftCardAmount] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(0)

  // Set default company on mount
  useEffect(() => {
    if (!selectedCompany) {
      setSelectedCompany(companies[0])
    }
  }, [selectedCompany, setSelectedCompany])

  // Calculate totals whenever line items change
  useEffect(() => {
    const newSubtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    const discountAmount = newSubtotal * (appliedDiscount / 100)
    const subtotalAfterDiscount = newSubtotal - discountAmount
    const newTax = subtotalAfterDiscount * (selectedCompany?.taxRate || 0.15) // VAT
    const newTotal = subtotalAfterDiscount + newTax
    
    setSubtotal(newSubtotal)
    setTax(newTax)
    setTotal(newTotal)
  }, [lineItems, appliedDiscount, selectedCompany])

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Business overview and analytics' },
    { id: 'pos', label: 'Point of Sale', icon: ShoppingCart, description: 'Excel-style transaction interface' },
    { id: 'inventory', label: 'Inventory', icon: Package, description: 'Stock management and tracking' },
    { id: 'reports', label: 'Reports', icon: BarChart3, description: 'Sales and business analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'System configuration' }
  ]

  const addLineItem = (product) => {
    const existingItem = lineItems.find(item => item.productId === product.id)
    
    if (existingItem) {
      updateLineItem(existingItem.id, { quantity: existingItem.quantity + 1 })
    } else {
      const newItem = {
        id: Date.now(),
        productId: product.id,
        sku: product.sku,
        name: product.name,
        description: product.description,
        quantity: 1,
        price: product.price,
        cost: product.cost,
        stockLevel: product.stockLevel
      }
      setLineItems([...lineItems, newItem])
    }
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
    setAppliedDiscount(0)
    setCouponCode('')
    setGiftCardAmount('')
  }

  const processPayment = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentComplete = (paymentData) => {
    const receiptNumber = `POS-${Date.now()}`
    const receiptData = {
      receiptNumber,
      timestamp: new Date().toLocaleString(),
      company: selectedCompany?.name,
      items: lineItems,
      subtotal,
      tax,
      total,
      paymentMethod: paymentData.method,
      discount: appliedDiscount
    }
    
    console.log('Payment processed:', receiptData)
    alert(`Payment Successful!\nReceipt: ${receiptNumber}\nTotal: R ${total.toFixed(2)}`)
    
    clearTransaction()
    setShowPaymentModal(false)
  }

  const applyCoupon = () => {
    const validCoupons = {
      'SAVE10': 10,
      'WELCOME5': 5,
      'VIP15': 15
    }
    
    if (validCoupons[couponCode]) {
      setAppliedDiscount(validCoupons[couponCode])
      alert(`Coupon applied! ${validCoupons[couponCode]}% discount`)
    } else {
      alert('Invalid coupon code')
    }
  }

  const applyGiftCard = () => {
    const amount = parseFloat(giftCardAmount)
    if (amount > 0 && amount <= total) {
      alert(`Gift card of R ${amount.toFixed(2)} would be applied`)
      // In real implementation, this would adjust the payment amount
    } else {
      alert('Invalid gift card amount')
    }
  }

  const renderPOSInterface = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-title font-title text-sage-text mb-2">
          Point of Sale - {selectedCompany?.name}
        </h2>
        <div className="flex items-center space-x-6 text-body text-sage-text/80">
          <span>Company Code: {selectedCompany?.code}</span>
          <span>Warehouse: {selectedCompany?.warehouse}</span>
          <span>Currency: {selectedCompany?.currency}</span>
          <span>VAT Rate: {((selectedCompany?.taxRate || 0.15) * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Transaction Interface */}
      <div className="bg-sage-text rounded-lg shadow-lg overflow-hidden">
        {/* Product Search and Quick Actions */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-bg/60 w-5 h-5" />              <input
                type="text"
                placeholder="Search products by name, SKU, barcode, or description..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSearch(true)
                }}
                onFocus={() => setShowSearch(true)}
                onClick={() => setShowSearch(true)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md text-sage-bg focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent"
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
              onClick={() => setShowReturnModal(true)}
              className="px-4 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-button">Returns</span>
            </button>
            
            <button
              onClick={clearTransaction}
              className="px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-button">Clear</span>
            </button>
          </div>
        </div>

        {/* Excel-Style Header */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 p-4 text-body font-menu text-sage-bg">
            <div className="col-span-2 font-semibold">SKU</div>
            <div className="col-span-3 font-semibold">Product</div>
            <div className="col-span-3 font-semibold">Description</div>
            <div className="col-span-1 text-center font-semibold">Qty</div>
            <div className="col-span-2 text-right font-semibold">Unit Price</div>
            <div className="col-span-1 text-right font-semibold">Line Total</div>
          </div>
        </div>

        {/* Line Items */}
        <div className="max-h-80 overflow-y-auto">
          {lineItems.length === 0 ? (
            <div className="p-12 text-center text-sage-bg/60">
              <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-body mb-2">No items added yet</p>
              <p className="text-xs text-sage-bg/40">Search and select products to begin transaction</p>
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

        {/* Gift Cards & Coupons */}
        {lineItems.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50 p-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Gift Card Section */}
              <div className="space-y-2">
                <label className="block text-body font-medium text-sage-bg">Gift Card</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={giftCardAmount}
                    onChange={(e) => setGiftCardAmount(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                  />
                  <button
                    onClick={applyGiftCard}
                    className="px-4 py-2 bg-sage-blue text-white rounded-md hover:bg-sage-blue/90 transition-colors flex items-center space-x-1"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Apply</span>
                  </button>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="space-y-2">
                <label className="block text-body font-medium text-sage-bg">Coupon Code</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter code (SAVE10, WELCOME5, VIP15)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Totals Section */}
        {lineItems.length > 0 && (
          <div className="border-t border-gray-200 bg-white">
            <div className="p-6">
              <div className="grid grid-cols-2 gap-8">
                {/* Left side - Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between text-body text-sage-bg">
                    <span>Items ({lineItems.length}):</span>
                    <span className="font-medium">{lineItems.reduce((sum, item) => sum + item.quantity, 0)} units</span>
                  </div>
                  <div className="flex justify-between text-body text-sage-bg">
                    <span>Subtotal:</span>
                    <span className="font-medium">R {subtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-body text-green-600">
                      <span>Discount ({appliedDiscount}%):</span>
                      <span className="font-medium">-R {(subtotal * appliedDiscount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-body text-sage-bg">
                    <span>VAT ({((selectedCompany?.taxRate || 0.15) * 100).toFixed(0)}%):</span>
                    <span className="font-medium">R {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-title font-title text-sage-green border-t border-gray-300 pt-3">
                    <span>Total:</span>
                    <span>R {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Right side - Actions */}
                <div className="space-y-3">
                  <button
                    onClick={processPayment}
                    className="w-full bg-sage-green text-white py-4 px-6 rounded-md hover:bg-sage-green/90 transition-colors text-button font-medium flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Process Payment - R {total.toFixed(2)}</span>
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="px-4 py-2 border border-gray-300 text-sage-bg rounded-md hover:bg-gray-50 transition-colors text-button flex items-center justify-center space-x-1">
                      <Monitor className="w-4 h-4" />
                      <span>Hold</span>
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-sage-bg rounded-md hover:bg-gray-50 transition-colors text-button flex items-center justify-center space-x-1">
                      <Printer className="w-4 h-4" />
                      <span>Quote</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          total={total}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {showReturnModal && (
        <ReturnRefundModal
          isOpen={showReturnModal}
          onClose={() => setShowReturnModal(false)}
          selectedCompany={selectedCompany}
        />
      )}
    </div>
  )

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard selectedCompany={selectedCompany} products={products} />
      case 'pos':
        return renderPOSInterface()
      case 'inventory':
        return <InventoryManagement selectedCompany={selectedCompany} products={products} />
      case 'reports':
        return <ReportsPage selectedCompany={selectedCompany} />
      case 'settings':
        return <SettingsPage selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} />
      default:
        return renderPOSInterface()
    }
  }

  return (
    <div className="min-h-screen bg-sage-bg">
      {/* Header */}
      <header className="bg-sage-green shadow-lg" style={{ height: '40px' }}>
        <div className="px-20 h-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/logo.png" 
              alt="Sage Logo" 
              className="h-6 w-auto"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <span className="text-white text-menu font-menu">Sage POS System</span>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* License Status */}
            <div className="text-white text-menu">
              <span className="text-white/80">License: </span>
              <span className={`font-semibold ${
                selectedCompany?.status === 'Active' ? 'text-green-200' : 
                selectedCompany?.status?.includes('Warning') ? 'text-yellow-200' : 'text-red-200'
              }`}>
                {selectedCompany?.status || 'Active'}
              </span>
            </div>

            {/* User Count */}
            <div className="text-white text-menu">
              <span className="text-white/80">Users: </span>
              <span className="font-semibold">
                {selectedCompany?.currentUsers || 0}/{selectedCompany?.userLimit || 0}
              </span>
            </div>

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

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-20">
          <div className="flex space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  className={`flex items-center space-x-2 px-4 py-4 text-button font-medium transition-colors relative ${
                    activeModule === item.id
                      ? 'text-sage-green border-b-2 border-sage-green bg-sage-green/5'
                      : 'text-sage-bg/60 hover:text-sage-bg hover:bg-gray-50'
                  }`}
                  title={item.description}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {activeModule === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sage-green"></div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-20">
        <div className="max-w-7xl mx-auto">
          {renderModuleContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="px-20">
          <div className="flex items-center justify-between text-xs text-sage-bg/60">
            <div className="flex items-center space-x-6">
              <span>© 2025 Sage POS System</span>
              <span>Version 1.0.0</span>
              <span>Multi-Tenant SaaS</span>
            </div>
            <div className="flex items-center space-x-6">
              <span>Server: Online</span>
              <span>Last Sync: {new Date().toLocaleTimeString()}</span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Connected</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default POSScreenEnhanced
