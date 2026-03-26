import { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import logo from '../assets/logo.jpeg'

// ✅ SUCCESS: Component defined outside of the render function
const Avatar = ({ user, size = 'md' }) => {
  if (!user) return null;

  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
  
  return (
    <div className={`${sizeClass} rounded-full overflow-hidden border-2 border-white flex-shrink-0`}>
      {user.profilePic ? (
        <img
          src={user.profilePic}
          alt={user.username || 'User'}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-blue-400 flex items-center justify-center">
          <span className="text-white font-semibold">
            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </span>
        </div>
      )}
    </div>
  )
}

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (loading) {
    return (
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-white text-xl font-bold">JobPilot</div>
            </div>
            <div className="flex items-center">
              <div className="text-white text-sm">Loading...</div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-blue-600 shadow-lg relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-blue-600 border-2 border-white">
                <img src={logo} alt="JobPilot Logo" className="h-full w-full object-cover" />
              </div>
              <span className="text-white text-xl font-bold hover:text-blue-200 transition-colors">
                JobPilot
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              <>
                <Link to="/" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </Link>
                <Link to="/addjob" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Add Job
                </Link>
                <Link to="/dashboard" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Dashboard
                </Link>
                <Link to="/upload-resume" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Upload Resume
                </Link>

                {/* Desktop Profile Dropdown */}
                <div className="relative ml-3" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 hover:opacity-90 transition-opacity focus:outline-none"
                  >
                    {/* ✅ Pass user prop here */}
                    <Avatar user={user} />
                    <svg
                      className={`w-3 h-3 text-white transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                      {/* User Info Header */}
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
                        {/* ✅ Pass user and size props here */}
                        <Avatar user={user} size="sm" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {user.username || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email || ''}
                          </p>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          View Profile
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={() => {
                            handleLogout()
                            setIsProfileDropdownOpen(false)
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-16 left-0 right-0 bg-blue-600 shadow-lg z-20 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-3 pb-4 pt-3 max-w-7xl mx-auto">
              <div className="rounded-xl bg-gray-900/95 backdrop-blur-lg shadow-xl border border-gray-700 p-3 space-y-2">

                {user ? (
                  <>
                    {/* Profile Card */}
                    <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-gray-800 rounded-xl border border-gray-700">
                      <Avatar user={user} />
                      <div className="min-w-0">
                        <p className="text-white text-sm font-semibold truncate">
                          {user.username || "User"}
                        </p>
                        <p className="text-blue-400 text-xs truncate">
                          {user.email || ""}
                        </p>
                      </div>
                    </div>

                    {/* Navigation Links */}
                    <Link
                      to="/"
                      className="flex items-center gap-2 text-gray-200 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-lg transition"
                      onClick={closeMenu}
                    >
                    Home
                    </Link>

                    <Link
                      to="/addjob"
                      className="flex items-center gap-2 text-gray-200 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-lg transition"
                      onClick={closeMenu}
                    >
                     Add Job
                    </Link>

                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 text-gray-200 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-lg transition"
                      onClick={closeMenu}
                    >
                       Dashboard
                    </Link>

                    <Link
                      to="/upload-resume"
                      className="flex items-center gap-2 text-gray-200 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-lg transition"
                      onClick={closeMenu}
                    >
                      Upload Resume
                    </Link>

                    {/* Divider */}
                    <div className="border-t border-gray-700 my-2"></div>

                    {/* Profile */}
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 text-gray-200 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-lg transition"
                      onClick={closeMenu}
                    >
                     View Profile
                    </Link>

                    {/* Logout */}
                    <button
                      onClick={() => {
                        handleLogout()
                        closeMenu()
                      }}
                      className="flex items-center gap-2 w-full text-left text-red-400 hover:bg-red-500/10 px-3 py-2 rounded-lg transition"
                    >
                     Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block text-gray-200 hover:bg-gray-800 px-3 py-2 rounded-lg transition"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>

                    <Link
                      to="/signup"
                      className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-center transition"
                      onClick={closeMenu}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar