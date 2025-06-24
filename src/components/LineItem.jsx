import { useState } from 'react'
import { X, Minus, Plus } from 'lucide-react'

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

  return (
    <div className={`grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
      index % 2 === 1 ? 'bg-gray-25' : 'bg-white'
    }`}>
      {/* SKU */}
      <div className="col-span-2 flex items-center">
        <span className="text-body text-sage-bg font-mono">{item.sku}</span>
      </div>

      {/* Product Name */}
      <div className="col-span-3 flex items-center">
        <span className="text-body text-sage-bg font-medium truncate">{item.name}</span>
      </div>

      {/* Description */}
      <div className="col-span-3 flex items-center">
        <span className="text-body text-sage-bg/80 truncate">{item.description}</span>
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
              className="w-12 text-center text-body text-sage-bg hover:bg-gray-100 rounded px-1 py-0.5 transition-colors"
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

      {/* Price */}
      <div className="col-span-2 flex items-center justify-end">
        <span className="text-body text-sage-bg font-mono">${item.price.toFixed(2)}</span>
      </div>

      {/* Total */}
      <div className="col-span-1 flex items-center justify-end space-x-2">
        <span className="text-body text-sage-bg font-mono font-medium">${lineTotal.toFixed(2)}</span>
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
