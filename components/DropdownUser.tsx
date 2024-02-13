import React from 'react'
import { Dropdown } from 'flowbite-react'
import { useAuth } from './hooks/useAuth'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/router'

export default function DropdownUser() {
  const { state } = useContext(AuthContext)
  const { logoutUser } = useAuth()
  const router = useRouter()

  const onLogoutClick = () => {
    logoutUser()
    router.push('/landing')
  }

  return (
    <Dropdown className="z-10" label="Settings">
      <Dropdown.Header>
        <span className="block font-medium">{state.user.name}</span>
      </Dropdown.Header>
      <Dropdown.Item>Change User Details</Dropdown.Item>
      <Dropdown.Item>Change Password</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={onLogoutClick}>
        <span className="font-bold">
          {state.isLoading ? 'Loading...' : 'Logout'}
        </span>
      </Dropdown.Item>
    </Dropdown>
  )
}
