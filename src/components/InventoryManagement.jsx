import { useState } from 'react'
import { Package, ArrowUpCircle, ArrowDownCircle, AlertTriangle, TrendingUp, BarChart3, Eye } from 'lucide-react'

const InventoryManagement = ({ selectedCompany, products, onStockAdjustment }) => {
  const [activeView, setActiveView] = useState('overview')
  const [selectedWarehouse, setSelectedWarehouse] = useState('main')
  
  const warehouses = [
    { id: 'main', name: 'Main Warehouse', location: selectedCompany?.address || 'Cape Town', capacity: '95%' },
    { id: 'secondary', name: 'Secondary Store', location: 'Johannesburg', capacity: '67%' },
    { id: 'online', name: 'Online Fulfillment', location: 'Durban', capacity: '45%' }
  ]

  const stockMovements = [
    { id: 1, type: 'in', product: 'Business Laptop', quantity: 10, reason: 'Purchase Order #PO-001', timestamp: '2025-06-24 09:30', user: 'Admin' },
    { id: 2, type: 'out', product: 'Wireless Mouse', quantity: 5, reason: 'Sale Transaction #TXN-234', timestamp: '2025-06-24 10:15', user: 'John S.' },
    { id: 3, type: 'adjustment', product: 'Mechanical Keyboard', quantity: -2, reason: 'Damaged Stock Write-off', timestamp: '2025-06-24 11:00', user: 'Manager' },
    { id: 4, type: 'transfer', product: '4K Monitor', quantity: 3, reason: 'Warehouse Transfer', timestamp: '2025-06-24 11:30', user: 'Admin' },
    { id: 5, type: 'in', product: 'Office Desk', quantity: 2, reason: 'Purchase Order #PO-002', timestamp: '2025-06-24 12:00', user: 'Admin' }
  ]

  const lowStockItems = products.filter(product => product.stockLevel <= product.minStock)
  const totalStockValue = products.reduce((sum, product) => sum + (product.stockLevel * product.cost), 0)
  const averageTurnover = 15.2 // days

  const getMovementIcon = (type) => {
    switch(type) {
      case 'in': return <ArrowUpCircle className="w-4 h-4 text-green-600" />
      case 'out': return <ArrowDownCircle className="w-4 h-4 text-red-600" />
      case 'adjustment': return <AlertTriangle className="w-4 h-4 text-orange-600" />
      case 'transfer': return <Package className="w-4 h-4 text-blue-600" />
      default: return <Package className="w-4 h-4 text-sage-bg" />
    }
  }

  const getStockStatus = (current, min) => {
    if (current <= min) return { status: 'Critical', color: 'text-red-600 bg-red-100' }
    if (current <= min * 2) return { status: 'Low', color: 'text-orange-600 bg-orange-100' }
    return { status: 'Good', color: 'text-green-600 bg-green-100' }
  }

  const views = [
    { id: 'overview', label: 'Stock Overview', icon: BarChart3 },
    { id: 'movements', label: 'Stock Movements', icon: TrendingUp },
    { id: 'alerts', label: 'Low Stock Alerts', icon: AlertTriangle },
    { id: 'warehouse', label: 'Multi-Warehouse', icon: Package }
  ]

  return (
    <div className="space-y-6">
      {/* Inventory Header */}
      <div className="bg-sage-text rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-title font-title text-sage-bg">Inventory Management</h2>
            <p className="text-body text-sage-bg/60">Real-time stock tracking and warehouse control</p>
          </div>
          <select
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sage-bg focus:outline-none focus:ring-2 focus:ring-sage-green"
          >
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name} - {warehouse.location}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-sage-green/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Package className="w-6 h-6 text-sage-green" />
              <span className="text-title font-title text-sage-green">{products.length}</span>
            </div>
            <p className="text-body text-sage-bg/80 mt-1">Total Products</p>
          </div>
          
          <div className="bg-sage-blue/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <TrendingUp className="w-6 h-6 text-sage-blue" />
              <span className="text-title font-title text-sage-blue">R {(totalStockValue / 1000).toFixed(0)}k</span>
            </div>
            <p className="text-body text-sage-bg/80 mt-1">Stock Value</p>
          </div>
          
          <div className="bg-orange-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <span className="text-title font-title text-orange-600">{lowStockItems.length}</span>
            </div>
            <p className="text-body text-sage-bg/80 mt-1">Low Stock Items</p>
          </div>
          
          <div className="bg-green-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <BarChart3 className="w-6 h-6 text-green-600" />
              <span className="text-title font-title text-green-600">{averageTurnover}</span>
            </div>
            <p className="text-body text-sage-bg/80 mt-1">Avg. Turnover (days)</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-sage-text rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-button font-medium transition-colors ${
                  activeView === view.id
                    ? 'text-sage-green border-b-2 border-sage-green bg-sage-green/5'
                    : 'text-sage-bg/60 hover:text-sage-bg hover:bg-gray-50'
                }`}
              >
                <view.icon className="w-5 h-5" />
                <span>{view.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeView === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-title font-title text-sage-bg mb-4">Stock Overview</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-body font-menu text-sage-bg/60 py-3">SKU</th>
                      <th className="text-left text-body font-menu text-sage-bg/60 py-3">Product</th>
                      <th className="text-center text-body font-menu text-sage-bg/60 py-3">Current Stock</th>
                      <th className="text-center text-body font-menu text-sage-bg/60 py-3">Min Stock</th>
                      <th className="text-center text-body font-menu text-sage-bg/60 py-3">Status</th>
                      <th className="text-right text-body font-menu text-sage-bg/60 py-3">Value</th>
                      <th className="text-center text-body font-menu text-sage-bg/60 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      const status = getStockStatus(product.stockLevel, product.minStock)
                      return (
                        <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 text-body text-sage-bg font-mono">{product.sku}</td>
                          <td className="py-3">
                            <div>
                              <div className="text-body font-medium text-sage-bg">{product.name}</div>
                              <div className="text-body text-sage-bg/60 truncate">{product.description}</div>
                            </div>
                          </td>
                          <td className="py-3 text-center text-body text-sage-bg">{product.stockLevel}</td>
                          <td className="py-3 text-center text-body text-sage-bg">{product.minStock}</td>
                          <td className="py-3 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                              {status.status}
                            </span>
                          </td>
                          <td className="py-3 text-right text-body text-sage-bg">
                            R {(product.stockLevel * product.cost).toLocaleString()}
                          </td>
                          <td className="py-3 text-center">
                            <button className="text-sage-blue hover:text-sage-blue/80">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeView === 'movements' && (
            <div className="space-y-4">
              <h3 className="text-title font-title text-sage-bg mb-4">Recent Stock Movements</h3>
              <div className="space-y-3">
                {stockMovements.map((movement) => (
                  <div key={movement.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {getMovementIcon(movement.type)}
                        <div>
                          <h4 className="text-button font-medium text-sage-bg">{movement.product}</h4>
                          <p className="text-body text-sage-bg/60">{movement.reason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-button font-medium ${
                          movement.type === 'in' ? 'text-green-600' : 
                          movement.type === 'out' ? 'text-red-600' : 'text-orange-600'
                        }`}>
                          {movement.type === 'in' ? '+' : movement.type === 'out' ? '-' : ''}
                          {Math.abs(movement.quantity)} units
                        </div>
                        <div className="text-body text-sage-bg/60">{movement.timestamp}</div>
                      </div>
                    </div>
                    <div className="text-body text-sage-bg/60">
                      By: {movement.user}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'alerts' && (
            <div className="space-y-4">
              <h3 className="text-title font-title text-sage-bg mb-4">Low Stock Alerts</h3>
              {lowStockItems.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-16 h-16 mx-auto mb-4 text-sage-bg/40" />
                  <p className="text-body text-sage-bg/60">All items are adequately stocked</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <div>
                            <h4 className="text-button font-medium text-sage-bg">{item.name}</h4>
                            <p className="text-body text-sage-bg/60">SKU: {item.sku}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-button font-medium text-red-600">
                            {item.stockLevel} / {item.minStock} min
                          </div>
                          <button 
                            onClick={() => onStockAdjustment?.(item.id, item.minStock * 2)}
                            className="text-body text-sage-blue hover:text-sage-blue/80"
                          >
                            Reorder Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeView === 'warehouse' && (
            <div className="space-y-4">
              <h3 className="text-title font-title text-sage-bg mb-4">Multi-Warehouse Management</h3>
              <div className="grid grid-cols-1 gap-4">
                {warehouses.map((warehouse) => (
                  <div key={warehouse.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Package className="w-6 h-6 text-sage-blue" />
                        <div>
                          <h4 className="text-button font-medium text-sage-bg">{warehouse.name}</h4>
                          <p className="text-body text-sage-bg/60">{warehouse.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-button font-medium text-sage-bg">Capacity: {warehouse.capacity}</div>
                        <div className="text-body text-sage-bg/60">
                          {Math.floor(Math.random() * 50) + 20} products
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-sage-green"
                        style={{ width: warehouse.capacity }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InventoryManagement
