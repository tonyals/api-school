export interface AccountModel {
  id: number
  name: string
  email: string
  password: string
  isAdmin?: boolean
  accessToken?: string
  role?: string
}
