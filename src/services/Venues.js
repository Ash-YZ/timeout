export const getVenues = () => fetch('http://localhost:5000/data')

export const getVenuesByName = name => fetch('http://localhost:5000/data?name=' + name)