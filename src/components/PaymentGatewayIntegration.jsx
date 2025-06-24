import { useState } from 'react'
import { 
  CreditCard, Receipt, Gift, RefreshCw, CheckCircle, XCircle, 
  AlertTriangle, Wifi, WifiOff, Smartphone, Monitor, Zap 
} from 'lucide-react'

const PaymentGatewayIntegration = ({ total, onPaymentComplete, onPaymentError }) => {
  const [selectedGateway, setSelectedGateway] = useState('adumo')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)
  
  const paymentGateways = [
    {
      id: 'adumo',
      name: 'Adumo',
      logo: '🏦',
      description: 'South African payment gateway',
      fees: '2.5%',
      supportedMethods: ['card', 'eft', 'mobile'],
      status: 'connected',
      apiStatus: 'online'
    },
    {
      id: 'yoco',
      name: 'Yoco',
      logo: '💳',
      description: 'Mobile card machine integration',
      fees: '2.9%',
      supportedMethods: ['card', 'tap', 'mobile'],
      status: 'connected',
      apiStatus: 'online'
    },
    {
      id: 'payfast',
      name: 'PayFast',
      logo: '⚡',
      description: 'Online payment processing',
      fees: '2.2%',
      supportedMethods: ['card', 'eft', 'bitcoin'],
      status: 'available',
      apiStatus: 'offline'
    }
  ]

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, color: 'text-blue-600' },
    { id: 'eft', name: 'EFT Payment', icon: Receipt, color: 'text-green-600' },
    { id: 'mobile', name: 'Mobile Payment', icon: Smartphone, color: 'text-purple-600' },
    { id: 'tap', name: 'Tap to Pay', icon: Wifi, color: 'text-orange-600' }
  ]

  const processPayment = async (method) => {
    setIsProcessing(true)
    setPaymentStatus('processing')
    
    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.1 // 90% success rate
      
      if (success) {
        setPaymentStatus('success')
        setIsProcessing(false)
        setTimeout(() => {
          onPaymentComplete({
            gateway: selectedGateway,
            method: method,
            amount: total,
            transactionId: `TXN-${Date.now()}`,
            timestamp: new Date().toISOString()
          })
          setPaymentStatus(null)
        }, 2000)
      } else {
        setPaymentStatus('error')
        setIsProcessing(false)
        setTimeout(() => {
          onPaymentError('Payment declined. Please try again or use another payment method.')
          setPaymentStatus(null)
        }, 2000)
      }
    }, 3000)
  }

  const getStatusIcon = (status, apiStatus) => {
    if (apiStatus === 'offline') return <WifiOff className="w-4 h-4 text-red-500" />
    if (status === 'connected') return <CheckCircle className="w-4 h-4 text-green-500" />
    return <AlertTriangle className="w-4 h-4 text-orange-500" />
  }

  const getStatusColor = (status, apiStatus) => {
    if (apiStatus === 'offline') return 'text-red-600 bg-red-100'
    if (status === 'connected') return 'text-green-600 bg-green-100'
    return 'text-orange-600 bg-orange-100'
  }

  return (
    <div className="space-y-6">
      {/* Gateway Selection */}
      <div>
        <h3 className="text-button font-medium text-sage-bg mb-4">Payment Gateway Selection</h3>
        <div className="grid grid-cols-1 gap-3">
          {paymentGateways.map((gateway) => (
            <div
              key={gateway.id}
              onClick={() => gateway.apiStatus === 'online' && setSelectedGateway(gateway.id)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedGateway === gateway.id
                  ? 'border-sage-green bg-sage-green/5'
                  : gateway.apiStatus === 'online'
                    ? 'border-gray-200 hover:border-gray-300'
                    : 'border-gray-200 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{gateway.logo}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-button font-medium text-sage-bg">{gateway.name}</h4>
                      {getStatusIcon(gateway.status, gateway.apiStatus)}
                    </div>
                    <p className="text-body text-sage-bg/60">{gateway.description}</p>
                    <p className="text-body text-sage-bg/80">Processing fee: {gateway.fees}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(gateway.status, gateway.apiStatus)}`}>
                  {gateway.apiStatus === 'offline' ? 'Offline' : gateway.status}
                </span>
              </div>
              
              <div className="mt-3 flex space-x-2">
                {gateway.supportedMethods.map((method) => {
                  const methodInfo = paymentMethods.find(m => m.id === method)
                  return methodInfo ? (
                    <span key={method} className={`inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded text-xs ${methodInfo.color}`}>
                      <methodInfo.icon className="w-3 h-3" />
                      <span>{methodInfo.name}</span>
                    </span>
                  ) : null
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      {selectedGateway && (
        <div>
          <h3 className="text-button font-medium text-sage-bg mb-4">
            Payment Methods - {paymentGateways.find(g => g.id === selectedGateway)?.name}
          </h3>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between text-title font-title text-sage-bg">
              <span>Total Amount:</span>
              <span>R {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {paymentMethods
              .filter(method => paymentGateways.find(g => g.id === selectedGateway)?.supportedMethods.includes(method.id))
              .map((method) => (
                <button
                  key={method.id}
                  onClick={() => !isProcessing && processPayment(method.id)}
                  disabled={isProcessing}
                  className="flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-sage-green hover:bg-sage-green/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <method.icon className={`w-6 h-6 ${method.color}`} />
                  <span className="text-button font-medium text-sage-bg">{method.name}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Payment Status */}
      {paymentStatus && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              {paymentStatus === 'processing' && (
                <>
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sage-green mx-auto mb-4"></div>
                  <h3 className="text-title font-title text-sage-bg mb-2">Processing Payment</h3>
                  <p className="text-body text-sage-bg/60">
                    Please wait while we process your payment via {paymentGateways.find(g => g.id === selectedGateway)?.name}
                  </p>
                </>
              )}
              
              {paymentStatus === 'success' && (
                <>
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-title font-title text-green-600 mb-2">Payment Successful</h3>
                  <p className="text-body text-sage-bg/60">
                    Your payment of R {total.toFixed(2)} has been processed successfully
                  </p>
                </>
              )}
              
              {paymentStatus === 'error' && (
                <>
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-title font-title text-red-600 mb-2">Payment Failed</h3>
                  <p className="text-body text-sage-bg/60">
                    We couldn't process your payment. Please try again.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Integration Status */}
      <div className="bg-sage-text rounded-lg p-4 border border-gray-200">
        <h4 className="text-button font-medium text-sage-bg mb-3 flex items-center space-x-2">
          <Zap className="w-4 h-4 text-sage-green" />
          <span>Live Integration Status</span>
        </h4>
        
        <div className="space-y-2 text-body">
          <div className="flex items-center justify-between">
            <span className="text-sage-bg/60">API Connection:</span>
            <span className="text-green-600 flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Active</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sage-bg/60">PCI Compliance:</span>
            <span className="text-green-600 flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Verified</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sage-bg/60">Transaction Encryption:</span>
            <span className="text-green-600 flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>256-bit SSL</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentGatewayIntegration
