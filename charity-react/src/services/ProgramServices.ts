import http from '@/config/http'

export const programKey = 'programs'

export interface FormProgramDto {
  name: string
  descriptions: string
  target: number | null
  avatar: string
  charityId: number
}

export const getAllPrograms = () => {
  return http.get('programs')
}

export const getProgramDetail = (programId: number) => {
  return http.get(`programs/${programId}`)
}

export const createProgram = (createProgramDto: FormProgramDto) => {
  return http.post(`programs`, createProgramDto)
}

export const updateProgram = (
  programId: number,
  updateProgramDto: FormProgramDto
) => {
  return http.patch(`programs/${programId}`, updateProgramDto)
}

export const deleteProgram = (programId: number) => {
  return http.delete(`programs/${programId}`)
}
