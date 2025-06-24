import { useState, useEffect } from 'react'
import { LogOut, Search, Plus, Trash2, Calculator, Receipt, CreditCard, User, Gift, FileText, BarChart3, Settings } from 'lucide-react'
import { companies, searchProducts, getProduct, customers, giftCards } from '../data/mockData'
import CompanySelector from './CompanySelector'
import ProductSearch from './ProductSearch'
import LineItem from './LineItem'
import Dashboard from './Dashboard'

const POSScreenEnhanced = ({ selectedCompany, setSelectedCompany, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard') // dashboard, pos, reports, settings
  const [lineItems, setLineItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [giftCardCode, setGiftCardCode] = useState('')

  // Set default company on mount
  useEffect(() => {
    if (!selectedCompany) {
      setSelectedCompany(companies[0])
    }
  }, [selectedCompany, setSelectedCompany])

  // Calculate totals whenever line items change
  useEffect(() => {
    const newSubtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    const taxRate = selectedCompany?.taxRate || 0.15
    const newTax = newSubtotal * taxRate
    const newTotal = newSubtotal + newTax
    
    setSubtotal(newSubtotal)
    setTax(newTax)
    setTotal(newTotal)
  }, [lineItems, selectedCompany])

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
        cost: product.cost || 0,
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
    setSelectedCustomer(null)
    setGiftCardCode('')
  }

  const processPayment = () => {
    const transactionData = {
      company: selectedCompany?.name,
      customer: selectedCustomer?.name || 'Walk-in Customer',
      items: lineItems,
      subtotal,
      tax,
      total,
      paymentMethod,
      timestamp: new Date().toISOString()
    }
    
    alert(`✅ Transaction Processed Successfully!
    
Company: ${transactionData.company}
Customer: ${transactionData.customer}
Items: ${lineItems.length}
Total: R ${total.toFixed(2)}
Payment: ${paymentMethod.toUpperCase()}

Receipt printed and emailed to customer.`)
    
    clearTransaction()
  }

  const processRefund = () => {
    if (lineItems.length === 0) {
      alert('No items to refund. Please add items first.')
      return
    }
    
    alert(`🔄 Refund Processed Successfully!
    
Refund Amount: R ${total.toFixed(2)}
Items Returned: ${lineItems.length}
Credit Note Generated: CN-${Date.now()}

Stock levels have been updated.`)
    
    clearTransaction()
  }

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'pos', label: 'Point of Sale', icon: Calculator },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

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

      {/* Navigation */}
      <div className="px-20 py-4 bg-sage-text border-b border-gray-200">
        <nav className="flex space-x-8">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors text-menu font-menu ${
                currentView === item.id
                  ? 'bg-sage-green text-white'
                  : 'text-sage-bg hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="p-20">
        {currentView === 'dashboard' && <Dashboard selectedCompany={selectedCompany} />}
        
        {currentView === 'pos' && (
          <div className="space-y-8">
            {/* POS Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-title font-title text-sage-text mb-2">
                  Point of Sale - {selectedCompany?.name}
                </h2>
                <p className="text-body text-sage-text/80">
                  Warehouse: {selectedCompany?.warehouse} | Currency: {selectedCompany?.currency}
                </p>
              </div>
              
              {selectedCustomer && (
                <div className="bg-sage-text rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-sage-bg" />
                    <div>
                      <div className="text-button font-medium text-sage-bg">{selectedCustomer.name}</div>
                      <div className="text-body text-sage-bg/60">Loyalty: {selectedCustomer.loyaltyPoints} pts</div>
                    </div>
                  </div>
                </div>
              )}
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
                      placeholder="Search products by name, SKU, or barcode (Excel-style interface)..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setShowSearch(e.target.value.length >= 2)
                      }}
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
                    onClick={() => setSelectedCustomer(customers[0])}
                    className="px-4 py-3 bg-sage-blue text-white rounded-md hover:bg-sage-blue/90 transition-colors flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-button">Customer</span>
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
                  <div className="col-span-2">SKU</div>
                  <div className="col-span-3">Product</div>
                  <div className="col-span-3">Description</div>
                  <div className="col-span-1 text-center">Qty</div>
                  <div className="col-span-2 text-right">Unit Price</div>
                  <div className="col-span-1 text-right">Line Total</div>
                </div>
              </div>

              {/* Line Items */}
              <div className="max-h-96 overflow-y-auto">
                {lineItems.length === 0 ? (
                  <div className="p-8 text-center text-sage-bg/60">
                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-body mb-2">Microsoft Excel-style POS Interface</p>
                    <p className="text-body">Search and select products to begin transaction</p>
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
                      <span className="font-medium">R {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-body text-sage-bg">
                      <span>VAT ({((selectedCompany?.taxRate || 0.15) * 100).toFixed(0)}%):</span>
                      <span className="font-medium">R {tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-title font-title text-sage-bg border-t border-gray-300 pt-2">
                      <span>Total:</span>
                      <span>R {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Section */}
              {lineItems.length > 0 && (
                <div className="border-t border-gray-200 p-4 bg-white space-y-4">
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-md border-2 transition-colors flex items-center justify-center space-x-2 ${
                        paymentMethod === 'card'
                          ? 'border-sage-green bg-sage-green/10 text-sage-green'
                          : 'border-gray-300 text-sage-bg hover:bg-gray-50'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="text-button font-medium">Card</span>
                    </button>
                    
                    <button
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-3 rounded-md border-2 transition-colors flex items-center justify-center space-x-2 ${
                        paymentMethod === 'cash'
                          ? 'border-sage-green bg-sage-green/10 text-sage-green'
                          : 'border-gray-300 text-sage-bg hover:bg-gray-50'
                      }`}
                    >
                      <Receipt className="w-5 h-5" />
                      <span className="text-button font-medium">Cash</span>
                    </button>
                    
                    <button
                      onClick={() => setPaymentMethod('gift')}
                      className={`p-3 rounded-md border-2 transition-colors flex items-center justify-center space-x-2 ${
                        paymentMethod === 'gift'
                          ? 'border-sage-green bg-sage-green/10 text-sage-green'
                          : 'border-gray-300 text-sage-bg hover:bg-gray-50'
                      }`}
                    >
                      <Gift className="w-5 h-5" />
                      <span className="text-button font-medium">Gift Card</span>
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button
                      onClick={processPayment}
                      className="flex-1 bg-sage-green text-white py-3 px-6 rounded-md hover:bg-sage-green/90 transition-colors text-button font-medium"
                    >
                      Process Payment - R {total.toFixed(2)}
                    </button>
                    
                    <button
                      onClick={processRefund}
                      className="px-6 py-3 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors text-button"
                    >
                      Process Refund
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
        )}

        {currentView === 'reports' && (
          <div className="bg-sage-text rounded-lg shadow-lg p-8 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-sage-bg/40" />
            <h3 className="text-title font-title text-sage-bg mb-2">Sales Reports</h3>
            <p className="text-body text-sage-bg/60 mb-6">
              Advanced reporting module with sales analytics, inventory reports, and customer insights.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 border border-gray-200 rounded-md">
                <h4 className="text-button font-medium text-sage-bg mb-2">Daily Sales</h4>
                <p className="text-body text-sage-bg/60">Transaction summaries</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md">
                <h4 className="text-button font-medium text-sage-bg mb-2">Inventory</h4>
                <p className="text-body text-sage-bg/60">Stock levels & movements</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md">
                <h4 className="text-button font-medium text-sage-bg mb-2">Customer Analytics</h4>
                <p className="text-body text-sage-bg/60">Loyalty & purchasing trends</p>
              </div>
            </div>
          </div>
        )}

        {currentView === 'settings' && (
          <div className="bg-sage-text rounded-lg shadow-lg p-8 text-center">
            <Settings className="w-16 h-16 mx-auto mb-4 text-sage-bg/40" />
            <h3 className="text-title font-title text-sage-bg mb-2">POS Settings</h3>
            <p className="text-body text-sage-bg/60 mb-6">
              Configure POS behavior, payment gateways, receipt templates, and user permissions.
            </p>
            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="p-4 border border-gray-200 rounded-md text-left">
                <h4 className="text-button font-medium text-sage-bg mb-2">Company Settings</h4>
                <p className="text-body text-sage-bg/60 mb-3">Tax rates, currency, business details</p>
                <div className="space-y-2 text-body text-sage-bg/80">
                  <div>VAT Rate: {((selectedCompany?.taxRate || 0.15) * 100).toFixed(0)}%</div>
                  <div>Currency: {selectedCompany?.currency}</div>
                  <div>Warehouse: {selectedCompany?.warehouse}</div>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-md text-left">
                <h4 className="text-button font-medium text-sage-bg mb-2">User Management</h4>
                <p className="text-body text-sage-bg/60 mb-3">Roles, permissions, device limits</p>
                <div className="space-y-2 text-body text-sage-bg/80">
                  <div>Active Users: {selectedCompany?.currentUsers}/{selectedCompany?.userLimit}</div>
                  <div>Subscription: {selectedCompany?.subscription}</div>
                  <div>License Status: {selectedCompany?.status}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default POSScreenEnhanced
