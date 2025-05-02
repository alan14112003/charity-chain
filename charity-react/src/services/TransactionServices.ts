import http from '@/config/http'

export const transactionKey = 'transactions'

interface createTempTransactionDto {
  name: string
  programId: number
}

export const getTransactionByProgramCode = (programCode: string) => {
  return http.get(`transactions/${programCode}`)
}

export const createTempTransaction = (data: createTempTransactionDto) => {
  return http.post('temp-transactions', data)
}
