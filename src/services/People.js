export const getPeople = () => fetch('http://localhost:4000/data')

export const getPersonByName = name => fetch('http://localhost:4000/data?name=' + name)