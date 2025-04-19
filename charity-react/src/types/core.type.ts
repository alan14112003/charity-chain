export interface Permission {
  id: number
  code: string
  name: string
}

export interface Role {
  id: number
  name: string
  descriptions: string
  code: string
  permissions: Permission[]
}

export interface User {
  id: number
  fullName: string
  email: string
  phone: string
  address: string
  role: Role | null
}

export interface Auth {
  access_token: string
  user: User
}
