import { useState } from 'react'
import { X, Minus, Plus, AlertTriangle } from 'lucide-react'

const LineItem = ({ item, index, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedQuantity, setEditedQuantity] = useState(item.quantity)

  const handleQuantityChange = (newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity) || 1)
    onUpdate(item.id, { quantity })
  }

  const handleQuantityEdit = () => {
    setIsEditing(true)
    setEditedQuantity(item.quantity)
  }

  const handleQuantitySubmit = () => {
    handleQuantityChange(editedQuantity)
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleQuantitySubmit()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditedQuantity(item.quantity)
    }
  }

  const lineTotal = item.quantity * item.price
  const isLowStock = item.stockLevel && item.quantity > item.stockLevel
  const profitMargin = item.cost ? ((item.price - item.cost) / item.price * 100) : 0

  return (
    <div className={`grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
      index % 2 === 1 ? 'bg-gray-25' : 'bg-white'
    } ${isLowStock ? 'bg-red-50' : ''}`}>
      {/* SKU */}
      <div className="col-span-2 flex items-center">
        <div>
          <span className="text-body text-sage-bg font-mono">{item.sku}</span>
          {isLowStock && (
            <div className="flex items-center text-red-600 text-xs mt-1">
              <AlertTriangle className="w-3 h-3 mr-1" />
              <span>Exceeds stock ({item.stockLevel})</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Name */}
      <div className="col-span-3 flex items-center">
        <div>
          <span className="text-body text-sage-bg font-medium truncate">{item.name}</span>
          {item.stockLevel && (
            <div className="text-xs text-sage-bg/60">Stock: {item.stockLevel}</div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="col-span-3 flex items-center">
        <div>
          <span className="text-body text-sage-bg/80 truncate">{item.description}</span>
          {item.cost && profitMargin > 0 && (
            <div className="text-xs text-sage-green">
              Margin: {profitMargin.toFixed(1)}%
            </div>
          )}
        </div>
      </div>

      {/* Quantity */}
      <div className="col-span-1 flex items-center justify-center">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-3 h-3 text-sage-bg" />
          </button>
          
          {isEditing ? (
            <input
              type="number"
              min="1"
              value={editedQuantity}
              onChange={(e) => setEditedQuantity(e.target.value)}
              onBlur={handleQuantitySubmit}
              onKeyPress={handleKeyPress}
              className="w-12 text-center text-body border border-sage-green rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-sage-green"
              autoFocus
            />
          ) : (
            <button
              onClick={handleQuantityEdit}
              className={`w-12 text-center text-body rounded px-1 py-0.5 transition-colors ${
                isLowStock ? 'text-red-600 bg-red-100' : 'text-sage-bg hover:bg-gray-100'
              }`}
            >
              {item.quantity}
            </button>
          )}
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-3 h-3 text-sage-bg" />
          </button>
        </div>
      </div>

      {/* Unit Price */}
      <div className="col-span-2 flex items-center justify-end">
        <div className="text-right">
          <span className="text-body text-sage-bg font-mono">R {item.price.toFixed(2)}</span>
          {item.cost && (
            <div className="text-xs text-sage-bg/60 font-mono">
              Cost: R {item.cost.toFixed(2)}
            </div>
          )}
        </div>
      </div>

      {/* Line Total */}
      <div className="col-span-1 flex items-center justify-end space-x-2">
        <div className="text-right">
          <span className="text-body text-sage-bg font-mono font-medium">R {lineTotal.toFixed(2)}</span>
          {item.cost && (
            <div className="text-xs text-sage-green font-mono">
              +R {((item.price - item.cost) * item.quantity).toFixed(2)}
            </div>
          )}
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="w-6 h-6 flex items-center justify-center rounded bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
          title="Remove item"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default LineItem
