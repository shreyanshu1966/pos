import { useState } from 'react'
import { ChevronDown, Building2 } from 'lucide-react'

const CompanySelector = ({ companies, selectedCompany, onSelectCompany }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (company) => {
    onSelectCompany(company)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md transition-colors text-menu font-menu"
      >
        <Building2 className="w-4 h-4" />
        <span>{selectedCompany?.name || 'Select Company'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {companies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => handleSelect(company)}
                  className={`w-full text-left px-4 py-2 text-body hover:bg-gray-50 transition-colors ${
                    selectedCompany?.id === company.id ? 'bg-sage-green/10 text-sage-green' : 'text-sage-bg'
                  }`}
                >
                  <div className="font-medium">{company.name}</div>
                  <div className="text-xs text-sage-bg/60">{company.code}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CompanySelector
