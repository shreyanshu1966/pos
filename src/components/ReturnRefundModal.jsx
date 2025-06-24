import { useState } from 'react'
import { ArrowLeft, Search, RefreshCw, AlertTriangle, Check } from 'lucide-react'

const ReturnRefundModal = ({ isOpen, onClose, onRefundComplete }) => {
  const [receiptNumber, setReceiptNumber] = useState('')
  const [foundTransaction, setFoundTransaction] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [refundReason, setRefundReason] = useState('')
  const [refundMethod, setRefundMethod] = useState('original')
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock transaction data
  const mockTransaction = {
    receiptNumber: 'POS-1234567890',
    date: '2025-06-24',
    time: '14:30',
    total: 1899.97,
    items: [
      { id: 1, sku: 'LAP001', name: 'Business Laptop', price: 1299.99, quantity: 1, canReturn: true },
      { id: 2, sku: 'MOU001', name: 'Wireless Mouse', price: 89.99, quantity: 2, canReturn: true },
      { id: 3, sku: 'KEY001', name: 'Mechanical Keyboard', price: 199.99, quantity: 1, canReturn: true }
    ],
    paymentMethod: 'Card',
    customer: 'John Smith'
  }

  const refundReasons = [
    'Defective product',
    'Wrong item ordered',
    'Customer changed mind',
    'Item damaged in transit',
    'Not as described',
    'Duplicate order',
    'Other'
  ]

  const searchTransaction = () => {
    if (receiptNumber === 'POS-1234567890') {
      setFoundTransaction(mockTransaction)
      setSelectedItems(mockTransaction.items.map(item => ({ ...item, returnQuantity: 0 })))
    } else {
      alert('Transaction not found. Try: POS-1234567890')
      setFoundTransaction(null)
    }
  }

  const updateReturnQuantity = (itemId, quantity) => {
    setSelectedItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, returnQuantity: Math.min(Math.max(0, quantity), item.quantity) }
        : item
    ))
  }

  const calculateRefundTotal = () => {
    return selectedItems.reduce((total, item) => 
      total + (item.price * item.returnQuantity), 0
    )
  }

  const processRefund = async () => {
    const itemsToRefund = selectedItems.filter(item => item.returnQuantity > 0)
    
    if (itemsToRefund.length === 0) {
      alert('Please select items to refund')
      return
    }

    if (!refundReason) {
      alert('Please select a refund reason')
      return
    }

    setIsProcessing(true)

    // Simulate refund processing
    setTimeout(() => {
      const refundData = {
        originalReceipt: receiptNumber,
        refundAmount: calculateRefundTotal(),
        items: itemsToRefund,
        reason: refundReason,
        method: refundMethod,
        timestamp: new Date().toISOString(),
        refundNumber: `REF-${Date.now()}`
      }

      onRefundComplete(refundData)
      setIsProcessing(false)
      onClose()
      
      // Reset form
      setReceiptNumber('')
      setFoundTransaction(null)
      setSelectedItems([])
      setRefundReason('')
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ArrowLeft className="w-5 h-5 text-sage-bg" />
            </button>
            <div>
              <h2 className="text-title font-title text-sage-bg">Returns & Refunds</h2>
              <p className="text-body text-sage-bg/60 mt-1">
                Process product returns and issue refunds
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Receipt Search */}
          <div>
            <label className="block text-body font-medium text-sage-bg mb-2">
              Find Transaction
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={receiptNumber}
                onChange={(e) => setReceiptNumber(e.target.value)}
                placeholder="Enter receipt number (e.g., POS-1234567890)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
              />
              <button
                onClick={searchTransaction}
                disabled={!receiptNumber}
                className="px-6 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 disabled:opacity-50 transition-colors flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Transaction Details */}
          {foundTransaction && (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-button font-medium text-sage-bg">Transaction Found</h3>
                  <div className="text-body text-sage-bg/60 mt-1">
                    <div>Receipt: {foundTransaction.receiptNumber}</div>
                    <div>Date: {foundTransaction.date} at {foundTransaction.time}</div>
                    <div>Customer: {foundTransaction.customer}</div>
                    <div>Payment: {foundTransaction.paymentMethod}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-button font-medium text-sage-bg">
                    Total: R {foundTransaction.total.toFixed(2)}
                  </div>
                  <div className="text-body text-sage-green">
                    <Check className="w-4 h-4 inline mr-1" />
                    Eligible for return
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <h4 className="text-body font-medium text-sage-bg">Select Items to Return</h4>
                
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-md">
                    <div className="flex-1">
                      <div className="font-medium text-sage-bg">{item.name}</div>
                      <div className="text-xs text-sage-bg/60">{item.sku}</div>
                      <div className="text-body text-sage-bg">R {item.price.toFixed(2)} × {item.quantity}</div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-xs text-sage-bg/60">Return Quantity</div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateReturnQuantity(item.id, item.returnQuantity - 1)}
                            disabled={item.returnQuantity <= 0}
                            className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-body">{item.returnQuantity}</span>
                          <button
                            onClick={() => updateReturnQuantity(item.id, item.returnQuantity + 1)}
                            disabled={item.returnQuantity >= item.quantity}
                            className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xs text-sage-bg/60">Refund Amount</div>
                        <div className="text-body font-medium text-sage-bg">
                          R {(item.price * item.returnQuantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Refund Details */}
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-body font-medium text-sage-bg mb-2">
                    Reason for Return
                  </label>
                  <select
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                  >
                    <option value="">Select a reason</option>
                    {refundReasons.map((reason) => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-body font-medium text-sage-bg mb-2">
                    Refund Method
                  </label>
                  <select
                    value={refundMethod}
                    onChange={(e) => setRefundMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                  >
                    <option value="original">Original Payment Method</option>
                    <option value="cash">Cash Refund</option>
                    <option value="gift">Store Credit/Gift Card</option>
                  </select>
                </div>
              </div>

              {/* Refund Summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-button font-medium text-sage-bg">Total Refund Amount:</span>
                  <span className="text-title font-title text-sage-green">
                    R {calculateRefundTotal().toFixed(2)}
                  </span>
                </div>
              </div>
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
            
            {foundTransaction && (
              <button
                onClick={processRefund}
                disabled={isProcessing || calculateRefundTotal() === 0 || !refundReason}
                className="flex-1 py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-button font-medium"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Refund...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Process Refund - R {calculateRefundTotal().toFixed(2)}
                  </div>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReturnRefundModal
