import { Program } from './programs.type'

export interface Charity {
  id: number
  name: string
  detail: string
  avatar: string
  programs?: Program[]
  qr_code: string
}

export interface BankInfo {
  bank_name: string
  bank_account_number: string
  bank_account_name: string
}
