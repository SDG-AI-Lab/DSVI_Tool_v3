import React, { ChangeEvent, useState } from 'react'
import { useContext } from 'react'
import { AuthContext, UserAdminDetails } from '../../context/AuthContext'

export default function EditUser() {
  const { state } = useContext(AuthContext)
  if (!state.userAdminDetails) return <></>
  const [values, setValues] = useState<UserAdminDetails>(state.userAdminDetails)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }
  console.log(state)

  return (
    <form>
      <label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
    </form>
  )
}
