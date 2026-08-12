import { useState } from 'react'
import { adminLogin, adminLogout, getUsers, isAdmin } from '../lib/auth'
import {
  deleteResource,
  formatBytes,
  getAllResources,
  uploadResource,
} from '../lib/resources'
import { TRACKS } from '../mentorshipData'
import { useTheme } from '../theme/ThemeContext'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../config'
import {
  DownloadIcon,
  FilesIcon,
  LogoutIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
  UploadIcon,
  UserIcon,
} from './icons'

function AdminLogo() {
  return (
    <a href="#/" className="logo" aria-label="EnexTrade home">
      <span className="logo-badge" aria-hidden="true">
        e
      </span>
      <span className="logo-name">
        EnexTrade
        <span className="logo-tag">Admin</span>
      </span>
    </a>
  )
}

function AdminThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString()
}

function TrackUploads({
  trackId,
  onChanged,
}: {
  trackId: string
  onChanged: () => void
}) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const files = getAllResources().filter((r) => r.trackId === trackId)

  const handleFile = async (file: File | undefined) => {
    if (!file) return
    setBusy(true)
    setError('')
    const result = await uploadResource(trackId, file)
    if (!result.ok) setError(result.error)
    setBusy(false)
    onChanged()
  }

  return (
    <div className="card admin-track">
      <div className="admin-track-head">
        <div>
          <span className="mentor-track">{trackId}</span>
          <h3 className="mentor-title">{trackId}</h3>
        </div>
        <label className={`btn btn-primary btn-sm${busy ? ' is-busy' : ''}`}>
          <UploadIcon width={15} height={15} />
          {busy ? 'Uploading…' : 'Upload file'}
          <input
            type="file"
            hidden
            disabled={busy}
            onChange={(e) => {
              handleFile(e.target.files?.[0])
              e.target.value = ''
            }}
          />
        </label>
      </div>
      {error && <p className="admin-error">{error}</p>}
      {files.length === 0 ? (
        <p className="admin-empty">No files uploaded for this track yet.</p>
      ) : (
        <ul className="admin-file-list">
          {files.map((f) => (
            <li key={f.id} className="admin-file-row">
              <FilesIcon width={16} height={16} />
              <div className="admin-file-meta">
                <span className="admin-file-name" title={f.name}>
                  {f.name}
                </span>
                <span className="admin-file-sub">
                  {formatBytes(f.size)} · {formatDate(f.uploadedAt)}
                </span>
              </div>
              <a
                className="btn btn-ghost btn-sm"
                href={f.dataUrl}
                download={f.name}
                title="Download"
              >
                <DownloadIcon width={15} height={15} />
                Download
              </a>
              <button
                className="btn btn-ghost btn-sm admin-delete"
                type="button"
                title="Delete file"
                onClick={() => {
                  deleteResource(f.id)
                  onChanged()
                }}
              >
                <TrashIcon width={15} height={15} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [, force] = useState(0)
  const refresh = () => force((t) => t + 1)
  const users = getUsers()

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <AdminLogo />
        <div className="dashboard-header-actions">
          <AdminThemeToggle />
          <a className="btn btn-ghost btn-sm" href="#/">
            Back to Site
          </a>
          <button
            className="btn btn-outline btn-sm dashboard-logout"
            type="button"
            onClick={onLogout}
          >
            <LogoutIcon width={15} height={15} />
            Logout
          </button>
        </div>
      </header>

      <main className="container dashboard-main">
        <div className="dashboard-hello">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="dashboard-title">Upload files for students</h1>
            <p className="login-sub">
              Files appear in each student&apos;s dashboard under the matching
              track once it&apos;s unlocked.
            </p>
          </div>
        </div>

        <section className="dash-section">
          <div className="dash-section-head">
            <h2 className="dash-section-title">
              <UploadIcon width={20} height={20} />
              Track files
            </h2>
            <p className="dash-section-sub">
              Demo storage lives in this browser (max ~3 MB per file). Real
              cloud storage gets wired in later.
            </p>
          </div>
          <div className="admin-tracks">
            {TRACKS.map((t) => (
              <TrackUploads key={t.id} trackId={t.id} onChanged={refresh} />
            ))}
          </div>
        </section>

        <section className="dash-section">
          <div className="dash-section-head">
            <h2 className="dash-section-title">
              <UserIcon width={20} height={20} />
              Students
            </h2>
            <p className="dash-section-sub">
              {users.length} account{users.length === 1 ? '' : 's'} created so
              far (this browser only).
            </p>
          </div>
          {users.length === 0 ? (
            <p className="admin-empty">
              No student accounts yet. Sign-ups appear here.
            </p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Plan</th>
                    <th>Unlocked tracks</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.email}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`dash-plan dash-plan--${u.plan}`}>
                          {u.plan === 'paid'
                            ? 'Paid'
                            : u.plan === 'standard'
                              ? 'Standard'
                              : 'Free'}
                        </span>
                      </td>
                      <td>
                        {u.unlocked.length
                          ? u.unlocked.join(', ')
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!adminLogin(email, password, ADMIN_EMAIL, ADMIN_PASSWORD)) {
      setError('Invalid admin credentials.')
      return
    }
    onLogin()
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <AdminLogo />
        <div className="dashboard-header-actions">
          <AdminThemeToggle />
          <a className="btn btn-ghost btn-sm" href="#/">
            Back to Site
          </a>
        </div>
      </header>
      <main className="container dashboard-main">
        <div className="card login-card admin-login-card">
          <p className="eyebrow">Admin</p>
          <h1 className="login-title">Admin sign in</h1>
          <p className="login-sub">
            Manage student files and accounts. Demo credentials are set in{' '}
            <code>.env</code>.
          </p>
          <form className="login-form" onSubmit={submit}>
            <label className="login-field">
              <span>Email</span>
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="login-field">
              <span>Password</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {error && <p className="login-error">{error}</p>}
            <button className="btn btn-primary login-submit" type="submit">
              Sign in
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(isAdmin)
  return authed ? (
    <AdminPanel
      onLogout={() => {
        adminLogout()
        setAuthed(false)
      }}
    />
  ) : (
    <AdminLogin onLogin={() => setAuthed(true)} />
  )
}
