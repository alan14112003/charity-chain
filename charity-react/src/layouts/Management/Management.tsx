import { cn } from '@/lib/utils'
import { Link, Outlet } from 'react-router'

const ManagementLayout = () => {
  return (
    <div>
      <aside className="w-64 h-screen border-r shadow-sm fixed top-0 left-0 p-4">
        <div className="text-2xl font-bold mb-6">🌟 Quản lý dữ liệu</div>
        <nav className="flex flex-col gap-2">
          <Link
            to={'/management/charities'}
            className={cn(
              'flex items-center gap-3 p-2 rounded-md hover:underline transition'
            )}
          >
            <span className="text-lg">Tổ chức từ thiện</span>
          </Link>
          <Link
            to={'/management/programs'}
            className={cn(
              'flex items-center gap-3 p-2 rounded-md hover:underline transition'
            )}
          >
            <span className="text-lg">Chương trình từ thiện</span>
          </Link>
        </nav>
      </aside>
      <div className="ml-64 p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default ManagementLayout
