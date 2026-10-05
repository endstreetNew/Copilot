const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchApi(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, options)

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) {
    return payload
  }

  for (const key of ['results', 'data', 'items']) {
    if (Array.isArray(payload?.[key])) {
      return payload[key]
    }
  }

  throw new Error('API response must be an array or contain a results, data, or items array')
}

export { fetchApi as fetch }
