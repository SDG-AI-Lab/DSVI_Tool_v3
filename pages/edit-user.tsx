import React from 'react'
import ChangePasswordUser from '../components/ChangePasswordUser'
import ChangeDetailsUser from '../components/ChangeDetailsUser'

export default function EditUser() {
  // add trim to password
  // if !state.user return <>No Data to Display</>
  return (
    <>
      <ChangePasswordUser />
      <ChangeDetailsUser />
    </>
  )
}
