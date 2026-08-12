import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import {
  clearSession,
  createAccount,
  currentUser,
  setSession,
  unlockTrack,
  updateUserPlan,
  type Plan,
  type UserRecord,
} from '../lib/auth'

interface AuthContextValue {
  user: UserRecord | null
  refresh: () => void
  signup: (data: {
    name: string
    email: string
    phone: string
    password: string
  }) => UserRecord | null
  login: (email: string) => boolean
  logout: () => void
  unlock: (trackId: string) => void
  setPlan: (plan: Plan) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function findUserFromStore(email: string): UserRecord | null {
  const raw = localStorage.getItem('enex-users')
  if (!raw) return null
  try {
    const users = JSON.parse(raw) as UserRecord[]
    const key = email.trim().toLowerCase()
    return users.find((u) => u.email.toLowerCase() === key) ?? null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserRecord | null>(() => currentUser())

  const refresh = useCallback(() => setUser(currentUser()), [])

  const signup: AuthContextValue['signup'] = useCallback((data) => {
    createAccount(data, 'free')
    const created = currentUser()
    setUser(created)
    return created
  }, [])

  const login = useCallback((email: string) => {
    const existing = findUserFromStore(email)
    if (existing) {
      setSession(existing.email)
      setUser(existing)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const unlock = useCallback(
    (trackId: string) => {
      if (user) unlockTrack(user.email, trackId)
      refresh()
    },
    [user, refresh],
  )

  const setPlan = useCallback(
    (plan: Plan) => {
      if (user) updateUserPlan(user.email, plan)
      refresh()
    },
    [user, refresh],
  )

  return (
    <AuthContext.Provider
      value={{ user, refresh, signup, login, logout, unlock, setPlan }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
