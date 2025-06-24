import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  PieChart, 
  LineChart,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const SalesCharts = ({ selectedCompany }) => {
  const [chartType, setChartType] = useState('line')
  const [timeRange, setTimeRange] = useState('7days')
  const [isLoading, setIsLoading] = useState(false)

  // Mock sales data - in real app this would come from API
  const generateSalesData = (range) => {
    const now = new Date()
    const labels = []
    const salesData = []
    const profitData = []
    
    let days = 7
    if (range === '30days') days = 30
    if (range === '90days') days = 90
    if (range === '365days') days = 365

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      
      if (range === '365days') {
        labels.push(date.toLocaleDateString('en-US', { month: 'short' }))
      } else {
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
      }
      
      // Generate realistic sales data with some variance
      const baseSales = 15000 + Math.random() * 10000
      const baseProfit = baseSales * (0.25 + Math.random() * 0.15)
      
      salesData.push(Math.round(baseSales))
      profitData.push(Math.round(baseProfit))
    }

    return { labels, salesData, profitData }
  }

  const { labels, salesData, profitData } = generateSalesData(timeRange)

  // Chart configuration with Sage theme colors
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: 'Lato'
          },
          color: '#3c424f'
        }
      },
      tooltip: {
        backgroundColor: '#3c424f',
        titleColor: '#ebedef',
        bodyColor: '#ebedef',
        borderColor: '#2a843f',
        borderWidth: 1,
        titleFont: {
          family: 'Lato',
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          family: 'Lato',
          size: 12
        },
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: R${context.parsed.y.toLocaleString()}`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#ebedef',
          borderColor: '#3c424f'
        },
        ticks: {
          color: '#3c424f',
          font: {
            family: 'Lato',
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: '#ebedef',
          borderColor: '#3c424f'
        },
        ticks: {
          color: '#3c424f',
          font: {
            family: 'Lato',
            size: 11
          },
          callback: function(value) {
            return 'R' + value.toLocaleString()
          }
        }
      }
    }
  }

  // Line Chart Data
  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Sales Revenue',
        data: salesData,
        borderColor: '#2a843f',
        backgroundColor: 'rgba(42, 132, 63, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#2a843f',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'Profit',
        data: profitData,
        borderColor: '#004089',
        backgroundColor: 'rgba(0, 64, 137, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#004089',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  }

  // Bar Chart Data
  const barChartData = {
    labels,
    datasets: [
      {
        label: 'Sales Revenue',
        data: salesData,
        backgroundColor: 'rgba(42, 132, 63, 0.8)',
        borderColor: '#2a843f',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false
      },
      {
        label: 'Profit',
        data: profitData,
        backgroundColor: 'rgba(0, 64, 137, 0.8)',
        borderColor: '#004089',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false
      }
    ]
  }

  // Category Sales Data for Doughnut Chart
  const categoryData = {
    labels: ['Electronics', 'Office Supplies', 'Software', 'Accessories', 'Services'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#2a843f',
          '#004089',
          '#42a5f5',
          '#66bb6a',
          '#ffa726'
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverBorderWidth: 3
      }
    ]
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 12,
            family: 'Lato'
          },
          color: '#3c424f',
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: '#3c424f',
        titleColor: '#ebedef',
        bodyColor: '#ebedef',
        borderColor: '#2a843f',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`
          }
        }
      }
    }
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleExport = () => {
    // In real app, this would export chart data to Excel/PDF
    alert('Chart exported successfully!')
  }

  const renderChart = () => {
    const chartHeight = "400px"
    
    switch (chartType) {
      case 'line':
        return (
          <div style={{ height: chartHeight }}>
            <Line data={lineChartData} options={chartOptions} />
          </div>
        )
      case 'bar':
        return (
          <div style={{ height: chartHeight }}>
            <Bar data={barChartData} options={chartOptions} />
          </div>
        )
      case 'doughnut':
        return (
          <div style={{ height: chartHeight }}>
            <Doughnut data={categoryData} options={doughnutOptions} />
          </div>
        )
      default:
        return (
          <div style={{ height: chartHeight }}>
            <Line data={lineChartData} options={chartOptions} />
          </div>
        )
    }
  }

  // Calculate key metrics
  const totalSales = salesData.reduce((sum, value) => sum + value, 0)
  const totalProfit = profitData.reduce((sum, value) => sum + value, 0)
  const avgSales = Math.round(totalSales / salesData.length)
  const profitMargin = ((totalProfit / totalSales) * 100).toFixed(1)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-sage-green" />
            <div>
              <h2 className="text-title font-title text-sage-bg">Sales Analytics</h2>
              <p className="text-body text-sage-bg/60 mt-1">
                Performance overview for {selectedCompany?.name || 'Current Company'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2 text-sage-bg/60 hover:text-sage-green hover:bg-sage-green/5 rounded-md transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={handleExport}
              className="p-2 text-sage-bg/60 hover:text-sage-green hover:bg-sage-green/5 rounded-md transition-colors"
              title="Export Chart"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          {/* Chart Type Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-body font-medium text-sage-bg">Chart Type:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setChartType('line')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-body transition-colors ${
                  chartType === 'line'
                    ? 'bg-sage-green text-white'
                    : 'bg-white text-sage-bg border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <LineChart className="w-4 h-4" />
                <span>Line</span>
              </button>
              
              <button
                onClick={() => setChartType('bar')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-body transition-colors ${
                  chartType === 'bar'
                    ? 'bg-sage-green text-white'
                    : 'bg-white text-sage-bg border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Bar</span>
              </button>
              
              <button
                onClick={() => setChartType('doughnut')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-body transition-colors ${
                  chartType === 'doughnut'
                    ? 'bg-sage-green text-white'
                    : 'bg-white text-sage-bg border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <PieChart className="w-4 h-4" />
                <span>Categories</span>
              </button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-body font-medium text-sage-bg">Time Range:</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-body bg-white focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-sage-green"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="365days">Last 12 Months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-sage-green/5 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body text-sage-bg/60">Total Sales</p>
                <p className="text-xl font-bold text-sage-green">R{totalSales.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-sage-green" />
            </div>
          </div>
          
          <div className="bg-sage-blue/5 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body text-sage-bg/60">Total Profit</p>
                <p className="text-xl font-bold text-sage-blue">R{totalProfit.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-sage-blue" />
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body text-sage-bg/60">Avg Daily Sales</p>
                <p className="text-xl font-bold text-sage-bg">R{avgSales.toLocaleString()}</p>
              </div>
              <Calendar className="w-8 h-8 text-sage-bg" />
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body text-sage-bg/60">Profit Margin</p>
                <p className="text-xl font-bold text-green-600">{profitMargin}%</p>
              </div>
              <PieChart className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-sage-green animate-spin mx-auto mb-2" />
              <p className="text-sage-bg/60">Loading chart data...</p>
            </div>
          </div>
        ) : (
          renderChart()
        )}
      </div>

      {/* Chart Description */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="text-body text-sage-bg/60">
          {chartType === 'line' && (
            <p>
              <strong>Sales Trend Analysis:</strong> Track sales revenue and profit trends over time. 
              The filled area chart shows performance patterns and helps identify growth opportunities.
            </p>
          )}
          {chartType === 'bar' && (
            <p>
              <strong>Performance Comparison:</strong> Compare daily sales and profit figures side by side. 
              Bar charts make it easy to spot peak performance days and identify patterns.
            </p>
          )}
          {chartType === 'doughnut' && (
            <p>
              <strong>Category Breakdown:</strong> View sales distribution across product categories. 
              This helps understand which product lines drive the most revenue for strategic planning.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalesCharts
