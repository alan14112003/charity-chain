import http from '@/config/http'

export const programKey = 'programs'

export const getAllPrograms = () => {
  return http.get('programs')
}

export const getProgramDetail = (programId: number) => {
  return http.get(`programs/${programId}`)
}
