import { useState } from 'react'
import { 
  Users, Building2, Settings, Shield, AlertTriangle, 
  CheckCircle, XCircle, Monitor, CreditCard, Crown,
  UserCheck, UserX, Building, Activity
} from 'lucide-react'

const AdminPanel = ({ companies, onUpdateCompany }) => {
  const [activeTab, setActiveTab] = useState('tenants')

  const subscriptionTiers = {
    'Basic': { userLimit: 5, deviceLimit: 2, price: 199, color: 'text-blue-600' },
    'Standard': { userLimit: 10, deviceLimit: 5, price: 399, color: 'text-green-600' },
    'Premium': { userLimit: 25, deviceLimit: 10, price: 799, color: 'text-purple-600' },
    'Enterprise': { userLimit: 50, deviceLimit: 25, price: 1499, color: 'text-orange-600' }
  }

  const tabs = [
    { id: 'tenants', label: 'Multi-Tenant Management', icon: Building2 },
    { id: 'users', label: 'User Limits & Control', icon: Users },
    { id: 'devices', label: 'Device Management', icon: Monitor },
    { id: 'licenses', label: 'License Control', icon: Shield }
  ]

  const getTenantStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100'
      case 'Warning - Near Limit': return 'text-orange-600 bg-orange-100'
      case 'Suspended': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-sage-text rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Crown className="w-8 h-8 text-sage-green" />
          <div>
            <h2 className="text-title font-title text-sage-bg">SaaS Admin Control Panel</h2>
            <p className="text-body text-sage-bg/60">Multi-tenant architecture with full isolation & control</p>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-sage-green/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Building2 className="w-6 h-6 text-sage-green" />
              <span className="text-title font-title text-sage-green">{companies.length}</span>
            </div>
            <p className="text-body text-sage-bg/80 mt-1">Active Tenants</p>
          </div>
          
          <div className="bg-sage-blue/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Users className="w-6 h-6 text-sage-blue" />
              <span className="text-title font-title text-sage-blue">
                {companies.reduce((sum, company) => sum + company.currentUsers, 0)}
              </span>
            </div>
            <p className="text-body text-sage-bg/80 mt-1">Total Users</p>
          </div>
          
          <div className="bg-green-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="text-title font-title text-green-600">
                {companies.filter(c => c.status === 'Active').length}
              </span>
            </div>
            <p className="text-body text-sage-bg/80 mt-1">Active Licenses</p>
          </div>
          
          <div className="bg-orange-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <span className="text-title font-title text-orange-600">
                {companies.filter(c => c.status.includes('Warning')).length}
              </span>
            </div>
            <p className="text-body text-sage-bg/80 mt-1">Warnings</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-sage-text rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-button font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-sage-green border-b-2 border-sage-green bg-sage-green/5'
                    : 'text-sage-bg/60 hover:text-sage-bg hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'tenants' && (
            <div className="space-y-4">
              <h3 className="text-title font-title text-sage-bg mb-4">
                Multi-Tenant Management
              </h3>
              <p className="text-body text-sage-bg/60 mb-6">
                Full tenant isolation with secured environments per client
              </p>
              
              <div className="space-y-4">
                {companies.map((company) => (
                  <div key={company.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Building className="w-6 h-6 text-sage-blue" />
                        <div>
                          <h4 className="text-button font-medium text-sage-bg">{company.name}</h4>
                          <p className="text-body text-sage-bg/60">{company.code} • {company.email}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-body font-medium ${getTenantStatusColor(company.status)}`}>
                        {company.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-body">
                      <div>
                        <span className="text-sage-bg/60">Subscription:</span>
                        <div className={`font-medium ${subscriptionTiers[company.subscription]?.color || 'text-sage-bg'}`}>
                          {company.subscription}
                        </div>
                      </div>
                      <div>
                        <span className="text-sage-bg/60">Users:</span>
                        <div className="font-medium text-sage-bg">
                          {company.currentUsers}/{company.userLimit}
                        </div>
                      </div>
                      <div>
                        <span className="text-sage-bg/60">License Expires:</span>
                        <div className="font-medium text-sage-bg">{company.licenseExpiry}</div>
                      </div>
                      <div>
                        <span className="text-sage-bg/60">Revenue:</span>
                        <div className="font-medium text-sage-green">
                          R {subscriptionTiers[company.subscription]?.price || 0}/mo
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              <h3 className="text-title font-title text-sage-bg mb-4">
                User Limit Enforcement
              </h3>
              <p className="text-body text-sage-bg/60 mb-6">
                Subscription-based user restrictions with automatic enforcement
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {companies.map((company) => {
                  const tier = subscriptionTiers[company.subscription]
                  const usagePercentage = (company.currentUsers / company.userLimit) * 100
                  
                  return (
                    <div key={company.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-button font-medium text-sage-bg">{company.name}</h4>
                        <span className={`text-body font-medium ${tier?.color || 'text-sage-bg'}`}>
                          {company.subscription}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-body mb-1">
                            <span className="text-sage-bg/60">User Utilization</span>
                            <span className="text-sage-bg">{company.currentUsers}/{company.userLimit}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                usagePercentage >= 90 ? 'bg-red-500' : 
                                usagePercentage >= 75 ? 'bg-orange-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-body">
                          <span className="text-sage-bg/60">Status:</span>
                          <div className="flex items-center space-x-1">
                            {usagePercentage < 90 ? (
                              <UserCheck className="w-4 h-4 text-green-600" />
                            ) : (
                              <UserX className="w-4 h-4 text-red-600" />
                            )}
                            <span className={usagePercentage >= 90 ? 'text-red-600' : 'text-green-600'}>
                              {usagePercentage >= 90 ? 'Limit Reached' : 'Available'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === 'devices' && (
            <div className="space-y-4">
              <h3 className="text-title font-title text-sage-bg mb-4">
                Device Limit per Store
              </h3>
              <p className="text-body text-sage-bg/60 mb-6">
                Control terminal and mobile device access per location
              </p>
              
              <div className="space-y-4">
                {companies.map((company) => {
                  const tier = subscriptionTiers[company.subscription]
                  const deviceLimit = tier?.deviceLimit || 1
                  const currentDevices = Math.floor(Math.random() * deviceLimit) + 1
                  
                  return (
                    <div key={company.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Monitor className="w-6 h-6 text-sage-blue" />
                          <div>
                            <h4 className="text-button font-medium text-sage-bg">{company.name}</h4>
                            <p className="text-body text-sage-bg/60">{company.warehouse}</p>
                          </div>
                        </div>
                        <span className={`text-body font-medium ${tier?.color || 'text-sage-bg'}`}>
                          {deviceLimit} Device Limit
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-body">
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-green-600">{currentDevices}</span>
                          </div>
                          <p className="text-sage-bg/60 text-xs">Active Devices</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <Monitor className="w-4 h-4 text-sage-bg" />
                            <span className="font-medium text-sage-bg">{deviceLimit - currentDevices}</span>
                          </div>
                          <p className="text-sage-bg/60 text-xs">Available Slots</p>
                        </div>
                        <div className="bg-sage-blue/10 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-sage-blue" />
                            <span className="font-medium text-sage-blue">Enforced</span>
                          </div>
                          <p className="text-sage-bg/60 text-xs">Limit Status</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === 'licenses' && (
            <div className="space-y-4">
              <h3 className="text-title font-title text-sage-bg mb-4">
                License Suspension & Warning System
              </h3>
              <p className="text-body text-sage-bg/60 mb-6">
                Automatic warnings and access control for license management
              </p>
              
              <div className="space-y-4">
                {companies.map((company) => {
                  const expiryDate = new Date(company.licenseExpiry)
                  const today = new Date()
                  const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))
                  const isExpiringSoon = daysUntilExpiry <= 30
                  const isExpired = daysUntilExpiry < 0
                  
                  return (
                    <div key={company.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-6 h-6 text-sage-green" />
                          <div>
                            <h4 className="text-button font-medium text-sage-bg">{company.name}</h4>
                            <p className="text-body text-sage-bg/60">License: {company.licenseExpiry}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {isExpired ? (
                            <XCircle className="w-5 h-5 text-red-600" />
                          ) : isExpiringSoon ? (
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                          <span className={`text-body font-medium ${
                            isExpired ? 'text-red-600' : 
                            isExpiringSoon ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {isExpired ? 'Expired' : 
                             isExpiringSoon ? `${daysUntilExpiry} days left` : 'Active'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-body text-sage-bg/60">Subscription</p>
                          <p className="text-button font-medium text-sage-bg">{company.subscription}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-body text-sage-bg/60">Access Status</p>
                          <p className={`text-button font-medium ${
                            isExpired ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {isExpired ? 'Suspended' : 'Active'}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-body text-sage-bg/60">Data Protection</p>
                          <p className="text-button font-medium text-sage-blue">Secured</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
