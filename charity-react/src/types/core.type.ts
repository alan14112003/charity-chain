export interface User {
  id: number
  fullName: string
  email: string
  phone: string
  address: string
}

export interface Auth {
  access_token: string
  user: User
}
