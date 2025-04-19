import { Charity } from './charity.type'

export interface Program {
  id: number
  name: string
  descriptions: string
  total: number
  donateCount: number
  target: number
  avatar: string
  code: string
  charity: Charity
}
