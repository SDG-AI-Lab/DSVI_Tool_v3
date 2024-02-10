import React from 'react'
import { RoleType, SelectedCountryType } from '../pages/register'

export type UserAdminDetails = {
  countries: SelectedCountryType[]
  email: string
  isVerified: boolean
  name: string
  role: RoleType
  verificationToken: string
  verified: string
  __v: number
  _id: string
}

type UserListPropsType = {
  users: UserAdminDetails[] | []
}

export default function UserList({ users }: UserListPropsType) {
  if (!users.length) return <></>

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
          <th>Email Verified</th>
          <th>Countries</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: UserAdminDetails) => {
          return (
            <tr>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>{user.isVerified ? 'yes' : 'no'}</td>
              <td>{user.countries.join(', ')}</td>

              <td>
                <button>Edit</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
