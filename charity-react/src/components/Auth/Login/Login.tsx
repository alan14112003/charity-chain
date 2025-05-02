import { Link } from 'react-router'

const Login = () => {
  return (
    <div>
      <title>Đăng nhập</title>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-4">
          <h2 className="text-2xl font-bold text-center">Đăng nhập</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-200"
          >
            Đăng nhập
          </button>

          <p className="text-center text-sm text-gray-500">
            Chưa có tài khoản?{' '}
            <Link to={'/register'} className="text-blue-500 hover:underline">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
