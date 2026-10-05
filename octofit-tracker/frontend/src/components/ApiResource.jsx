import { useCallback, useEffect, useState } from 'react'

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.map(formatValue).join(', ')
  }

  if (typeof value === 'object') {
    return value.name ?? value.fullName ?? value.username ?? value._id ?? JSON.stringify(value)
  }

  return String(value)
}

export default function ApiResource({ title, description, endpoint, columns, fetcher }) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [requestNumber, setRequestNumber] = useState(0)

  const retry = useCallback(() => setRequestNumber((number) => number + 1), [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      setLoading(true)
      setError('')
      try {
        const responseRecords = await fetcher(endpoint, { signal: controller.signal })
        setRecords(responseRecords)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [endpoint, fetcher, requestNumber])

  return (
    <section className="py-4">
      <div className="mb-4">
        <h1 className="h2 mb-1">{title}</h1>
        <p className="text-body-secondary mb-0">{description}</p>
      </div>

      {loading && (
        <p className="text-body-secondary" role="status">
          Loading {title.toLowerCase()}…
        </p>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          <p className="mb-2">Could not load {title.toLowerCase()}: {error}</p>
          <button className="btn btn-outline-danger btn-sm" onClick={retry} type="button">
            Try again
          </button>
        </div>
      )}

      {!loading && !error && records.length === 0 && (
        <p className="alert alert-info" role="status">
          No {title.toLowerCase()} found.
        </p>
      )}

      {!loading && !error && records.length > 0 && (
        <div className="table-responsive bg-white border rounded">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope="col">{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id ?? record.id ?? `${endpoint}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.key}>{formatValue(record[column.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
