import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Program } from '@/types/programs.type'
import { FC } from 'react'
import TransactionForm from '../TransactionForm'

interface ProgramInfoProps {
  programDetail: Program
}

const ProgramInfo: FC<ProgramInfoProps> = ({ programDetail }) => {
  return (
    <>
      <h1 className="uppercase font-bold text-2xl pr-2">
        {programDetail.name}
      </h1>
      <div className="mt-5 flex justify-between">
        <img
          className="w-2xl h-96 object-cover"
          src={programDetail.avatar}
          alt={programDetail.name}
        />
        <div>
          <h2 className="text-lg font-bold">Thông tin quyên góp</h2>
          <Card className="py-4 w-80 mt-6">
            <CardContent>
              <div>
                {/* thống kê số tiền nhận */}
                <div className="text-sm">Tổng số tiền nhận được</div>
                <div className="flex items-center gap-1">
                  <span>{programDetail.total}đ</span>
                  {programDetail.target && (
                    <>
                      <span>/</span>
                      <span className="text-muted-foreground">
                        {programDetail.target}đ
                      </span>
                    </>
                  )}
                </div>
                {programDetail.target && (
                  <Progress
                    value={programDetail.total / programDetail.target}
                  />
                )}
              </div>
              <div className="flex justify-between items-center w-full pb-2">
                <div>
                  <div>Lượt quyên góp</div>
                  <div>{programDetail.donateCount}</div>
                </div>
              </div>

              <div>Đơn vị tổ chức</div>
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={programDetail.charity?.avatar}
                    alt={programDetail.charity?.name}
                  />
                  <AvatarImage
                    src={programDetail.avatar}
                    alt={programDetail.name}
                  />
                </Avatar>

                <span className="text-muted-foreground">
                  {programDetail.charity.name}
                </span>
              </div>
            </CardContent>
          </Card>
          {programDetail && (
            <>
              <TransactionForm program={programDetail}>
                <Button className="mt-7 w-full cursor-pointer">
                  Quyên góp
                </Button>
              </TransactionForm>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ProgramInfo
