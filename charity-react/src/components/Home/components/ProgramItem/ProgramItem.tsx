import { formatVND } from '@/components/ProgramDetail/utils/helper'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Program } from '@/types/programs.type'
import { Progress } from '@radix-ui/react-progress'
import { FC } from 'react'
import { Link } from 'react-router'

interface ProgramItemProps {
  program: Program
}

const ProgramItem: FC<ProgramItemProps> = ({ program }) => {
  return (
    <Card className="shadow-lg py-2 gap-2">
      <Link to={'/programs/' + program.id} className="group">
        <CardContent>
          <img
            src={program.avatar}
            alt={program.name}
            className="w-full h-60 object-cover"
          />
        </CardContent>
        <CardHeader className="flex flex-row items-center gap-4">
          <div>
            {/* cho title có giới hạn 3 dòng */}
            <CardTitle className="text-lg group-hover:text-blue-400 text-ellipsis line-clamp-3 overflow-hidden">
              {program.name}
            </CardTitle>
          </div>
        </CardHeader>

        <CardFooter className="flex-col gap-4 w-full items-start">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={program.charity.avatar}
                alt={program.charity.name}
              />
              <AvatarImage src={program.avatar} alt={program.name} />
            </Avatar>

            <span className="text-muted-foreground">
              {program.charity.name}
            </span>
          </div>
          <div>
            {/* thống kê số tiền nhận */}
            <div className="text-sm">Tổng số tiền nhận được</div>
            <div className="flex items-center gap-1 ">
              <span>{formatVND(program.total)}</span>
              {program.target && (
                <>
                  <span>/</span>
                  <span className="text-muted-foreground">
                    {formatVND(program.target)}
                  </span>
                </>
              )}
            </div>
            {program.target && (
              <Progress value={program.total / program.target} />
            )}
          </div>
          <div className="flex justify-between items-center w-full pb-2">
            <div>
              <div>Lượt quyên góp</div>
              <div>{program.donateCount}</div>
            </div>
            <Button>Quyên góp</Button>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default ProgramItem
