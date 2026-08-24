import type { UploadResult, SimulationResult } from './types'

const API_BASE = window.location.hostname === 'localhost'
  || window.location.hostname === '127.0.0.1'
  ? 'http://127.0.0.1:8000'
  : 'https://socialpulse-o0z8.onrender.com'

export async function uploadFile(file: File): Promise<UploadResult> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    body: formData,
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'Upload failed.')
  }
  return data
}

export async function simulateHook(text: string): Promise<SimulationResult> {
  const response = await fetch(`${API_BASE}/api/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || 'Simulation failed.')
  }
  return data
}