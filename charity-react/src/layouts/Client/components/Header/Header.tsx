import ModeToggle from '@/components/ModeToogle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { resetAuth, selectAuth } from '@/store/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { resetAuthLS } from '@/utils/authLS'
import { useState } from 'react'
import { Link } from 'react-router'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const auth = useAppSelector(selectAuth)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(resetAuth())
    resetAuthLS()
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md dark:shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-bold text-blue-600 dark:text-blue-400"
            >
              LOGO
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              Trang chủ
            </Link>
            <Link
              to="/charities"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              Tổ chức từ thiện
            </Link>
            <Link
              to="#"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              Về chúng tôi
            </Link>

            <ModeToggle />

            {/* Auth Buttons */}
            <div className="ml-6 space-x-3">
              {auth.isInitialized && auth.isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="border outline-none rounded-md px-4 py-2 cursor-pointer">
                    {auth.user.fullName}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to={'/management/charities'}>
                        Đến trang quản lý
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  to={'/login'}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-1 rounded font-medium"
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 dark:text-gray-200 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link
            to="#"
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          >
            Trang chủ
          </Link>
          <Link
            to="#"
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          >
            Tổ chức từ thiện
          </Link>
          <Link
            to="#"
            className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          >
            Về chúng tôi
          </Link>
          <hr className="border-gray-300 dark:border-gray-600" />
          <button className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium w-full text-left">
            Đăng nhập
          </button>
          <button className="block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded w-full text-left font-medium">
            Đăng ký
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
