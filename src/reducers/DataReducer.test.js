import { dataReducer } from './DataReducer'
import { peopleGoing, venues } from './TestData'

describe('App data reducer', () => {
  describe('for determining safe/unsage venues', () => {
    it('should leave venues where there is at least one match for a food and a drink', () => {

      const state = { peopleGoing, venuesData: [] }

      const expected = {
        safe: [{
          name: "Venue 2"
        }],
        unsafe: [{
          name: "Venue 1",
          noFoodFor: ["Person 1", "Person 2"],
          noDrinkFor: ["Person 1"]
        }]
      }
      const newState = dataReducer(state, { type: 'SET_VENUE_DATA', venues })
      expect(newState).toEqual({ peopleGoing, venuesData: expected })
    })
  })

  describe('for adding a person attending', () => {
    it('should add person to attendees list', () => {

      const state = { peopleGoing }

      const newPerson = {
        "name": "Person 3",
        "wont_eat": [
          "Vegetables"
        ],
        "drinks": [
          "Champagne"
        ]
      }
      const newState = dataReducer(state, { type: 'ADD_PERSON', newPerson })
      expect(newState.peopleGoing.length).toEqual(3)
    })
  })

  describe('for removing a person attending', () => {
    it('should remove person to attendees list', () => {

      const state = { peopleGoing }
      const personToRemove = "Person 1"
      const newState = dataReducer(state, { type: 'REMOVE_PERSON', person: personToRemove })
      expect(newState.peopleGoing.length).toEqual(1)
    })
  })

  describe('for clearing safe/unsafe venues list', () => {
    it('should clear the list', () => {

      const state = { venuesData: venues }
      const newState = dataReducer(state, { type: 'CLEAR_VENUES_DATA' })
      expect(newState.venuesData.length).toEqual(0)
    })
  })

})
