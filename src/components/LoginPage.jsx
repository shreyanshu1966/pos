import { useState } from 'react'
import { Lock, User } from 'lucide-react'

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-20">
      <div className="w-full max-w-md">        {/* Sage Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 p-2">
            <img 
              src="/logo.png" 
              alt="Sage Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-title font-title text-sage-text mb-2">Sage POS System</h1>
          <p className="text-body text-sage-text/80">Connect to your Sage environment</p>
        </div>

        {/* Login Form */}
        <div className="bg-sage-text rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-body font-medium text-sage-bg mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-sage-bg/60" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md text-sage-bg placeholder-sage-bg/60 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-body font-medium text-sage-bg mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-sage-bg/60" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md text-sage-bg placeholder-sage-bg/60 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Connect Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-button font-medium text-white bg-sage-green hover:bg-sage-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                "Connect to Sage"
              )}
            </button>
          </form>

          {/* Additional Information */}
          <div className="mt-6 text-center">
            <p className="text-body text-sage-bg/60">
              Secure connection to your Sage 50cloud environment
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-body text-sage-text/60">
            © 2025 Sage POS System. Enterprise Edition.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
