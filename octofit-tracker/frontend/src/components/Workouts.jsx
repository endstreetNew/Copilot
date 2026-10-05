import ApiResource from './ApiResource.jsx'
import { fetch } from '../api.js'

export default function Workouts() {
  return (
    <ApiResource
      columns={[
        { key: 'name', label: 'Workout' },
        { key: 'type', label: 'Type' },
        { key: 'difficulty', label: 'Difficulty' },
        { key: 'durationMinutes', label: 'Duration (min)' },
        { key: 'equipment', label: 'Equipment' },
        { key: 'description', label: 'Description' },
      ]}
      description="Find a workout that fits your goals and schedule."
      endpoint="/api/workouts/"
      fetcher={fetch}
      title="Workouts"
    />
  )
}
