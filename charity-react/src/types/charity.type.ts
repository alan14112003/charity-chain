import { Program } from './programs.type'

export interface Charity {
  id: number
  name: string
  detail: string
  avatar: string
  programs: Program[]
}
