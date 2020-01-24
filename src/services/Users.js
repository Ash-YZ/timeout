export const getUsers = () => fetch('http://localhost:4000/data')

export const getUserByName = name => fetch('http://localhost:4000/data?name=' + name)