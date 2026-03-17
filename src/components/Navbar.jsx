import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  if (loading) {
    return (
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-white text-xl font-bold">AI Job Tracker</div>
            </div>
            <div className="flex items-center">
              <div className="text-white">Loading...</div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold hover:text-blue-200 transition-colors" onClick={closeMenu}>
              JobPilot
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              // Logged in user navigation
              <>
                <Link
                  to="/"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/addjob"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Add Job
                </Link>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Job List
                </Link>
                <Link
                  to="/upload-resume"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Upload Resume
                </Link>

                {/* User Menu */}
                <div className="flex items-center space-x-4 ml-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    </div>
                    <span className="text-white text-sm font-medium">
                      {user.name || user.email || 'User'}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              // Not logged in navigation
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-200 focus:outline-none focus:text-blue-200"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700">
              {user ? (
                // Mobile logged in navigation
                <>
                  <Link
                    to="/"
                    className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                  <Link
                    to="/addjob"
                    className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={closeMenu}
                  >
                    Add Job
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={closeMenu}
                  >
                    Job List
                  </Link>
                  <Link
                    to="/upload-resume"
                    className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={closeMenu}
                  >
                    Upload Resume
                  </Link>

                  {/* Mobile User Info */}
                  <div className="flex items-center px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      <span className="text-white text-sm font-medium">
                        {user.name || user.email || 'User'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleLogout()
                      closeMenu()
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // Mobile not logged in navigation
                <>
                  <Link
                    to="/login"
                    className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-white text-blue-600 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar