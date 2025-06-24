import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { TrendingUp, BarChart3, PieChart, Calendar } from 'lucide-react'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const SalesChart = ({ dateRange, selectedCompany }) => {
  const [chartType, setChartType] = useState('line')
  const [chartData, setChartData] = useState(null)

  // Generate realistic sales data based on date range
  const generateSalesData = (range) => {
    const baseData = {
      today: {
        labels: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'],
        salesData: [1200, 1800, 2400, 3600, 4200, 3800, 4500, 5200, 4800],
        transactionData: [8, 12, 16, 24, 28, 25, 30, 35, 32]
      },
      week: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        salesData: [35000, 42000, 38000, 46000, 52000, 48000, 32000],
        transactionData: [180, 220, 195, 240, 275, 250, 165]
      },
      month: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        salesData: [285000, 320000, 298000, 342000],
        transactionData: [1200, 1350, 1280, 1426]
      },
      quarter: {
        labels: ['January', 'February', 'March'],
        salesData: [950000, 1080000, 1245000],
        transactionData: [4200, 4650, 5280]
      },
      year: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        salesData: [3275000, 3680000, 3920000, 4250000],
        transactionData: [14130, 15840, 16920, 18350]
      }
    }

    return baseData[range] || baseData.today
  }

  // Generate payment method breakdown
  const generatePaymentMethodData = () => {
    return {
      labels: ['Card Payments', 'Cash', 'Gift Cards', 'Store Credit', 'Mobile Pay'],
      datasets: [{
        data: [65, 20, 8, 4, 3],
        backgroundColor: [
          '#2a843f', // Sage Green
          '#004089', // Sage Blue
          '#10b981', // Emerald
          '#f59e0b', // Amber
          '#8b5cf6'  // Violet
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    }
  }

  // Generate category sales data
  const generateCategoryData = () => {
    return {
      labels: ['Electronics', 'Furniture', 'Office Equipment', 'Software', 'Accessories'],
      datasets: [{
        label: 'Category Sales (R)',
        data: [185000, 145000, 98000, 76000, 89000],
        backgroundColor: '#2a843f',
        borderColor: '#1f6b32',
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      }]
    }
  }

  useEffect(() => {
    const data = generateSalesData(dateRange)
    
    const chartConfig = {
      labels: data.labels,
      datasets: [
        {
          label: 'Sales Revenue (R)',
          data: data.salesData,
          borderColor: '#2a843f',
          backgroundColor: 'rgba(42, 132, 63, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#2a843f',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        {
          label: 'Transactions',
          data: data.transactionData,
          borderColor: '#004089',
          backgroundColor: 'rgba(0, 64, 137, 0.1)',
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          pointBackgroundColor: '#004089',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          yAxisID: 'y1',
        }
      ]
    }

    setChartData(chartConfig)
  }, [dateRange])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Lato',
            size: 12,
            weight: '600'
          }
        }
      },
      title: {
        display: true,
        text: `Sales Performance - ${dateRange.charAt(0).toUpperCase() + dateRange.slice(1)}`,
        font: {
          family: 'Lato',
          size: 16,
          weight: '700'
        },
        color: '#3c424f'
      },
      tooltip: {
        backgroundColor: 'rgba(60, 66, 79, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#2a843f',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            if (context.datasetIndex === 0) {
              return `Sales: R ${context.parsed.y.toLocaleString()}`
            } else {
              return `Transactions: ${context.parsed.y}`
            }
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Lato',
            size: 11
          },
          color: '#6b7280'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          drawBorder: false
        },
        ticks: {
          font: {
            family: 'Lato',
            size: 11
          },
          color: '#6b7280',
          callback: function(value) {
            return 'R ' + value.toLocaleString()
          }
        },
        title: {
          display: true,
          text: 'Sales Revenue (R)',
          font: {
            family: 'Lato',
            size: 12,
            weight: '600'
          },
          color: '#2a843f'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          font: {
            family: 'Lato',
            size: 11
          },
          color: '#6b7280'
        },
        title: {
          display: true,
          text: 'Transactions',
          font: {
            family: 'Lato',
            size: 12,
            weight: '600'
          },
          color: '#004089'
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      point: {
        hoverRadius: 8
      }
    }
  }

  const barOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y1: undefined // Remove second y-axis for bar chart
    }
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Lato',
            size: 12,
            weight: '600'
          }
        }
      },
      title: {
        display: true,
        text: 'Payment Methods Distribution',
        font: {
          family: 'Lato',
          size: 16,
          weight: '700'
        },
        color: '#3c424f'
      },
      tooltip: {
        backgroundColor: 'rgba(60, 66, 79, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#2a843f',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`
          }
        }
      }
    }
  }

  const chartTypes = [
    { id: 'line', label: 'Line Chart', icon: TrendingUp, description: 'Sales trend over time' },
    { id: 'bar', label: 'Bar Chart', icon: BarChart3, description: 'Category comparison' },
    { id: 'doughnut', label: 'Payment Methods', icon: PieChart, description: 'Payment breakdown' }
  ]

  const renderChart = () => {
    if (!chartData) {
      return (
        <div className="h-96 flex items-center justify-center">
          <div className="text-center text-sage-bg/60">
            <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-body">Loading chart data...</p>
          </div>
        </div>
      )
    }

    switch (chartType) {
      case 'line':
        return <Line data={chartData} options={chartOptions} height={400} />
      case 'bar':
        return <Bar data={generateCategoryData()} options={barOptions} height={400} />
      case 'doughnut':
        return <Doughnut data={generatePaymentMethodData()} options={doughnutOptions} height={400} />
      default:
        return <Line data={chartData} options={chartOptions} height={400} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Chart Type Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-button font-medium text-sage-bg mb-1">Sales Analytics</h3>
          <p className="text-body text-sage-bg/60">
            Interactive sales data visualization for {selectedCompany?.name}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {chartTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setChartType(type.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                chartType === type.id
                  ? 'bg-sage-green text-white border-sage-green shadow-md'
                  : 'bg-white text-sage-bg border-gray-200 hover:border-sage-green hover:text-sage-green'
              }`}
              title={type.description}
            >
              <type.icon className="w-4 h-4" />
              <span className="text-body font-medium">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="h-96">
          {renderChart()}
        </div>
      </div>

      {/* Chart Insights */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-sage-green/10 p-4 rounded-lg border border-sage-green/20">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-sage-green" />
            <div>
              <p className="text-body font-medium text-sage-bg">Peak Performance</p>
              <p className="text-xs text-sage-bg/60">
                {dateRange === 'today' ? '5 PM - Highest hourly sales' :
                 dateRange === 'week' ? 'Friday - Best day this week' :
                 'Week 4 - Strongest weekly performance'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-sage-blue/10 p-4 rounded-lg border border-sage-blue/20">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-sage-blue" />
            <div>
              <p className="text-body font-medium text-sage-bg">Growth Trend</p>
              <p className="text-xs text-sage-bg/60">
                {chartType === 'line' ? '+12.5% compared to last period' :
                 chartType === 'bar' ? 'Electronics leading category' :
                 'Card payments dominating (65%)'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-100 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-orange-600" />
            <div>
              <p className="text-body font-medium text-sage-bg">Forecast</p>
              <p className="text-xs text-sage-bg/60">
                Projected 15% growth next {dateRange === 'today' ? 'hour' : 
                                         dateRange === 'week' ? 'day' : 'period'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesChart
