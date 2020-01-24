import React, { useEffect, useState } from 'react'
import { getPeople } from './services/People'
import './styles.scss'


function App() {

  const [people, setpeople] = useState([])

  useEffect(() => {
    getPeople()
      .then(resp => resp.json())
      .then(resp => setpeople(resp))
  }, [])

  const changeHandler = (e) => {
    console.log('hello', e.target.value)
  }

  return (
    <div className="app">
      <header className="appHeader">
        <h1>Timeout lunch</h1>
      </header>

      {!!people.length &&
        <fieldset>
          <legend>Who's going?</legend>
          {people.map((person, idx) =>
            <div key={idx}>
              <input type='checkbox'
                id={`person${idx}`}
                name='peopleGoing'
                value={person.name} />
              <label htmlFor={`person${idx}`}>{person.name}</label>
            </div>
          )}
        </fieldset>
      }
    </div>
  )
}

export default App;
