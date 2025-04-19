import http from '@/config/http'

export const getAllPrograms = () => {
  return http.get('programs')
}
