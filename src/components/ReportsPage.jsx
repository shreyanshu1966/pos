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
          ))}        </div>
      </div>
    </div>
  )

  const CustomerReportContent = () => (
    <div className="space-y-6">
      {/* Customer Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">Total Customers</p>
              <p className="text-title font-title text-sage-bg">{reportData.customers.total}</p>
            </div>
            <Users className="w-8 h-8 text-sage-bg" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">New Customers</p>
              <p className="text-title font-title text-sage-green">{reportData.customers.new}</p>
            </div>
            <Users className="w-8 h-8 text-sage-green" />
          </div>
          <p className="text-xs text-sage-green mt-2">This {dateRange}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">Returning Customers</p>
              <p className="text-title font-title text-sage-blue">{reportData.customers.returning}</p>
            </div>
            <Users className="w-8 h-8 text-sage-blue" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">Avg Order Value</p>
              <p className="text-title font-title text-sage-green">
                R {reportData.customers.avgOrderValue.toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-sage-green" />
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-button font-medium text-sage-bg mb-4">Top Customers by Revenue</h3>
        <div className="space-y-3">
          {[
            { name: 'Tech Corp Ltd', orders: 45, revenue: 89750.00, lastOrder: '2025-06-24' },
            { name: 'Retail Solutions', orders: 32, revenue: 67890.00, lastOrder: '2025-06-23' },
            { name: 'Digital Marketing Co', orders: 28, revenue: 45600.00, lastOrder: '2025-06-24' },
            { name: 'Office Supplies Pro', orders: 23, revenue: 34500.00, lastOrder: '2025-06-22' },
            { name: 'Business Partners Ltd', orders: 19, revenue: 28750.00, lastOrder: '2025-06-21' }
          ].map((customer, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-sage-green/10 rounded-full flex items-center justify-center">
                  <span className="text-sage-green font-medium text-sm">{index + 1}</span>
                </div>
                <div>
                  <div className="text-body font-medium text-sage-bg">{customer.name}</div>
                  <div className="text-xs text-sage-bg/60">{customer.orders} orders • Last: {customer.lastOrder}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-body font-medium text-sage-green">R {customer.revenue.toLocaleString()}</div>
                <div className="text-xs text-sage-bg/60">Total Revenue</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Segmentation */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-button font-medium text-sage-bg mb-4">Customer Segments</h3>
          <div className="space-y-3">
            {[
              { segment: 'VIP Customers', count: 45, percentage: 3.6, color: 'text-purple-600' },
              { segment: 'Regular Customers', count: 234, percentage: 18.8, color: 'text-sage-green' },
              { segment: 'Occasional Buyers', count: 567, percentage: 45.5, color: 'text-sage-blue' },
              { segment: 'New Customers', count: 401, percentage: 32.1, color: 'text-orange-600' }
            ].map((segment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${segment.color.replace('text-', 'bg-')}`}></div>
                  <span className="text-body text-sage-bg">{segment.segment}</span>
                </div>
                <div className="text-right">
                  <div className={`text-body font-medium ${segment.color}`}>{segment.count}</div>
                  <div className="text-xs text-sage-bg/60">{segment.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-button font-medium text-sage-bg mb-4">Customer Retention</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-body mb-2">
                <span className="text-sage-bg/60">Repeat Purchase Rate</span>
                <span className="text-sage-bg font-medium">68.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-sage-green h-2 rounded-full" style={{ width: '68.5%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-body mb-2">
                <span className="text-sage-bg/60">Customer Lifetime Value</span>
                <span className="text-sage-bg font-medium">R 2,450</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-body mb-2">
                <span className="text-sage-bg/60">Average Days Between Orders</span>
                <span className="text-sage-bg font-medium">28 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const TaxReportContent = () => (
    <div className="space-y-6">
      {/* Tax Summary */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">Total VAT Collected</p>
              <p className="text-title font-title text-sage-green">R 42,675.50</p>
            </div>
            <FileText className="w-8 h-8 text-sage-green" />
          </div>
          <p className="text-xs text-sage-green mt-2">This {dateRange}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">Taxable Sales</p>
              <p className="text-title font-title text-sage-bg">R 284,503.33</p>
            </div>
            <DollarSign className="w-8 h-8 text-sage-bg" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">Exempt Sales</p>
              <p className="text-title font-title text-sage-blue">R 15,250.00</p>
            </div>
            <FileText className="w-8 h-8 text-sage-blue" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sage-bg/60">VAT Rate</p>
              <p className="text-title font-title text-sage-bg">{((selectedCompany?.taxRate || 0.15) * 100).toFixed(0)}%</p>
            </div>
            <FileText className="w-8 h-8 text-sage-bg" />
          </div>
        </div>
      </div>

      {/* VAT Return Preview */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-button font-medium text-sage-bg">VAT Return Summary - {new Date().getFullYear()}</h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 transition-colors text-body">
              Generate VAT201
            </button>
            <button className="px-4 py-2 border border-gray-300 text-sage-bg rounded-md hover:bg-gray-50 transition-colors text-body">
              View Previous Returns
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-body font-medium text-sage-bg mb-4">Output VAT (Sales)</h4>
            <div className="space-y-3">
              {[
                { description: 'Standard Rate Sales (15%)', amount: 284503.33, vat: 42675.50 },
                { description: 'Zero Rate Sales', amount: 8750.00, vat: 0.00 },
                { description: 'Exempt Sales', amount: 15250.00, vat: 0.00 }
              ].map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-body text-sage-bg/80">{item.description}</span>
                  <div className="text-right">
                    <div className="text-body text-sage-bg">R {item.amount.toLocaleString()}</div>
                    <div className="text-xs text-sage-green">VAT: R {item.vat.toLocaleString()}</div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between py-2 font-medium border-t border-gray-200">
                <span className="text-body text-sage-bg">Total Output VAT</span>
                <span className="text-body text-sage-green">R 42,675.50</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-body font-medium text-sage-bg mb-4">Input VAT (Purchases)</h4>
            <div className="space-y-3">
              {[
                { description: 'Stock Purchases', amount: 125750.00, vat: 18862.50 },
                { description: 'Operating Expenses', amount: 35200.00, vat: 5280.00 },
                { description: 'Equipment & Assets', amount: 45000.00, vat: 6750.00 }
              ].map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-body text-sage-bg/80">{item.description}</span>
                  <div className="text-right">
                    <div className="text-body text-sage-bg">R {item.amount.toLocaleString()}</div>
                    <div className="text-xs text-sage-blue">VAT: R {item.vat.toLocaleString()}</div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between py-2 font-medium border-t border-gray-200">
                <span className="text-body text-sage-bg">Total Input VAT</span>
                <span className="text-body text-sage-blue">R 30,892.50</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-button font-medium text-sage-bg">Net VAT Payable/Refundable</span>
            <span className="text-title font-title text-sage-green">R 11,783.00</span>
          </div>
          <p className="text-xs text-sage-bg/60 mt-2">Due Date: {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Tax Compliance */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-button font-medium text-sage-bg mb-4">Filing Status</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-body text-sage-bg">VAT Registration: Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-body text-sage-bg">Last Return: Filed on time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-body text-sage-bg">Next Due: {new Date(Date.now() + 15*24*60*60*1000).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-button font-medium text-sage-bg mb-4">Tax Categories</h4>
          <div className="space-y-2">
            {[
              { category: 'Standard Rate (15%)', percentage: 85.2 },
              { category: 'Zero Rate (0%)', percentage: 8.5 },
              { category: 'Exempt', percentage: 6.3 }
            ].map((cat, index) => (
              <div key={index}>
                <div className="flex justify-between text-body mb-1">
                  <span className="text-sage-bg/80">{cat.category}</span>
                  <span className="text-sage-bg">{cat.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-sage-green h-1 rounded-full" 
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-button font-medium text-sage-bg mb-4">Audit Trail</h4>
          <div className="space-y-3 text-body">
            <div className="flex justify-between">
              <span className="text-sage-bg/60">Last Audit</span>
              <span className="text-sage-bg">2024-03-15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sage-bg/60">Compliance Score</span>
              <span className="text-green-600 font-medium">98.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sage-bg/60">Records Retained</span>
              <span className="text-sage-bg">7 years</span>
            </div>
          </div>
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
            {selectedReport === 'inventory' && <InventoryReportContent />}            {selectedReport === 'customers' && <CustomerReportContent />}            {selectedReport === 'tax' && <TaxReportContent />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
