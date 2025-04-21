import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Charity } from '@/types/charity.type'
import { FC } from 'react'
import { Link } from 'react-router'

interface CharityItemProps {
  charity: Charity
}

const CharityItem: FC<CharityItemProps> = ({ charity }) => {
  return (
    <Card className="w-full sm:w-1/2 lg:w-1/3 shadow-lg py-2 gap-2">
      <Link to={'/programs/' + charity.id} className="group">
        <CardContent>
          <img
            src={charity.avatar}
            alt={charity.name}
            className="w-full h-60 object-cover"
          />
        </CardContent>
        <CardHeader className="flex flex-row items-center gap-4">
          <div>
            <CardTitle className="text-lg group-hover:text-blue-400">
              {charity.name}
            </CardTitle>
          </div>
        </CardHeader>
      </Link>
    </Card>
  )
}

export default CharityItem
