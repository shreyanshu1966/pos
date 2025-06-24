import { useEffect, useState } from 'react'
import { searchProducts } from '../data/mockData'
import { Package, Plus } from 'lucide-react'

const ProductSearch = ({ query, onSelectProduct, onClose }) => {
  const [results, setResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const searchResults = searchProducts(query)
    setResults(searchResults)
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (results[selectedIndex]) {
          onSelectProduct(results[selectedIndex])
        }
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [results, selectedIndex, onSelectProduct, onClose])

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-30">
        <div className="p-4 text-center text-sage-bg/60">
          <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-body">No products found for "{query}"</p>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-30 max-h-80 overflow-y-auto">
      <div className="py-2">
        {results.map((product, index) => (
          <button
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className={`w-full text-left px-4 py-3 transition-colors ${
              index === selectedIndex ? 'bg-sage-green/10' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Package className="w-5 h-5 text-sage-bg/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-body font-medium text-sage-bg">{product.name}</span>
                      <span className="text-xs bg-gray-100 text-sage-bg px-2 py-1 rounded">{product.sku}</span>
                    </div>
                    <p className="text-xs text-sage-bg/60 truncate">{product.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-body font-medium text-sage-bg">${product.price.toFixed(2)}</span>
                <Plus className="w-4 h-4 text-sage-green" />
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {results.length > 0 && (
        <div className="border-t border-gray-200 px-4 py-2 bg-gray-50">
          <p className="text-xs text-sage-bg/60">
            Use ↑↓ arrow keys to navigate, Enter to select, Esc to close
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductSearch
