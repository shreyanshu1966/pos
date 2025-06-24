import { useState } from 'react'
import { CreditCard, Banknote, Gift, Smartphone, AlertCircle, Check } from 'lucide-react'

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  total, 
  lineItems, 
  selectedCompany, 
  onPaymentComplete 
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [giftCardCode, setGiftCardCode] = useState('')
  const [giftCardBalance, setGiftCardBalance] = useState(0)
  const [appliedGiftCard, setAppliedGiftCard] = useState(null)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [cashReceived, setCashReceived] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [splitPayment, setSplitPayment] = useState(false)
  const [splitAmounts, setSplitAmounts] = useState({ card: 0, cash: 0, gift: 0 })

  const paymentMethods = [
    { id: 'card', label: 'Card Payment', icon: CreditCard, description: 'Credit/Debit Card' },
    { id: 'cash', label: 'Cash Payment', icon: Banknote, description: 'Cash Register' },
    { id: 'gift', label: 'Gift Card', icon: Gift, description: 'Store Gift Card' },
    { id: 'mobile', label: 'Mobile Payment', icon: Smartphone, description: 'Yoco/Adumo' },
    { id: 'split', label: 'Split Payment', icon: CreditCard, description: 'Multiple Methods' }
  ]

  const discountedTotal = total - (appliedCoupon?.discount || 0) - (appliedGiftCard?.amount || 0)
  const changeAmount = paymentMethod === 'cash' ? Math.max(0, parseFloat(cashReceived || 0) - discountedTotal) : 0

  const validateGiftCard = () => {
    // Mock gift card validation
    if (giftCardCode === 'GIFT123') {
      const balance = 150.00
      setGiftCardBalance(balance)
      setAppliedGiftCard({ code: giftCardCode, amount: Math.min(balance, discountedTotal) })
    } else {
      alert('Invalid gift card code')
    }
  }

  const validateCoupon = () => {
    // Mock coupon validation
    if (couponCode === 'SAVE10') {
      setAppliedCoupon({ code: couponCode, discount: total * 0.1, type: '10% Off' })
    } else if (couponCode === 'FLAT50') {
      setAppliedCoupon({ code: couponCode, discount: 50, type: 'R50 Off' })
    } else {
      alert('Invalid coupon code')
    }
  }

  const processPayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      const paymentData = {
        method: paymentMethod,
        total: discountedTotal,
        lineItems,
        company: selectedCompany,
        giftCard: appliedGiftCard,
        coupon: appliedCoupon,
        change: changeAmount,
        timestamp: new Date().toISOString(),
        receiptNumber: `POS-${Date.now()}`
      }
      
      onPaymentComplete(paymentData)
      setIsProcessing(false)
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-title font-title text-sage-bg">Process Payment</h2>
          <p className="text-body text-sage-bg/60 mt-1">
            Complete transaction for {selectedCompany?.name}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-button font-medium text-sage-bg mb-3">Order Summary</h3>
            <div className="space-y-2 text-body">
              <div className="flex justify-between">
                <span>Subtotal ({lineItems.length} items):</span>
                <span>R {(total - (total * (selectedCompany?.taxRate || 0.15))).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({((selectedCompany?.taxRate || 0.15) * 100).toFixed(0)}%):</span>
                <span>R {(total * (selectedCompany?.taxRate || 0.15)).toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-sage-green">
                  <span>Coupon ({appliedCoupon.type}):</span>
                  <span>-R {appliedCoupon.discount.toFixed(2)}</span>
                </div>
              )}
              {appliedGiftCard && (
                <div className="flex justify-between text-sage-green">
                  <span>Gift Card:</span>
                  <span>-R {appliedGiftCard.amount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium text-sage-bg border-t pt-2">
                <span>Total:</span>
                <span>R {discountedTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Gift Card & Coupon Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">Gift Card Code</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={giftCardCode}
                  onChange={(e) => setGiftCardCode(e.target.value.toUpperCase())}
                  placeholder="Enter gift card code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                />
                <button
                  onClick={validateGiftCard}
                  disabled={!giftCardCode}
                  className="px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 disabled:opacity-50 text-body"
                >
                  Apply
                </button>
              </div>
              {appliedGiftCard && (
                <div className="mt-2 text-xs text-sage-green flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  Gift card applied: R {appliedGiftCard.amount.toFixed(2)}
                </div>
              )}
            </div>

            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">Coupon Code</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                />
                <button
                  onClick={validateCoupon}
                  disabled={!couponCode}
                  className="px-4 py-2 bg-sage-blue text-white rounded-md hover:bg-sage-blue/90 disabled:opacity-50 text-body"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <div className="mt-2 text-xs text-sage-green flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  Coupon applied: {appliedCoupon.type}
                </div>
              )}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-body font-medium text-sage-bg mb-3">Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-4 border rounded-lg flex items-center space-x-3 transition-colors ${
                    paymentMethod === method.id
                      ? 'border-sage-green bg-sage-green/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <method.icon className={`w-5 h-5 ${
                    paymentMethod === method.id ? 'text-sage-green' : 'text-gray-400'
                  }`} />
                  <div className="text-left">
                    <div className="text-body font-medium text-sage-bg">{method.label}</div>
                    <div className="text-xs text-sage-bg/60">{method.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cash Payment Fields */}
          {paymentMethod === 'cash' && (
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">Cash Received</label>
              <input
                type="number"
                step="0.01"
                value={cashReceived}
                onChange={(e) => setCashReceived(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
              />
              {changeAmount > 0 && (
                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-center text-yellow-800">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span className="text-body font-medium">Change Due: R {changeAmount.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-sage-bg rounded-md hover:bg-gray-50 transition-colors text-button"
            >
              Cancel
            </button>
            <button
              onClick={processPayment}
              disabled={isProcessing || (paymentMethod === 'cash' && parseFloat(cashReceived || 0) < discountedTotal)}
              className="flex-1 py-3 px-4 bg-sage-green text-white rounded-md hover:bg-sage-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-button font-medium"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Complete Payment - R ${discountedTotal.toFixed(2)}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
