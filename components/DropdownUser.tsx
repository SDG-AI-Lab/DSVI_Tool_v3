import React from 'react'
import { Dropdown } from 'flowbite-react'
import { useAuth } from './hooks/useAuth'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function DropdownUser() {
  const { state } = useContext(AuthContext)
  const { logoutUser } = useAuth()
  const router = useRouter()

  const onLogoutClick = () => {
    logoutUser()
    router.push('/landing')
  }

  return (
    <Dropdown className="z-10" label={state.user.name}>
      <Dropdown.Header>
        <span className="block font-medium">{state.user.email}</span>
      </Dropdown.Header>
      <Dropdown.Item>
        <Link href={'/edit-user'}>Change User Details</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link href={'/edit-user'}>Change Password</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={onLogoutClick}>
        <span className="font-bold">
          {state.isLoading ? 'Loading...' : 'Logout'}
        </span>
      </Dropdown.Item>
    </Dropdown>
  )
}
