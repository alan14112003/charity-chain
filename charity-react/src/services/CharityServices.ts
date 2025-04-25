import http from '@/config/http'

export interface CreateCharityDto {
  name: string
  detail: string
  avatar: string
  qr_code: string
}

export const charityKey = 'charities'

export const getAllCharities = () => {
  return http.get('charities')
}

export const getCharityDetail = (charityId: number) => {
  return http.get(`charities/${charityId}`)
}

export const createCharity = (data: CreateCharityDto) => {
  return http.post('charities', data)
}
