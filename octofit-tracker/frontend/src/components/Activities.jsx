import ApiResource from './ApiResource.jsx'
import { fetch } from '../api.js'

export default function Activities() {
  return (
    <ApiResource
      columns={[
        { key: 'type', label: 'Activity' },
        { key: 'user', label: 'User' },
        { key: 'durationMinutes', label: 'Duration (min)' },
        { key: 'calories', label: 'Calories' },
        { key: 'date', label: 'Date' },
        { key: 'notes', label: 'Notes' },
      ]}
      description="Recent workouts and activity logged by the community."
      endpoint="/api/activities/"
      fetcher={fetch}
      title="Activities"
    />
  )
}
