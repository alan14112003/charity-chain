import ListCharities from './components/ListCharities'

const Charity = () => {
  return (
    <>
      <title>Tổng hợp các tổ chức từ thiện - Charity Chain</title>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mt-6">
        Tổng hợp các tổ chức từ thiện
      </h1>

      <ListCharities />
    </>
  )
}

export default Charity
