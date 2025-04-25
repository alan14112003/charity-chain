import http from '@/config/http'

export interface FormCharityDto {
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

export const createCharity = (data: FormCharityDto) => {
  return http.post('charities', data)
}

export const updateCharity = (charityId: number, data: FormCharityDto) => {
  return http.patch(`charities/${charityId}`, data)
}
