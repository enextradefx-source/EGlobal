const RESOURCES_KEY = 'enex-resources'
const MAX_FILE_BYTES = 3 * 1024 * 1024

export interface ResourceFile {
  id: string
  trackId: string
  name: string
  type: string
  size: number
  uploadedAt: number
  dataUrl: string
}

function readResources(): ResourceFile[] {
  try {
    const raw = localStorage.getItem(RESOURCES_KEY)
    return raw ? (JSON.parse(raw) as ResourceFile[]) : []
  } catch {
    return []
  }
}

function writeResources(resources: ResourceFile[]): boolean {
  try {
    localStorage.setItem(RESOURCES_KEY, JSON.stringify(resources))
    return true
  } catch {
    return false
  }
}

export function getAllResources(): ResourceFile[] {
  return readResources()
}

export function resourcesForTrack(trackId: string): ResourceFile[] {
  return readResources().filter((r) => r.trackId === trackId)
}

export function uploadResource(
  trackId: string,
  file: File,
): Promise<{ ok: true; file: ResourceFile } | { ok: false; error: string }> {
  return new Promise((resolve) => {
    if (file.size > MAX_FILE_BYTES) {
      resolve({
        ok: false,
        error: `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). The demo store allows up to 3 MB per file.`,
      })
      return
    }
    const reader = new FileReader()
    reader.onerror = () =>
      resolve({ ok: false, error: 'Could not read this file. Try again.' })
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : ''
      if (!dataUrl) {
        resolve({ ok: false, error: 'Could not read this file. Try again.' })
        return
      }
      const resource: ResourceFile = {
        id: `res_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        trackId,
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        uploadedAt: Date.now(),
        dataUrl,
      }
      const updated = [...readResources(), resource]
      if (!writeResources(updated)) {
        resolve({
          ok: false,
          error: 'Browser storage is full. Delete old files or clear site data.',
        })
        return
      }
      resolve({ ok: true, file: resource })
    }
    reader.readAsDataURL(file)
  })
}

export function deleteResource(id: string) {
  writeResources(readResources().filter((r) => r.id !== id))
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
