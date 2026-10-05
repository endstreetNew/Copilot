import ApiResource from './ApiResource.jsx'
import { fetch } from '../api.js'

export default function Users() {
  return (
    <ApiResource
      columns={[
        { key: 'fullName', label: 'Name' },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'team', label: 'Team' },
      ]}
      description="Members of the OctoFit Tracker community."
      endpoint="/api/users/"
      fetcher={fetch}
      title="Users"
    />
  )
}
