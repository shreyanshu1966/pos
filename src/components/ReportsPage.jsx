import { useState } from 'react'
import { Calendar, Download, TrendingUp, DollarSign, Package, Users, FileText, Filter } from 'lucide-react'
import SalesCharts from './SalesCharts'

const ReportsPage = ({ selectedCompany }) => {
  const [selectedReport, setSelectedReport] = useState('sales')
  const [dateRange, setDateRange] = useState('today')
  const [customDateFrom, setCustomDateFrom] = useState('')
  const [customDateTo, setCustomDateTo] = useState('')

  // Mock report data
  const reportData = {
    sales: {
      today: { revenue: 45750.00, transactions: 127, avgTransaction: 360.24, topProduct: 'Business Laptop' },
      week: { revenue: 287650.00, transactions: 842, avgTransaction: 341.55, growth: 12.5 },
      month: { revenue: 1145230.00, transactions: 3456, avgTransaction: 331.42, growth: 8.3 },
      year: { revenue: 12450000.00, transactions: 45678, avgTransaction: 272.50, growth: 15.7 }
    },
    inventory: {
      totalProducts: 150,
      lowStock: 12,
      outOfStock: 3,
      totalValue: 245780.50,
      topMoving: ['Business Laptop', 'Wireless Mouse', 'Office Chair']
    },
    customers: {
      total: 1247,
      new: 23,
      returning: 104,
      topSpender: 'Tech Corp Ltd',
      avgOrderValue: 425.30
    }
  }

  const reportTypes = [
    { id: 'sales', label: 'Sales Reports', icon: DollarSign, description: 'Revenue and transaction analytics' },
    { id: 'inventory', label: 'Inventory Reports', icon: Package, description: 'Stock levels and movement' },
    { id: 'customers', label: 'Customer Reports', icon: Users, description: 'Customer analytics and insights' },
    { id: 'tax', label: 'Tax Reports', icon: FileText, description: 'VAT and tax reporting' }
  ]

  const dateRanges = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' },
    { id: 'custom', label: 'Custom Range' }
  ]

  const generateReport = (reportType, format) => {
    // Mock report generation
    alert(`Generating ${reportType} report in ${format} format for ${selectedCompany?.name}`)
  }

  const SalesReportContent = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">Total Revenue</p>
              <p className="text-title font-title text-sage-green">
                R {reportData.sales[dateRange]?.revenue?.toLocaleString() || '0'}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-sage-green" />
          </div>
          {reportData.sales[dateRange]?.growth && (
            <p className="text-xs text-sage-green mt-2">
              ↑ {reportData.sales[dateRange].growth}% from last period
            </p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">Transactions</p>
              <p className="text-title font-title text-sage-bg">
                {reportData.sales[dateRange]?.transactions?.toLocaleString() || '0'}
              </p>
            </div>
            <FileText className="w-8 h-8 text-sage-blue" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">Avg Transaction</p>
              <p className="text-title font-title text-sage-bg">
                R {reportData.sales[dateRange]?.avgTransaction?.toFixed(2) || '0.00'}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-sage-bg" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">Top Product</p>
              <p className="text-button font-medium text-sage-bg">
                {reportData.sales[dateRange]?.topProduct || 'N/A'}
              </p>
            </div>
            <Package className="w-8 h-8 text-sage-bg" />
          </div>
        </div>
      </div>      {/* Sales Chart */}
      <SalesCharts 
        selectedCompany={selectedCompany} 
      />

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-button font-medium text-sage-bg">Recent Transactions</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {[
              { time: '14:45', receipt: 'POS-001', customer: 'John Smith', amount: 1299.99, method: 'Card' },
              { time: '14:30', receipt: 'POS-002', customer: 'Sarah Johnson', amount: 289.98, method: 'Cash' },
              { time: '14:15', receipt: 'POS-003', customer: 'Tech Corp', amount: 1895.50, method: 'Card' },
              { time: '14:00', receipt: 'POS-004', customer: 'Mary Wilson', amount: 129.99, method: 'Gift Card' },
              { time: '13:45', receipt: 'POS-005', customer: 'David Brown', amount: 599.99, method: 'Card' }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <div className="text-body text-sage-bg/60">{transaction.time}</div>
                  <div>
                    <div className="text-body font-medium text-sage-bg">{transaction.receipt}</div>
                    <div className="text-xs text-sage-bg/60">{transaction.customer}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-body font-medium text-sage-bg">R {transaction.amount.toFixed(2)}</div>
                  <div className="text-xs text-sage-bg/60">{transaction.method}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const InventoryReportContent = () => (
    <div className="space-y-6">
      {/* Inventory Overview */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">Total Products</p>
              <p className="text-title font-title text-sage-bg">{reportData.inventory.totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-sage-bg" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">Low Stock Items</p>
              <p className="text-title font-title text-red-600">{reportData.inventory.lowStock}</p>
            </div>
            <Package className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">Out of Stock</p>
              <p className="text-title font-title text-red-600">{reportData.inventory.outOfStock}</p>
            </div>
            <Package className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">Total Value</p>
              <p className="text-title font-title text-sage-green">
                R {reportData.inventory.totalValue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-sage-green" />
          </div>
        </div>
      </div>

      {/* Top Moving Products */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-button font-medium text-sage-bg mb-4">Top Moving Products</h3>
        <div className="space-y-3">
          {reportData.inventory.topMoving.map((product, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-body text-sage-bg">{index + 1}. {product}</span>
              <span className="text-body text-sage-bg/60">High demand</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-20 bg-sage-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-title font-title text-sage-text mb-2">Reports & Analytics</h1>
          <p className="text-body text-sage-text/80">
            Business insights and reporting for {selectedCompany?.name}
          </p>
        </div>

        <div className="bg-sage-text rounded-lg shadow-lg overflow-hidden">
          {/* Report Type Selector */}
          <div className="border-b border-gray-200 p-6">
            <div className="grid grid-cols-4 gap-4">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedReport(type.id)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedReport === type.id
                      ? 'border-sage-green bg-sage-green/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <type.icon className={`w-6 h-6 mb-2 ${
                    selectedReport === type.id ? 'text-sage-green' : 'text-sage-bg'
                  }`} />
                  <div className="text-button font-medium text-sage-bg">{type.label}</div>
                  <div className="text-xs text-sage-bg/60 mt-1">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-sage-bg" />
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                  >
                    {dateRanges.map((range) => (
                      <option key={range.id} value={range.id}>{range.label}</option>
                    ))}
                  </select>
                </div>

                {dateRange === 'custom' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      value={customDateFrom}
                      onChange={(e) => setCustomDateFrom(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                    />
                    <span className="text-sage-bg">to</span>
                    <input
                      type="date"
                      value={customDateTo}
                      onChange={(e) => setCustomDateTo(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => generateReport(selectedReport, 'pdf')}
                  className="px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export PDF</span>
                </button>
                <button
                  onClick={() => generateReport(selectedReport, 'excel')}
                  className="px-4 py-2 bg-sage-blue text-white rounded-md hover:bg-sage-blue/90 transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Excel</span>
                </button>
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className="p-6">
            {selectedReport === 'sales' && <SalesReportContent />}
            {selectedReport === 'inventory' && <InventoryReportContent />}
            {selectedReport === 'customers' && (
              <div className="text-center py-12 text-sage-bg/60">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-body">Customer reports coming soon</p>
              </div>
            )}
            {selectedReport === 'tax' && (
              <div className="text-center py-12 text-sage-bg/60">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-body">Tax reports coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
