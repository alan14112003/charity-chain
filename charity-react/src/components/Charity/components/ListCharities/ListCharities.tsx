import { charityKey, getAllCharities } from '@/services/CharityServices'
import { Charity } from '@/types/charity.type'
import { useQuery } from '@tanstack/react-query'
import CharityItem from '../CharityItem'

const ListCharities = () => {
  const { data: listCharitiesRes } = useQuery({
    queryKey: [charityKey],
    queryFn: getAllCharities,
  })

  const listCharities: Charity[] = listCharitiesRes?.data || []
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {listCharities.map((charity) => (
        <CharityItem key={charity.id} charity={charity} />
      ))}
    </div>
  )
}

export default ListCharities
