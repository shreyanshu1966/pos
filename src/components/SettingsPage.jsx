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
      </div>    </div>
  )

  const POSConfigurationTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-button font-medium text-sage-bg mb-4">General POS Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">Default Currency</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green">
                <option value="ZAR">South African Rand (ZAR)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">VAT Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={((selectedCompany?.taxRate || 0.15) * 100).toFixed(2)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="receipt-auto-print" className="rounded" />
              <label htmlFor="receipt-auto-print" className="text-body text-sage-bg">Auto-print receipts</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="barcode-scanner" className="rounded" defaultChecked />
              <label htmlFor="barcode-scanner" className="text-body text-sage-bg">Enable barcode scanner</label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-button font-medium text-sage-bg mb-4">Transaction Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">Default Payment Method</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green">
                <option value="card">Card Payment</option>
                <option value="cash">Cash</option>
                <option value="gift-card">Gift Card</option>
              </select>
            </div>
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">Receipt Footer Text</label>
              <textarea
                rows={3}
                placeholder="Thank you for your business!"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="ask-customer-info" className="rounded" />
              <label htmlFor="ask-customer-info" className="text-body text-sage-bg">Ask for customer info on every sale</label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-button font-medium text-sage-bg mb-4">Payment Gateway Configuration</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-body font-medium text-sage-bg mb-3">Adumo Integration</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-sage-bg/60 mb-1">Terminal ID</label>
                <input
                  type="text"
                  placeholder="ADU-12345678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                />
              </div>
              <div>
                <label className="block text-xs text-sage-bg/60 mb-1">Merchant ID</label>
                <input
                  type="text"
                  placeholder="MERCH-001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-body text-sage-bg">Connected</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-body font-medium text-sage-bg mb-3">Yoco Integration</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-sage-bg/60 mb-1">API Key</label>
                <input
                  type="password"
                  placeholder="sk_test_••••••••••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                />
              </div>
              <div>
                <label className="block text-xs text-sage-bg/60 mb-1">Webhook URL</label>
                <input
                  type="url"
                  placeholder="https://yourpos.com/webhook"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-body text-sage-bg">Setup Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-button font-medium text-sage-bg mb-4">Hardware Configuration</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h4 className="text-body font-medium text-sage-bg mb-3">Receipt Printer</h4>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green mb-2">
              <option>Epson TM-T20III</option>
              <option>Star TSP143III</option>
              <option>Generic ESC/POS</option>
            </select>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-sage-bg">Connected</span>
            </div>
          </div>
          <div>
            <h4 className="text-body font-medium text-sage-bg mb-3">Barcode Scanner</h4>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green mb-2">
              <option>Honeywell Voyager 1200g</option>
              <option>Zebra DS2208</option>
              <option>Generic USB Scanner</option>
            </select>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-sage-bg">Connected</span>
            </div>
          </div>
          <div>
            <h4 className="text-body font-medium text-sage-bg mb-3">Cash Drawer</h4>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green mb-2">
              <option>APG Series 4000</option>
              <option>Star CD3-1616</option>
              <option>Manual Operation</option>
            </select>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-sage-bg">Not Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const BrandingTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-button font-medium text-sage-bg mb-4">Company Branding</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">Company Logo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-sage-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-8 h-8 text-sage-green" />
                </div>
                <p className="text-body text-sage-bg mb-2">Drag & drop your logo here</p>
                <p className="text-xs text-sage-bg/60 mb-3">PNG, JPG up to 2MB. Recommended: 200x200px</p>
                <button className="px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 transition-colors text-body">
                  Choose File
                </button>
              </div>
            </div>
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">Business Name on Receipts</label>
              <input
                type="text"
                value={selectedCompany?.branding?.companyName || selectedCompany?.name || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-button font-medium text-sage-bg mb-4">Color Scheme</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">Primary Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={selectedCompany?.branding?.primaryColor || '#2a843f'}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedCompany?.branding?.primaryColor || '#2a843f'}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                />
              </div>
            </div>
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">Secondary Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={selectedCompany?.branding?.secondaryColor || '#004089'}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedCompany?.branding?.secondaryColor || '#004089'}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
                />
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-body font-medium text-sage-bg mb-2">Preview</h4>
              <div className="flex space-x-2">
                <div 
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: selectedCompany?.branding?.primaryColor || '#2a843f' }}
                ></div>
                <div 
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: selectedCompany?.branding?.secondaryColor || '#004089' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-button font-medium text-sage-bg mb-4">Receipt Customization</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-body font-medium text-sage-bg mb-3">Receipt Header</h4>
            <textarea
              rows={4}
              placeholder="Company Name&#10;Address Line 1&#10;Address Line 2&#10;Phone: +27 11 123 4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
            />
          </div>
          <div>
            <h4 className="text-body font-medium text-sage-bg mb-3">Receipt Footer</h4>
            <textarea
              rows={4}
              placeholder="Thank you for your business!&#10;Returns accepted within 30 days&#10;www.yourwebsite.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-body font-medium text-sage-bg mb-3">Receipt Preview</h4>
          <div className="border border-gray-300 rounded-lg p-4 bg-white" style={{ fontFamily: 'monospace' }}>
            <div className="text-center border-b pb-2 mb-2">
              <div className="text-body font-bold">{selectedCompany?.branding?.companyName || selectedCompany?.name}</div>
              <div className="text-xs text-sage-bg/60">{selectedCompany?.address}</div>
              <div className="text-xs text-sage-bg/60">{selectedCompany?.phone}</div>
            </div>
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span>Date: {new Date().toLocaleDateString()}</span>
                <span>Receipt: #12345</span>
              </div>
              <div className="border-b py-1">
                <div className="flex justify-between">
                  <span>Business Laptop</span>
                  <span>R 1,299.99</span>
                </div>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>R 1,299.99</span>
              </div>
            </div>
            <div className="text-center text-xs mt-2 pt-2 border-t">
              <div>Thank you for your business!</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 border border-gray-300 text-sage-bg rounded-md hover:bg-gray-50 transition-colors">
          Reset to Default
        </button>
        <button className="px-6 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 transition-colors">
          Save Branding
        </button>
      </div>
    </div>
  )

  const SecurityTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-button font-medium text-sage-bg mb-4">Access Control</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-body font-medium text-sage-bg">Two-Factor Authentication</div>
                <div className="text-xs text-sage-bg/60">Require 2FA for all admin users</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sage-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sage-green"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-body font-medium text-sage-bg">Session Timeout</div>
                <div className="text-xs text-sage-bg/60">Auto-logout after inactivity</div>
              </div>
              <select className="px-3 py-1 border border-gray-300 rounded text-body">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>Never</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-body font-medium text-sage-bg">IP Restriction</div>
                <div className="text-xs text-sage-bg/60">Limit access to specific IP addresses</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sage-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sage-green"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-button font-medium text-sage-bg mb-4">Password Policy</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">Minimum Password Length</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green">
                <option>6 characters</option>
                <option>8 characters</option>
                <option>10 characters</option>
                <option>12 characters</option>
              </select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="require-uppercase" className="rounded" defaultChecked />
                <label htmlFor="require-uppercase" className="text-body text-sage-bg">Require uppercase letters</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="require-numbers" className="rounded" defaultChecked />
                <label htmlFor="require-numbers" className="text-body text-sage-bg">Require numbers</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="require-special" className="rounded" />
                <label htmlFor="require-special" className="text-body text-sage-bg">Require special characters</label>
              </div>
            </div>
            <div>
              <label className="block text-body font-medium text-sage-bg mb-2">Password Expiry</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green">
                <option>Never</option>
                <option>30 days</option>
                <option>60 days</option>
                <option>90 days</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-button font-medium text-sage-bg mb-4">Audit & Compliance</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h4 className="text-body font-medium text-sage-bg mb-3">Activity Logging</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="log-logins" className="rounded" defaultChecked />
                <label htmlFor="log-logins" className="text-body text-sage-bg">User logins</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="log-transactions" className="rounded" defaultChecked />
                <label htmlFor="log-transactions" className="text-body text-sage-bg">Transactions</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="log-config" className="rounded" defaultChecked />
                <label htmlFor="log-config" className="text-body text-sage-bg">Configuration changes</label>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-body font-medium text-sage-bg mb-3">Data Retention</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-body text-sage-bg/60">Transaction logs:</span>
                <span className="text-body text-sage-bg">7 years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-body text-sage-bg/60">Audit logs:</span>
                <span className="text-body text-sage-bg">3 years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-body text-sage-bg/60">User data:</span>
                <span className="text-body text-sage-bg">As required</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-body font-medium text-sage-bg mb-3">Compliance Status</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-body text-sage-bg">PCI DSS Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-body text-sage-bg">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-body text-sage-bg">SOX Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-button font-medium text-sage-bg mb-4">Data Backup & Recovery</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-body font-medium text-sage-bg mb-3">Backup Settings</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-body font-medium text-sage-bg mb-2">Backup Frequency</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-body font-medium text-sage-bg mb-2">Backup Location</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-sage-green">
                  <option>Cloud Storage (AWS)</option>
                  <option>Local Server</option>
                  <option>External Drive</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="encrypt-backups" className="rounded" defaultChecked />
                <label htmlFor="encrypt-backups" className="text-body text-sage-bg">Encrypt backups</label>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-body font-medium text-sage-bg mb-3">Recent Backups</h4>
            <div className="space-y-2">
              {[
                { date: '2025-06-24 23:00', status: 'Success', size: '2.4 GB' },
                { date: '2025-06-23 23:00', status: 'Success', size: '2.3 GB' },
                { date: '2025-06-22 23:00', status: 'Success', size: '2.2 GB' }
              ].map((backup, index) => (
                <div key={index} className="flex items-center justify-between text-body">
                  <span className="text-sage-bg/80">{backup.date}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">{backup.status}</span>
                    <span className="text-sage-bg/60">{backup.size}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 px-4 py-2 border border-sage-green text-sage-green rounded-md hover:bg-sage-green hover:text-white transition-colors">
              Run Backup Now
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 border border-gray-300 text-sage-bg rounded-md hover:bg-gray-50 transition-colors">
          Reset Settings
        </button>
        <button className="px-6 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green/90 transition-colors">
          Save Security Settings
        </button>
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
          </div>          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'company' && <CompanySettingsTab />}
            {activeTab === 'users' && <UserManagementTab />}
            {activeTab === 'pos' && <POSConfigurationTab />}
            {activeTab === 'branding' && <BrandingTab />}
            {activeTab === 'subscription' && <SubscriptionTab />}
            {activeTab === 'security' && <SecurityTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
