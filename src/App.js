import React, { useEffect, useState } from 'react'
import { getUsers } from './services/Users'
import './styles.scss'


function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
      .then(resp => resp.json())
      .then(resp => setUsers(resp))
  }, [])

  return (
    <div className="app">
      <header className="app-header">
      </header>

      {!!users.length &&
        <select>
          {users.map(user =>
            <option value={user.name}>{user.name}</option>
          )}
        </select>}
    </div>
  )
}

export default App;
