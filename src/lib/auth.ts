const SESSION_KEY = 'enex-session'
const USERS_KEY = 'enex-users'
const ADMIN_SESSION_KEY = 'enex-admin-session'

export type Plan = 'free' | 'standard' | 'paid'

export interface UserRecord {
  email: string
  name: string
  phone: string
  password: string
  plan: Plan
  unlocked: string[]
}

export interface Session {
  email: string
  loggedInAt: number
}

function readUsers(): UserRecord[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as UserRecord[]) : []
  } catch {
    return []
  }
}

function writeUsers(users: UserRecord[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch {
    /* storage unavailable */
  }
}

export function getUsers(): UserRecord[] {
  return readUsers()
}

export function findUser(email: string): UserRecord | undefined {
  const key = email.trim().toLowerCase()
  return readUsers().find((u) => u.email.toLowerCase() === key)
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function setSession(email: string) {
  try {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ email, loggedInAt: Date.now() }),
    )
  } catch {
    /* storage unavailable */
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    /* storage unavailable */
  }
}

export function isLoggedIn(): boolean {
  return Boolean(getSession()?.email)
}

export function createAccount(
  data: { name: string; email: string; phone: string; password: string },
  plan: Plan = 'free',
) {
  const users = readUsers()
  const email = data.email.trim().toLowerCase()
  if (!users.some((u) => u.email.toLowerCase() === email)) {
    users.push({
      email,
      name: data.name.trim(),
      phone: data.phone.trim(),
      password: data.password,
      plan,
      unlocked: plan === 'free' ? ['community-free'] : [],
    })
    writeUsers(users)
  }
  setSession(email)
  return findUser(email)
}

export function currentUser(): UserRecord | null {
  const session = getSession()
  if (!session?.email) return null
  return findUser(session.email) ?? null
}

export function updateUserPlan(email: string, plan: Plan) {
  const users = readUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (user) {
    user.plan = plan
    writeUsers(users)
  }
}

export function unlockTrack(email: string, trackId: string) {
  const users = readUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (user && !user.unlocked.includes(trackId)) {
    user.unlocked.push(trackId)
    user.plan = 'paid'
    writeUsers(users)
  }
}

export function isTrackUnlocked(user: UserRecord | null, trackId: string) {
  if (!user) return false
  if (trackId === 'community') return true
  return user.unlocked.includes(trackId)
}

export function adminLogin(
  email: string,
  password: string,
  adminEmail: string,
  adminPassword: string,
): boolean {
  const ok =
    email.trim().toLowerCase() === adminEmail.toLowerCase() &&
    password === adminPassword
  if (ok) {
    try {
      localStorage.setItem(
        ADMIN_SESSION_KEY,
        JSON.stringify({ email, loggedInAt: Date.now() }),
      )
    } catch {
      /* storage unavailable */
    }
  }
  return ok
}

export function isAdmin(): boolean {
  try {
    return Boolean(localStorage.getItem(ADMIN_SESSION_KEY))
  } catch {
    return false
  }
}

export function adminLogout() {
  try {
    localStorage.removeItem(ADMIN_SESSION_KEY)
  } catch {
    /* storage unavailable */
  }
}
