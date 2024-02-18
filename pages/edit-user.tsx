import React, { useContext } from 'react'
import ChangePasswordUser from '../components/ChangePasswordUser'
import ChangeDetailsUser from '../components/ChangeDetailsUser'
import { AuthContext } from '../context/AuthContext'

export default function EditUser() {
  // add trim to password
  // if !state.user return <>No Data to Display</>
  const { state } = useContext(AuthContext)
  if (!state.user) return <>Not logged in</>
  return (
    <div className="m-4 flex justify-start gap-4">
      <ChangePasswordUser />
      <ChangeDetailsUser />
    </div>
  )
}
