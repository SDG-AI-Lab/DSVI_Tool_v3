export const addUserToLocalStorage = (user: JSON) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const result = localStorage.getItem('user')
    const user = result ? JSON.parse(result) : null

    return user
  }
  return null
}

export const removeUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user')
  }
}
