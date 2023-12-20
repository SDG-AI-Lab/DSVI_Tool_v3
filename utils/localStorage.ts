export const addUserToLocalStorage = (user: JSON) => {
  localStorage.setItem('user', JSON.stringify(user))
}
