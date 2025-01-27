import { USER_LOCAL_STORAGE_KEY } from '@/constants'

type User = {
  email: string
  role: string
}

export function saveUser(user: User): void {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user))
}

export function getUser(): User | undefined {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
  return user ? JSON.parse(user) : undefined
}

export function removeUser(): void {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
}
