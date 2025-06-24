import React, { useState } from 'react'
import { 
  X, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Monitor,
  CheckCircle,
  AlertCircle,
  Gift,
  QrCode,
  Printer
} from 'lucide-react'

const PaymentModal = ({ isOpen, onClose, total, onPaymentComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState('card')
  const [cashReceived, setCashReceived] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [processing, setProcessing] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [giftCardNumber, setGiftCardNumber] = useState('')
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)

  if (!isOpen) return null

  const paymentMethods = [
    {
      id: 'card',
      name: 'Card Payment',
      icon: CreditCard,
      description: 'Credit/Debit Card via Adumo/Yoco',
      color: 'bg-sage-blue'
    },
    {
      id: 'cash',
      name: 'Cash Payment',
      icon: Banknote,
      description: 'Physical cash transaction',
      color: 'bg-sage-green'
    },
    {
      id: 'mobile',
      name: 'Mobile Payment',
      icon: Smartphone,
      description: 'Apple Pay, Google Pay, Samsung Pay',
      color: 'bg-purple-600'
    },
    {
      id: 'eft',
      name: 'EFT Transfer',
      icon: Monitor,
      description: 'Electronic Funds Transfer',
      color: 'bg-orange-600'
    },
    {
      id: 'gift',
      name: 'Gift Card',
      icon: Gift,
      description: 'Redeem gift card balance',
      color: 'bg-pink-600'
    },
    {
      id: 'qr',
      name: 'QR Payment',
      icon: QrCode,
      description: 'Scan QR code payment',
      color: 'bg-indigo-600'
    }
  ]

  const calculateChange = () => {
    const received = parseFloat(cashReceived) || 0
    return received - total
  }

  const handlePayment = async () => {
    setProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const paymentData = {
      method: selectedMethod,
      amount: total,
      timestamp: new Date().toISOString(),
      reference: `PAY-${Date.now()}`,
      cardNumber: selectedMethod === 'card' ? `****${cardNumber.slice(-4)}` : null,
      cashReceived: selectedMethod === 'cash' ? parseFloat(cashReceived) : null,
      change: selectedMethod === 'cash' ? calculateChange() : 0
    }
    
    setProcessing(false)
    setShowReceipt(true)
    
    // Complete payment after showing receipt
    setTimeout(() => {
      onPaymentComplete(paymentData)
    }, 3000)
  }

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'cash':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">
                Cash Received
              </label>
              <input
                type="number"
                step="0.01"
                value={cashReceived}
                onChange={(e) => setCashReceived(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
              />
            </div>
            {cashReceived && (
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between text-body">
                  <span>Total Due:</span>
                  <span className="font-medium">R {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-body">
                  <span>Cash Received:</span>
                  <span className="font-medium">R {parseFloat(cashReceived).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-title font-title text-sage-green border-t border-gray-300 pt-2 mt-2">
                  <span>Change:</span>
                  <span>R {calculateChange().toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        )
      
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">
                Card Number (Last 4 digits)
              </label>
              <input
                type="text"
                maxLength="4"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex items-center space-x-2 text-sage-blue">
                <Monitor className="w-5 h-5" />
                <span className="text-body font-medium">Payment Gateway Integration</span>
              </div>
              <p className="text-xs text-sage-bg/60 mt-2">
                Connected to Adumo/Yoco payment processing
              </p>
            </div>
          </div>
        )
      
      case 'gift':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">
                Gift Card Number
              </label>
              <input
                type="text"
                value={giftCardNumber}
                onChange={(e) => setGiftCardNumber(e.target.value)}
                placeholder="Enter gift card number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
              />
            </div>
            <div className="bg-pink-50 p-4 rounded-md">
              <div className="flex items-center space-x-2 text-pink-600">
                <Gift className="w-5 h-5" />
                <span className="text-body font-medium">Gift Card Balance</span>
              </div>
              <p className="text-xs text-sage-bg/60 mt-2">
                Available balance: R 500.00
              </p>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="bg-gray-50 p-4 rounded-md text-center">
            <div className="text-sage-bg/60 text-body">
              {paymentMethods.find(m => m.id === selectedMethod)?.description}
            </div>
            <p className="text-xs text-sage-bg/40 mt-2">
              Payment processing will be handled by the selected gateway
            </p>
          </div>
        )
    }
  }

  if (showReceipt) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-96 max-h-screen overflow-y-auto">
          <div className="p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-title font-title text-sage-bg mb-2">Payment Successful!</h3>
            <p className="text-body text-sage-bg/60 mb-6">
              Transaction completed successfully
            </p>
            
            <div className="bg-gray-50 p-4 rounded-md text-left space-y-2">
              <div className="flex justify-between text-body">
                <span>Amount:</span>
                <span className="font-medium">R {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-body">
                <span>Method:</span>
                <span className="font-medium capitalize">{selectedMethod}</span>
              </div>
              <div className="flex justify-between text-body">
                <span>Reference:</span>
                <span className="font-medium">PAY-{Date.now()}</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <button
                onClick={() => alert('Receipt printed')}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={() => alert('Receipt emailed')}
                className="w-full px-4 py-2 border border-gray-300 text-sage-bg rounded-md hover:bg-gray-50 transition-colors"
              >
                Email Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-title font-title text-sage-bg">Process Payment</h3>
            <p className="text-body text-sage-bg/60">Total: R {total.toFixed(2)}</p>
          </div>
          <button
            onClick={onClose}
            className="text-sage-bg/60 hover:text-sage-bg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Payment Methods */}
        <div className="p-6">
          <h4 className="text-body font-medium text-sage-bg mb-4">Select Payment Method</h4>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedMethod === method.id
                      ? 'border-sage-green bg-sage-green/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-md ${method.color} text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-body font-medium text-sage-bg">{method.name}</div>
                      <div className="text-xs text-sage-bg/60">{method.description}</div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Payment Form */}
          <div className="mb-6">
            {renderPaymentForm()}
          </div>

          {/* Loyalty Points */}
          <div className="bg-yellow-50 p-4 rounded-md mb-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-body font-medium text-sage-bg">Loyalty Points</span>
                <p className="text-xs text-sage-bg/60">Earn points with this purchase</p>
              </div>
              <div className="text-right">
                <div className="text-title font-title text-orange-600">+{Math.round(total * 0.1)}</div>
                <div className="text-xs text-sage-bg/60">points</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-sage-bg rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={processing || (selectedMethod === 'cash' && calculateChange() < 0)}
              className="flex-1 px-6 py-3 bg-sage-green text-white rounded-md hover:bg-sage-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {processing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Process Payment</span>
                </>
              )}
            </button>
          </div>

          {/* Payment Validation */}
          {selectedMethod === 'cash' && cashReceived && calculateChange() < 0 && (
            <div className="mt-4 flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-body">Insufficient cash received</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
