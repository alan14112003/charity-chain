import http from '@/config/http'

export const transactionKey = 'transactions'

export const getTransactionByProgramCode = (programCode: string) => {
  return http.get(`transactions/${programCode}`)
}
