import ApiResource from './ApiResource.jsx'
import { fetch } from '../api.js'

export default function Teams() {
  return (
    <ApiResource
      columns={[
        { key: 'name', label: 'Team' },
        { key: 'description', label: 'About' },
        { key: 'members', label: 'Members' },
      ]}
      description="Meet the teams supporting each other’s fitness goals."
      endpoint="/api/teams/"
      fetcher={fetch}
      title="Teams"
    />
  )
}
