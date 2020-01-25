import React, { useEffect, useState } from 'react'
import { getPeople } from './services/People'
import { getVenues } from './services/Venues'
import { dataReducer } from './reducers/DataReducer'
import './styles.scss'

const initialState = {
  peopleGoing: [],
  venuesData: []
}

function App() {

  const [people, setPeople] = useState([])
  const [venueCache, setVenueCache] = useState(null)
  const [state, dispatch] = React.useReducer(dataReducer, initialState)

  useEffect(() => {
    getPeople()
      .then(resp => resp.json())
      .then(resp => setPeople(resp))
  }, [])

  const togglePerson = (e) => {
    dispatch({ type: 'CLEAR_VENUES_DATA' })

    if (e.target.checked) {
      dispatch({ type: 'ADD_PERSON', person: people.find(p => p.name === e.target.value) })
    } else {
      dispatch({ type: 'REMOVE_PERSON', person: e.target.value })
    }
  }

  const findRestaurants = () => {
    if (venueCache)
      dispatch({ type: 'SET_VENUE_DATA', venues: venueCache })
    else
      getVenues()
        .then(resp => resp.json())
        .then(venues => {
          dispatch({ type: 'SET_VENUE_DATA', venues })
          setVenueCache(venues)
        })
  }

  return (
    <div className="app">
      <header>
        <h1>Timeout lunch</h1>
      </header>
      {!!people.length &&
        <>
          <fieldset>
            <legend>Who's going?</legend>
            {people.map((person, idx) =>
              <div key={idx}>
                <input type='checkbox'
                  className='person-checkbox'
                  id={`person${idx}`}
                  name='peopleGoing'
                  value={person.name}
                  onChange={togglePerson} />
                <label htmlFor={`person${idx}`}>{person.name}</label>
              </div>
            )}
          </fieldset>
          <button type='button' onClick={findRestaurants}>Find restaurants</button>
        </>
      }

      {!!state.venuesData.safe &&
        <>
          <h2>Places to go:</h2>
          <ul>
            {state.venuesData.safe.map((safeVenue, idx) =>
              <li key={idx}>{safeVenue.name}</li>)
            }
          </ul>
        </>
      }
      {!!state.venuesData.unsafe && !!state.venuesData.unsafe.length &&
        <>
          <h2>Places to avoid:</h2>
          <ul>
            {state.venuesData.unsafe.map((unsafeVenue, idx) =>
              <li key={idx}>{unsafeVenue.name}
                {!!unsafeVenue.noFoodFor &&
                  <ul>
                    Nothing for {unsafeVenue.noFoodFor.join(', ')} to eat
                  </ul>
                }
                {!!unsafeVenue.noDrinkFor &&
                  <ul>
                    Nothing for {unsafeVenue.noDrinkFor.join(', ')} to drink
                  </ul>
                }
              </li>)
            }
          </ul>
        </>
      }
    </div>
  )
}

export default App
