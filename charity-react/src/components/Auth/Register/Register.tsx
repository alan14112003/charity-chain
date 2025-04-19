import { Helmet } from 'react-helmet'
import { Link } from 'react-router'

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Đăng ký tài khoản</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-4">
          <h2 className="text-2xl font-bold text-center">Đăng ký tài khoản</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition duration-200"
          >
            Tạo tài khoản
          </button>

          <p className="text-center text-sm text-gray-500">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-green-500 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Register
