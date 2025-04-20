import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Transaction } from '@/types/transactions.type'
import { FC } from 'react'
import { formatVND, maskAccountNumber } from '../../utils/helper'

interface TransactionListProps {
  transactions: Transaction[]
}

const TransactionList: FC<TransactionListProps> = ({ transactions }) => {
  return (
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
  )
}

export default TransactionList
