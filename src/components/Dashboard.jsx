import { BarChart3, Users, Package, AlertTriangle, TrendingUp, ShoppingCart, DollarSign, Clock } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { salesData, products } from '../data/mockData'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Dashboard = ({ selectedCompany }) => {
  const lowStockItems = products.filter(product => product.stockLevel <= product.minStock)
  
  // Mini chart data for dashboard
  const last7DaysLabels = []
  const last7DaysSales = []
  const now = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    last7DaysLabels.push(date.toLocaleDateString('en-US', { weekday: 'short' }))
    // Generate realistic sales data
    last7DaysSales.push(12000 + Math.random() * 8000)
  }

  const miniChartData = {
    labels: last7DaysLabels,
    datasets: [
      {
        label: 'Daily Sales',
        data: last7DaysSales,
        borderColor: '#2a843f',
        backgroundColor: 'rgba(42, 132, 63, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#2a843f',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 1,
        pointRadius: 3,
        pointHoverRadius: 5
      }
    ]
  }

  const miniChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#3c424f',
        titleColor: '#ebedef',
        bodyColor: '#ebedef',
        borderColor: '#2a843f',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `Sales: R${Math.round(context.parsed.y).toLocaleString()}`
          }
        }
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    },
    elements: {
      point: {
        hoverRadius: 5
      }
    }
  }
  
  const dashboardCards = [
    {
      title: "Today's Sales",
      value: `R ${salesData.today.totalSales.toLocaleString()}`,
      subtitle: `${salesData.today.transactionCount} transactions`,
      icon: DollarSign,
      color: "text-sage-green",
      bgColor: "bg-sage-green/10"
    },
    {
      title: "Average Transaction",
      value: `R ${salesData.today.averageTransaction.toFixed(2)}`,
      subtitle: "Per transaction today",
      icon: TrendingUp,
      color: "text-sage-blue",
      bgColor: "bg-sage-blue/10"
    },
    {
      title: "Low Stock Items",
      value: lowStockItems.length,
      subtitle: "Items need restocking",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Active Users",
      value: `${selectedCompany?.currentUsers || 0}/${selectedCompany?.userLimit || 0}`,
      subtitle: "License utilization",
      icon: Users,
      color: "text-sage-green",
      bgColor: "bg-sage-green/10"
    }
  ]

  const recentActivity = [
    { time: "10:45 AM", action: "Sale completed", amount: "R 1,299.99", user: "John S." },
    { time: "10:42 AM", action: "Product added", item: "Business Laptop", user: "Admin" },
    { time: "10:38 AM", action: "Customer registered", customer: "Tech Corp", user: "Sarah J." },
    { time: "10:35 AM", action: "Refund processed", amount: "R 89.99", user: "Manager" },
    { time: "10:30 AM", action: "Stock adjustment", item: "Wireless Mouse +10", user: "Admin" }
  ]

  return (
    <div className="space-y-8">
      {/* Company Status Header */}
      <div className="bg-sage-text rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-title font-title text-sage-bg mb-2">
              {selectedCompany?.name} Dashboard
            </h2>
            <div className="flex items-center space-x-6 text-body text-sage-bg/80">
              <span>Company Code: {selectedCompany?.code}</span>
              <span>Subscription: {selectedCompany?.subscription}</span>
              <span className={`font-medium ${
                selectedCompany?.status === 'Active' ? 'text-sage-green' : 'text-red-600'
              }`}>
                Status: {selectedCompany?.status}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-body text-sage-bg/60">License Expires</div>
            <div className="text-button font-medium text-sage-bg">
              {selectedCompany?.licenseExpiry}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => (
          <div key={index} className="bg-sage-text rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-title font-title text-sage-bg">{card.value}</div>
              <div className="text-body text-sage-bg font-medium">{card.title}</div>
              <div className="text-body text-sage-bg/60">{card.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">        {/* Sales Overview */}
        <div className="bg-sage-text rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="w-6 h-6 text-sage-green" />
            <h3 className="text-button font-medium text-sage-bg">Sales Overview</h3>
          </div>
          
          {/* Mini Chart */}
          <div className="mb-6 h-32">
            <Line data={miniChartData} options={miniChartOptions} />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-body text-sage-bg">Today</span>
              <div className="text-right">
                <div className="text-button font-medium text-sage-bg">
                  R {salesData.today.totalSales.toLocaleString()}
                </div>
                <div className="text-body text-sage-bg/60">
                  {salesData.today.transactionCount} transactions
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-body text-sage-bg">This Week</span>
              <div className="text-right">
                <div className="text-button font-medium text-sage-bg">
                  R {salesData.thisWeek.totalSales.toLocaleString()}
                </div>
                <div className="text-body text-sage-bg/60">
                  {salesData.thisWeek.transactionCount} transactions
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-body text-sage-bg">This Month</span>
              <div className="text-right">
                <div className="text-button font-medium text-sage-bg">
                  R {salesData.thisMonth.totalSales.toLocaleString()}
                </div>
                <div className="text-body text-sage-bg/60">
                  {salesData.thisMonth.transactionCount} transactions
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-sage-text rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Package className="w-6 h-6 text-red-600" />
            <h3 className="text-button font-medium text-sage-bg">Stock Alerts</h3>
          </div>
          
          <div className="space-y-3">
            {lowStockItems.length === 0 ? (
              <div className="text-center py-4 text-sage-bg/60">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-body">All items are well stocked</p>
              </div>
            ) : (
              lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-md">
                  <div>
                    <div className="text-body font-medium text-sage-bg">{item.name}</div>
                    <div className="text-body text-sage-bg/60">SKU: {item.sku}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-button font-medium text-red-600">
                      {item.stockLevel} left
                    </div>
                    <div className="text-body text-sage-bg/60">
                      Min: {item.minStock}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-sage-text rounded-lg shadow-lg p-6 lg:col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <Clock className="w-6 h-6 text-sage-blue" />
            <h3 className="text-button font-medium text-sage-bg">Recent Activity</h3>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="text-body text-sage-bg/60 w-20">{activity.time}</div>
                  <div>
                    <div className="text-body font-medium text-sage-bg">{activity.action}</div>
                    {activity.amount && (
                      <div className="text-body text-sage-green">{activity.amount}</div>
                    )}
                    {activity.item && (
                      <div className="text-body text-sage-bg/60">{activity.item}</div>
                    )}
                    {activity.customer && (
                      <div className="text-body text-sage-bg/60">{activity.customer}</div>
                    )}
                  </div>
                </div>
                <div className="text-body text-sage-bg/60">by {activity.user}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
