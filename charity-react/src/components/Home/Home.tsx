import { Helmet } from 'react-helmet'
import ListPrograms from './components/ListPrograms'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>
          Charity Chain - Website trung gian chuyển tiền từ thiện uy tín
        </title>
      </Helmet>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mt-6">
        Tổng hợp các chương trình từ thiện
      </h1>

      <ListPrograms />
    </>
  )
}

export default Home
