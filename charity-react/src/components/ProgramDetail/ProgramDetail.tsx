import { getProgramDetail, programKey } from '@/services/ProgramServices'
import {
  getTransactionByProgramCode,
  transactionKey,
} from '@/services/TransactionServices'
import { Program } from '@/types/programs.type'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Transaction } from '@/types/transactions.type'
import ProgramInfo from './components/ProgramInfo'
import TransactionList from './components/TransactionList'

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
        {programDetail && <ProgramInfo programDetail={programDetail} />}
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
            <TransactionList transactions={transactions} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default ProgramDetail
