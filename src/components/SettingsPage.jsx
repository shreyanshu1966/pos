import { useState } from 'react'
import { 
  Settings, Users, Building2, CreditCard, Bell, Shield, 
  Monitor, Palette, Download, Upload, Save, AlertTriangle,
  Check, X, Plus, Trash2, Edit
} from 'lucide-react'

const SettingsPage = ({ selectedCompany, onUpdateCompany }) => {
  const [activeTab, setActiveTab] = useState('company')
  const [users, setUsers] = useState([
    { id: 1, name: 'John Admin', email: 'john@company.com', role: 'Admin', status: 'Active', lastLogin: '2025-06-24 14:30' },
    { id: 2, name: 'Sarah Manager', email: 'sarah@company.com', role: 'Manager', status: 'Active', lastLogin: '2025-06-24 13:45' },
    { id: 3, name: 'Mike Cashier', email: 'mike@company.com', role: 'Cashier', status: 'Active', lastLogin: '2025-06-24 12:15' },
    { id: 4, name: 'Lisa Sales', email: 'lisa@company.com', role: 'Sales', status: 'Inactive', lastLogin: '2025-06-20 16:20' }
  ])
  
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Cashier' })

  const tabs = [
    { id: 'company', label: 'Company Settings', icon: Building2 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'pos', label: 'POS Configuration', icon: Monitor },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield }
  ]

  const userRoles = ['Admin', 'Manager', 'Cashier', 'Sales']

  const addUser = () => {
    if (users.length >= selectedCompany?.userLimit) {
      alert(`User limit reached (${selectedCompany.userLimit}). Upgrade your subscription to add more users.`)
      return
    }

    if (!newUser.name || !newUser.email) {
      alert('Please fill in all required fields')
      return
    }

    const user = {
      id: Date.now(),
      ...newUser,
      status: 'Active',
      lastLogin: 'Never'
    }

    setUsers([...users, user])
    setNewUser({ name: '', email: '', role: 'Cashier' })
    setShowAddUser(false)
  }

  const removeUser = (userId) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    ))
  }

  const CompanySettingsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-body font-medium text-sage-bg mb-2">Company Name</label>
          <input
            type="text"
            value={selectedCompany?.name || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
          />
        </div>
        <div>
          <label className="block text-body font-medium text-sage-bg mb-2">Company Code</label>
          <input
            type="text"
            value={selectedCompany?.code || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
          />
        </div>
      </div>

      <div>
        <label className="block text-body font-medium text-sage-bg mb-2">Address</label>
        <textarea
          value={selectedCompany?.address || ''}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-body font-medium text-sage-bg mb-2">Phone</label>
          <input
            type="tel"
            value={selectedCompany?.phone || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
          />
        </div>
        <div>
          <label className="block text-body font-medium text-sage-bg mb-2">Email</label>
          <input
            type="email"
            value={selectedCompany?.email || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
          />
        </div>
        <div>
          <label className="block text-body font-medium text-sage-bg mb-2">Tax Rate (%)</label>
          <input
            type="number"
            step="0.01"
            value={(selectedCompany?.taxRate || 0.15) * 100}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 transition-colors flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  )

  const UserManagementTab = () => (
    <div className="space-y-6">
      {/* User Limit Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="text-body font-medium text-yellow-800">
              User Limit: {users.filter(u => u.status === 'Active').length} of {selectedCompany?.userLimit || 0} used
            </p>
            <p className="text-xs text-yellow-600">
              {selectedCompany?.subscription === 'Basic' ? 'Upgrade to Standard or Premium for more users' : 'Manage your team efficiently'}
            </p>
          </div>
        </div>
      </div>

      {/* Add User Section */}
      <div className="flex justify-between items-center">
        <h3 className="text-button font-medium text-sage-bg">Team Members</h3>
        <button
          onClick={() => setShowAddUser(!showAddUser)}
          disabled={users.filter(u => u.status === 'Active').length >= selectedCompany?.userLimit}
          className="px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Add User Form */}
      {showAddUser && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="text-body font-medium text-sage-bg mb-3">Add New User</h4>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
            >
              {userRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2 mt-3">
            <button
              onClick={addUser}
              className="px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 transition-colors text-body"
            >
              Add User
            </button>
            <button
              onClick={() => setShowAddUser(false)}
              className="px-4 py-2 border border-gray-300 text-sage-bg rounded-md hover:bg-gray-50 transition-colors text-body"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-body font-medium text-sage-bg">
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div>Last Login</div>
          <div>Actions</div>
        </div>
        
        {users.map((user) => (
          <div key={user.id} className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 last:border-b-0 items-center">
            <div className="text-body text-sage-bg font-medium">{user.name}</div>
            <div className="text-body text-sage-bg/60">{user.email}</div>
            <div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                user.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {user.role}
              </span>
            </div>
            <div>
              <button
                onClick={() => toggleUserStatus(user.id)}
                className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${
                  user.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {user.status === 'Active' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                <span>{user.status}</span>
              </button>
            </div>
            <div className="text-xs text-sage-bg/60">{user.lastLogin}</div>
            <div className="flex space-x-2">
              <button
                className="p-1 text-sage-bg hover:bg-gray-100 rounded"
                title="Edit User"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeUser(user.id)}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
                title="Remove User"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const SubscriptionTab = () => (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-button font-medium text-sage-bg">Current Plan</h3>
            <p className="text-title font-title text-sage-green mt-1">{selectedCompany?.subscription || 'Basic'}</p>
            <p className="text-body text-sage-bg/60 mt-2">
              License expires: {selectedCompany?.licenseExpiry || 'N/A'}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs ${
            selectedCompany?.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {selectedCompany?.status || 'Active'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          <div>
            <p className="text-body text-sage-bg/60">User Limit</p>
            <p className="text-button font-medium text-sage-bg">{selectedCompany?.userLimit || 0} users</p>
          </div>
          <div>
            <p className="text-body text-sage-bg/60">Current Users</p>
            <p className="text-button font-medium text-sage-bg">{selectedCompany?.currentUsers || 0} active</p>
          </div>
          <div>
            <p className="text-body text-sage-bg/60">Warehouse Support</p>
            <p className="text-button font-medium text-sage-bg">{selectedCompany?.warehouse || 'Single'}</p>
          </div>
        </div>
      </div>

      {/* Plan Options */}
      <div className="grid grid-cols-3 gap-6">
        {['Basic', 'Standard', 'Premium'].map((plan) => (
          <div key={plan} className={`border rounded-lg p-6 ${
            selectedCompany?.subscription === plan ? 'border-sage-green bg-sage-green/5' : 'border-gray-200'
          }`}>
            <h4 className="text-button font-medium text-sage-bg">{plan}</h4>
            <p className="text-title font-title text-sage-bg mt-2">
              R {plan === 'Basic' ? '299' : plan === 'Standard' ? '599' : '999'}/month
            </p>
            <ul className="text-body text-sage-bg/60 mt-4 space-y-2">
              <li>• {plan === 'Basic' ? '5' : plan === 'Standard' ? '15' : '50'} users</li>
              <li>• {plan === 'Basic' ? 'Single' : 'Multi'} warehouse</li>
              <li>• {plan === 'Premium' ? 'Advanced' : 'Basic'} reporting</li>
              <li>• {plan === 'Premium' ? 'White-label' : 'Standard'} branding</li>
            </ul>
            <button className={`w-full mt-4 py-2 px-4 rounded-md transition-colors ${
              selectedCompany?.subscription === plan
                ? 'bg-sage-green text-white'
                : 'border border-sage-green text-sage-green hover:bg-sage-green hover:text-white'
            }`}>
              {selectedCompany?.subscription === plan ? 'Current Plan' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="p-20 bg-sage-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-title font-title text-sage-text mb-2">Settings</h1>
          <p className="text-body text-sage-text/80">
            Manage your company settings and configuration for {selectedCompany?.name}
          </p>
        </div>

        <div className="bg-sage-text rounded-lg shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-sage-green text-sage-green bg-sage-green/5'
                      : 'border-transparent text-sage-bg hover:text-sage-green'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-body">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'company' && <CompanySettingsTab />}
            {activeTab === 'users' && <UserManagementTab />}
            {activeTab === 'subscription' && <SubscriptionTab />}
            {(activeTab === 'pos' || activeTab === 'branding' || activeTab === 'security') && (
              <div className="text-center py-12 text-sage-bg/60">
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-body">{tabs.find(t => t.id === activeTab)?.label} coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
