import ApiResource from './ApiResource.jsx'
import { fetch } from '../api.js'

export default function Leaderboard() {
  return (
    <ApiResource
      columns={[
        { key: 'rank', label: 'Rank' },
        { key: 'user', label: 'User' },
        { key: 'points', label: 'Points' },
        { key: 'period', label: 'Period' },
      ]}
      description="See how the community is progressing this period."
      endpoint="/api/leaderboard/"
      fetcher={fetch}
      title="Leaderboard"
    />
  )
}
