import aboutImg from '@/assets/about.png'

const AboutUs = () => {
  return (
    <div className="min-h-screen px-6 py-12 lg:px-20 lg:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Tiêu đề */}
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
          Về Chúng Tôi
        </h1>

        {/* Hình ảnh và nội dung */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Ảnh đại diện */}
          <img
            src={aboutImg}
            alt="Chuyển tiền từ thiện bằng blockchain"
            className="rounded-2xl shadow-lg"
          />

          {/* Nội dung */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-4">
              Trung Gian Chuyển Tiền Từ Thiện Minh Bạch Bằng Blockchain
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Chúng tôi là một nền tảng kết nối những tấm lòng hảo tâm với các
              tổ chức và cá nhân cần được giúp đỡ, thông qua công nghệ
              blockchain hiện đại. Mỗi giao dịch từ thiện đều được ghi lại minh
              bạch, không thể thay đổi, giúp tăng sự tin tưởng và hiệu quả của
              việc quyên góp.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Mục tiêu của chúng tôi là tạo ra một hệ sinh thái thiện nguyện
              minh bạch, nơi mọi khoản đóng góp đều đến đúng nơi, đúng người và
              đúng mục đích. Blockchain giúp chúng tôi xây dựng niềm tin bằng sự
              minh bạch và truy xuất nguồn gốc rõ ràng.
            </p>
          </div>
        </div>

        {/* Giá trị cốt lõi */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 dark:bg-gray-50 p-6 rounded-2xl shadow">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-900 mb-2">
              Minh bạch
            </h3>
            <p className="text-gray-600 dark:text-gray-700 text-sm">
              Mọi giao dịch đều được ghi nhận trên blockchain, không thể chỉnh
              sửa hay che giấu.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-50 p-6 rounded-2xl shadow">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-900 mb-2">
              An toàn
            </h3>
            <p className="text-gray-600 dark:text-gray-700 text-sm">
              Dữ liệu và tài chính được bảo vệ bởi công nghệ mã hóa tiên tiến.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-50 p-6 rounded-2xl shadow">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-900 mb-2">
              Kết nối
            </h3>
            <p className="text-gray-600 dark:text-gray-700 text-sm">
              Tăng cường sự kết nối giữa người quyên góp và người nhận thông qua
              nền tảng số hiện đại.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
