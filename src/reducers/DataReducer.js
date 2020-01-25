export const dataReducer = (state, action) => {
  if (action.type === 'ADD_PERSON') {
    const peopleGoing = [...state.peopleGoing, action.person]
    return { ...state, peopleGoing }
  }
  if (action.type === 'REMOVE_PERSON') {
    const peopleGoing = state.peopleGoing.filter(person => person.name !== action.person)
    return { ...state, peopleGoing }
  }
  if (action.type === 'SET_VENUE_DATA') {
    let venuesData = getVenuesData(state.peopleGoing, action.venues)

    return { ...state, venuesData }
  }
  if (action.type === 'CLEAR_VENUES_DATA') {
    return { ...state, venuesData: [] }
  }
  throw new Error()
}

/**
 * Gets 'safe' and 'unsafe' venues data 
 * 
 * @param peopleGoing {Array} Array of people attending
 * @param action {Array} Array of venues
 * 
 * @return { safe: [], unsafe: [] } 'Safe' and 'Unsafe' venues with list of people 
 *                                  who can't eat/drink there
 * 
 **/
function getVenuesData(peopleGoing, venues) {
  let venuesData = { safe: [], unsafe: [] }

  // Loop venues to decide if each person can eat or drink there
  venues.forEach(venue => {
    let unsafeVenueDataItem = { name: venue.name }
    let safeVenueDataItem = { name: venue.name }

    // Loop people and check if each one can eat/drink at the venue
    peopleGoing.forEach(person => {
      const personWontEat = person.wont_eat.map(food => food.toLowerCase())
      const personWillDrink = person.drinks.map(drink => drink.toLowerCase())
      // Filter foods person won't eat from venues food
      const foodLeftAfterWontEats = venue.food
        .filter(food => personWontEat.indexOf(food.toLowerCase()) === -1)
      // Filter drinks person will drink from venues food
      const drinksPersonWillDrink = venue.drinks
        .filter(drink => personWillDrink.indexOf(drink.toLowerCase()) !== -1)

      // If there are no other foods or drinks the person can consumer,
      // add to 'unsafe' list with persons name
      if (!foodLeftAfterWontEats.length || !drinksPersonWillDrink.length) {
        if (!foodLeftAfterWontEats.length) {
          if (unsafeVenueDataItem.noFoodFor)
            unsafeVenueDataItem.noFoodFor.push(person.name)
          else
            unsafeVenueDataItem.noFoodFor = [person.name]
        }
        if (!drinksPersonWillDrink.length) {
          if (unsafeVenueDataItem.noDrinkFor)
            unsafeVenueDataItem.noDrinkFor.push(person.name)
          else
            unsafeVenueDataItem.noDrinkFor = [person.name]
        }
      }
    })

    // Add venue data to safe/unsafe list as appropriate
    if (!!unsafeVenueDataItem.noFoodFor || !!unsafeVenueDataItem.noDrinkFor)
      venuesData.unsafe.push(unsafeVenueDataItem)
    else
      venuesData.safe.push(safeVenueDataItem)
  })
  return venuesData
}
