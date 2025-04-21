import http from '@/config/http'

export const charityKey = 'charities'

export const getAllCharities = () => {
  return http.get('charities')
}

export const getCharityDetail = (charityId: number) => {
  return http.get(`charities/${charityId}`)
}
