import { getProgramDetail, programKey } from '@/services/ProgramServices'
import {
  getTransactionByProgramCode,
  transactionKey,
} from '@/services/TransactionServices'
import { Program } from '@/types/programs.type'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { Progress } from '../ui/progress'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Helmet } from 'react-helmet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Transaction } from '@/types/transactions.type'
import { formatVND, maskAccountNumber } from './utils/helper'
import { ScrollArea } from '../ui/scroll-area'

const ProgramDetail = () => {
  const { programId = 0 } = useParams()
  const { data: programDetailRes } = useQuery({
    queryKey: [programKey, 'detail', programId],
    queryFn: () => getProgramDetail(+programId),
  })

  const programDetail: Program = programDetailRes?.data

  const { data: transactionsRes } = useQuery({
    queryKey: [transactionKey, programDetail?.code],
    queryFn: () => getTransactionByProgramCode(programDetail?.code),
  })

  const transactions: Transaction[] = transactionsRes?.data || []

  return (
    <>
      {programDetail && (
        <Helmet>
          <title>{programDetail.name}</title>
          <meta name="description" content={programDetail.descriptions} />
        </Helmet>
      )}
      <div className="mt-10">
        {programDetail && (
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
                <Button className="mt-7 w-full cursor-pointer">
                  Quyên góp
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="my-10">
        <Tabs defaultValue="descriptions" className="w-full">
          <TabsList>
            <TabsTrigger value="descriptions">Câu chuyện</TabsTrigger>
            <TabsTrigger value="transactions">Nhà hảo tâm</TabsTrigger>
          </TabsList>
          <TabsContent value="descriptions">
            {programDetail && (
              <div
                className="revert-tailwind"
                dangerouslySetInnerHTML={{
                  __html: programDetail.descriptions,
                }}
              ></div>
            )}
          </TabsContent>
          <TabsContent value="transactions">
            <ScrollArea className="h-[500px] w-full rounded-md border p-4">
              <Card className="py-3 sticky top-0 z-10">
                <CardContent className="flex items-center justify-between">
                  <div>Ngân hàng</div>
                  <div>Tên tài khoản</div>
                  <div>Số tài khoản</div>
                  <div>Số tiền</div>
                </CardContent>
              </Card>
              {transactions.map((transaction, index) => (
                <Card
                  className="mt-3 py-3"
                  key={transaction.accountNumber + `${index}`}
                >
                  <CardContent className="flex items-center justify-between">
                    <div>{transaction.bankName}</div>
                    <div>{transaction.accountHolder}</div>
                    <div>{maskAccountNumber(transaction.accountNumber)}</div>
                    <div>{formatVND(transaction.amount)}</div>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default ProgramDetail
